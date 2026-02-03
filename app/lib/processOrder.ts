import { MakeCustomerPayload } from "./customerRequest";
import { getEnrollmentRequest } from "./getEnrollmentRequest";
import { MakePaymentPayload, makePaymentRequest } from "./makePaymentRequest";
import { customerRequest } from "./customerRequest";




export async function processOrder(orderData: any) {
  console.log("📡 Sending order to telecom API:", orderData);
  const zipCode = orderData.billingAddress?.zip ?? orderData.shippingAddress?.zip ?? "";

  /** ⚠️ REQUIRED DATA CHECK */
  if (!zipCode) {
    throw new Error("zipCode is required for enrollment");
  }
  
  // 🔥 CALL ENROLLMENT API AFTER PAYMENT SUCCESS
  const enrollmentRes = await getEnrollmentRequest(String(zipCode));

  console.log("📡 Enrollment API response:", enrollmentRes);
  if (!enrollmentRes.status) {
    throw new Error(
      enrollmentRes.error || "Enrollment failed"
    );
  }

  type CartItem = {
    simType: string;
    planId: string | number;
    eSim?: string; // "eSim" or "pSIM"
  };

  const cart = orderData.cart as CartItem[];

  const planIds: number[] = [
    ...new Set(cart.map(item => Number(item.planId))),
  ];


  const paymentData: MakePaymentPayload = {
    enrollment_id: enrollmentRes.enrollment_id,
    zip_code: String(zipCode),
    plan_id: planIds, // ✅ number[]
    billing_state: String(orderData.shippingAddress?.state ?? orderData.billingAddress?.state ?? ""),
    billing_city: String(orderData.shippingAddress?.city ?? orderData.billingAddress?.city ?? ""),
    billing_zip: String(orderData.shippingAddress?.zip ?? orderData.billingAddress?.zip ?? ""),
    billing_address1: String(orderData.shippingAddress?.houseNumber ?? orderData.billingAddress?.houseNumber ?? ""),
    billing_address2: String(orderData.shippingAddress?.street ?? orderData.billingAddress?.street ?? ""),
    no_of_lines: planIds.length,
    charge_id: String(orderData.charge_id),
    transaction_id: String(orderData.transaction_id),
    action: "make_payment",
    payment_method: "OTHER_PAYMENT_OPTION",
    payment_method_option: "STRIPE",
    payment_type: "NEW_SIGNUP",
    source: "API",
    agent_id: process.env.VCR_AGENT_ID as string,
  };
  console.log("📡 Payment API request data:", paymentData);
  const paymentRes = await makePaymentRequest( paymentData );
  if (!paymentRes.status) {
    throw new Error(paymentRes.error || "Payment failed");
  }
  console.log("📡 Payment API response:", paymentRes);


  
  const orderId = (paymentRes as any)?.order_id;

  /* --------------------------------------------------
   * 4️⃣ CUSTOMER / LINE CREATION (PHP FOREACH → MAP)
   * -------------------------------------------------- */
  const customerName = String(orderData.customer?.name ?? "")
    .trim()
    .split(" ");

  const portIn = Boolean(orderData.portIn);
  const portDetails = orderData.portDetails ?? {};
  const telgoPlan = orderData.telgoPlan ?? {};
  const parentEnrollmentId = enrollmentRes.enrollment_id  ?? null;

  const customerPayload: MakeCustomerPayload = {
    lines: orderData.cart.map((cartItem: CartItem, index: number) => ({
      enrollment_id:        index === 0 ? enrollmentRes.enrollment_id : null,
      order_id:             orderId,
      first_name:           String(orderData.shippingAddress?.firstName ?? orderData.billingAddress?.firstName ?? ""),
      last_name:            String(orderData.shippingAddress?.lastName ?? orderData.billingAddress?.lastName ?? ""),
      email:                String(orderData.shippingAddress?.email ?? orderData.billingAddress?.email ?? ""),
      service_address_one:  String(orderData.shippingAddress?.street ?? orderData.billingAddress?.street ?? ""),
      service_city:         String(orderData.shippingAddress?.city ?? orderData.billingAddress?.city ?? ""),
      service_state:        String(orderData.shippingAddress?.state ?? orderData.billingAddress?.state ?? ""),
      service_zip:          String(orderData.shippingAddress?.zip ?? orderData.billingAddress?.zip ?? ""),
      billing_address_one:  String(orderData.shippingAddress?.street ?? orderData.billingAddress?.street ?? ""),
      billing_address_two:  String(orderData.shippingAddress?.houseNumber ?? orderData.billingAddress?.houseNumber ?? ""),
      billing_state:        String(orderData.shippingAddress?.state ?? orderData.billingAddress?.state ?? ""),
      billing_city:         String(orderData.shippingAddress?.city ?? orderData.billingAddress?.city ?? ""),
      billing_zip:          String(orderData.shippingAddress?.zip ?? orderData.billingAddress?.zip ?? ""),
      plan_id:              cartItem?.planId ? Number(cartItem.planId) : 0,
      carrier:              "BLUECONNECTSATT",
      is_portin:            portIn ? "Y" : "N",
      port_number:          portIn ? portDetails?.phoneNumber ?? null : null,
      port_current_carrier: portIn ? portDetails?.carrier ?? null : null,
      port_account_number:  portIn ? portDetails?.accountNumber ?? null : null,
      port_account_password: portIn ? portDetails?.accountPassword ?? null : null,
      port_first_name:      portIn ? customerName[0] : null,
      port_last_name:       portIn ? customerName[1] ?? "N/A" : null,
      port_address_one:     portIn ? orderData.customer?.address?.line1 : null,
      port_address_two:     portIn ? orderData.customer?.address?.line2 ?? null : null,
      port_city:            portIn ? orderData.customer?.address?.city : null,
      port_state:           portIn ? orderData.customer?.address?.state : null,
      port_zip_code:        portIn ? orderData.customer?.address?.postal_code : null,
      pin:                  portIn ? portDetails?.pin ?? null : null,
      enrollment_type:      "SHIPMENT",
      is_esim:              cartItem?.simType === "pSim" ? "N" : "Y",
      parent_enrollment_id: parentEnrollmentId,
    })),
  };

  // console.log("📡 Customer API request data:", customerPayload);

  const customerRes = await customerRequest(
    customerPayload
  );

  if (!customerRes.status) {
    throw new Error(customerRes.error || "Customer creation failed");
  }

  // ✅ MERGE ALL API RESPONSES + ORIGINAL ORDER
  const finalOrderPayload = {
    order: {
      ...orderData,
    },
    enrollment: enrollmentRes,
    payment: paymentRes,
    customer: customerRes,
  };

  console.log(
    "📦 Final order payload:",
    JSON.stringify(finalOrderPayload, null, 2)
  );

  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/order/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json",  },
    body: JSON.stringify(finalOrderPayload),
  } );

if (!backendRes.ok) {
  const error = await backendRes.text();
  throw new Error("Backend order save failed: " + error);
}

const backendData = await backendRes.json();

console.log("📦 Backend API response:", backendData);

  return {
    success: true,
    enrollment_id: enrollmentRes.enrollment_id,
    order_id: paymentRes.order_id,
    backend_order_id: backendData?.id ?? null,
  };
}
