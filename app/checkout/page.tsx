"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "../components/StripePaymentForm";
import type { Appearance } from "@stripe/stripe-js";
import { usStates } from "../utils/usStates";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");
import { 
  Phone, 
  Smartphone, 
  Vibrate, 
  Plane,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  X,
  Loader2
} from "lucide-react";

// Types
interface FormData {
  priceQty: number;
  price: number;
}

interface CartItem {
  planId: string | null;
  planSlug: string | null;
  vcPlanID : string | null;
  planTitle: string;
  planPrice: number;
  planDuration: string;
  lineType: string;
  simType: string;
  type?: string;
  formData: FormData;
  _raw?: any;
}

interface Address {
  firstName: string;
  lastName: string;
  companyName: string;
  region: string;
  state: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  phone: string;
  email: string;
}

interface ShippingOption {
  label: string;
  value: number;
}

interface DiscountData {
  type: string;
  discount: string;
}

interface Errors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const shippingOptions: ShippingOption[] = [
    { label: "Standard (3-5 Days)", value: 9.99 },
    { label: "Expedited (2-3 Days)", value: 14.99 },
    { label: "Overnight", value: 24.99 },
  ];
  const [shippingFee, setShippingFee] = useState(9.99);
  const [clientSecret, setClientSecret] = useState("");
  const stripeFormRef = useRef<any>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showShipping, setShowShipping] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [discountData, setDiscountData] = useState<DiscountData | null>(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [selectedShippingOption, setSelectedShippingOption] = useState<ShippingOption>(shippingOptions[0]);

  const [errors, setErrors] = useState<Errors>({});

  const billingFieldMeta: Record<string, { label: string; placeholder: string; disabled?: boolean }> = {
    firstName: { label: "First Name", placeholder: "Enter your first name" },
    lastName: { label: "Last Name", placeholder: "Enter your last name" },
    companyName: { label: "Company Name", placeholder: "Enter your company name (optional)" },
    region: { label: "Country / Region", placeholder: "United States (US)", disabled: true },
    state: { label: "State", placeholder: "Enter your state" },
    city: { label: "City", placeholder: "Enter your city" },
    street: { label: "Street Address", placeholder: "Enter your street address" },
    houseNumber: { label: "Apartment, suite, unit, etc. (optional)", placeholder: "Apartment or suite" },
    zip: { label: "ZIP Code", placeholder: "Enter your ZIP code" },
    phone: { label: "Phone Number", placeholder: "Enter your phone number" },
    email: { label: "Email Address", placeholder: "Enter your email address" },
  };

  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: "",
    lastName: "",
    companyName: "",
    region: "United States (US)",
    state: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    phone: "",
    email: "",
  });

  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: "",
    lastName: "",
    companyName: "",
    region: "United States (US)",
    state: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
    phone: "",
    email: "",
  });

  
 /* ================= CART SYNC ================= */
  const syncCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (!Array.isArray(storedCart)) {
        syncCart([]);
        return;
      }

      const normalized: CartItem[] = storedCart.map((item: any) => ({
        planId: item.vcPlanID ? String(item.vcPlanID) : null,
        vcPlanID: item.vcPlanID ? String(item.vcPlanID) : null,
        planSlug: item.planSlug ?? null,
        planTitle: item.planTitle ?? "Unknown Plan",
        planPrice: Number(item.planPrice ?? 0),
        planDuration: item.planDuration ?? "",
        lineType: item.lineType ?? "",
        simType: item.simType ?? "",
        type: item.type ?? undefined,
        formData: {
          priceQty: Number(item.formData?.priceQty ?? 1),
          price: Number(item.planPrice ?? 0),
        },
        _raw: item._raw ?? undefined,
      }));

      setCart(normalized);
    } catch {
      syncCart([]);
    }
  }, []);

  // ✅ Check login status and close popup when user logs in
  useEffect(() => {
    const token = localStorage.getItem("golite_token") || localStorage.getItem("golite_accessToken");
    const wasLoggedIn = isLoggedIn;
    setIsLoggedIn(!!token);

    // If user just logged in and popup was open, close it
    if (token && !wasLoggedIn && showLoginPopup) {
      setShowLoginPopup(false);
    }
  }, [showLoginPopup]);

  const hasDeviceItem = cart.some((item) => item.type === "device");

   const handleQuantity = (index: number, delta: number) => {
    const updated = [...cart];
    const qty = Number(updated[index].formData.priceQty);
    updated[index].formData.priceQty = Math.max(1, qty + delta);
    syncCart(updated);
  };

   const handleRemove = (index: number) => {
    syncCart(cart.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
  // Clear cart
  syncCart([]);

  // Clear discounts
  localStorage.removeItem("discounts");

  // Clear coupon & manual discount state
  setCoupon("");
  setDiscountData(null);
  setCouponMessage("");
};


  const handleApplyCoupon = async () => {
    if (!coupon) {
      setCouponMessage("Please enter a coupon code");
      return;
    }

    setLoading(true);
    setCouponMessage("");
    
    setTimeout(() => {
      setDiscountData({ type: "percentage", discount: "10" });
      setCouponMessage("Coupon applied! Discount: 10%");
      setLoading(false);
    }, 1000);
  };

  const handleCancelCoupon = () => {
    setCoupon("");
    setDiscountData(null);
    setCouponMessage("Coupon cancelled.");
  };

  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.planPrice ?? item.formData?.price ?? 0);
    const qty = Number(item.formData?.priceQty ?? 1);
    return acc + price * qty;
  }, 0);

  const discountAmount = discountData
    ? discountData.type === "percentage"
      ? (subtotal * Number(discountData.discount)) / 100
      : Number(discountData.discount)
    : 0;

  useEffect(() => {
    if (hasDeviceItem && selectedShippingOption) {
      setShippingFee(selectedShippingOption.value);
    } else {
      setShippingFee(0);
    }
  }, [selectedShippingOption, hasDeviceItem]);

  const total = Math.max(subtotal + shippingFee - discountAmount, 0);

  const validateFields = () => {
    const newErrors: Errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;

    newErrors.billingFirstName = billingAddress.firstName ? "" : "First name is required";
    newErrors.billingLastName = billingAddress.lastName ? "" : "Last name is required";
    newErrors.billingState = billingAddress.state ? "" : "State is required";
    newErrors.billingCity = billingAddress.city ? "" : "City is required";
    newErrors.billingHouseNumber = billingAddress.houseNumber ? "" : "House number is required";
    newErrors.billingZip = billingAddress.zip ? "" : "ZIP code is required";
    newErrors.billingEmail = emailRegex.test(billingAddress.email) ? "" : "Invalid email address";
    newErrors.billingPhone = phoneRegex.test(billingAddress.phone) ? "" : "Invalid phone number";

    if (showShipping) {
      newErrors.shippingFirstName = shippingAddress.firstName ? "" : "First name is required";
      newErrors.shippingLastName = shippingAddress.lastName ? "" : "Last name is required";
      newErrors.shippingState = shippingAddress.state ? "" : "State is required";
      newErrors.shippingCity = shippingAddress.city ? "" : "City is required";
      newErrors.shippingHouseNumber = shippingAddress.houseNumber ? "" : "House number is required";
      newErrors.shippingZip = shippingAddress.zip ? "" : "ZIP code is required";
      newErrors.shippingEmail = emailRegex.test(shippingAddress.email) ? "" : "Invalid email address";
      newErrors.shippingPhone = phoneRegex.test(shippingAddress.phone) ? "" : "Invalid phone number";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err && err.length);
  };

  const handlePlaceOrder = async () => {
  if (!agreeTerms) {
    setShowTermsPopup(true);
    return;
  }

  if (!validateFields()) {
    alert("Please fill all required fields correctly");
    return;
  }

  if (!stripeFormRef.current) {
    alert("Payment form not ready");
    return;
  }

  setLoading(true);

  const result = await stripeFormRef.current.submitPayment();

  if (!result.success || !result.paymentIntentId) {
  setLoading(false);
  return;
}

const user = JSON.parse(localStorage.getItem("user") || "{}");
// 🔥 PROCESS ORDER (NO WEBHOOK FOR NOW)
const res = await fetch("/api/process-order", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    paymentIntentId: result.paymentIntentId,
    paymentResponse: result,  
    cart,
    billingAddress,
    shippingAddress: showShipping ? shippingAddress : billingAddress,
    subtotal,
    shippingFee,
    discountAmount,
    total,
    logged_user: user ? user?.email : null,
    order_shipping_email: shippingAddress?.email || billingAddress?.email || null, 
  }),
});
console.log("❇️ process-order response:", res);
if (!res) {
  alert("Order processing failed");
  setLoading(false);
  return;
}

  // ✅ Payment succeeded → webhook will save order
  setShowThankYou(true);
  syncCart([]);
  setLoading(false);
};

  const formatDiscount = (value: string) => {
    const num = parseFloat(value);
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  };
type Theme = "flat" | "stripe" | "night";
const appearance: Appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#DF1E5A",
  },
};


useEffect(() => {
  if (cart.length === 0) return;

  const createIntent = async () => {
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart,
        billingAddress,
        shippingAddress: showShipping ? shippingAddress : billingAddress,
        subtotal,
        shippingFee,
        discountAmount,
        total,
      }),
    });

    const data = await res.json();
    setClientSecret(data.clientSecret);
  };

  createIntent();
}, [cart, billingAddress, shippingAddress, subtotal, shippingFee, discountAmount, total]);


  
  return (
    <>
      <Header />

     <div className="min-h-screen bg-gray-50 ">


      <div className="bg-[#FD4C0E] text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base">Get Our Best Postpaid Mobile Plans & Pay Only for Every Need!</p>
        </div>
      </div>

      <div className="container mx-auto py-4 md:py-8 lg:py-12 xl:py-12 2xl:py-12 px-4  md:px-12 lg:px-24 xl:px-30 2xl:px-32 bg-[#fd4c0e0d]">  
        {cart.length === 0 ? (
          <div className="flex flex-col justify-center items-center text-center min-h-[60vh]">
            <ShoppingCart className="w-32 h-32 text-gray-300 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-8">Looks like you have not added anything to your cart yet.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-4xl">
              <a href="/prepaid" className="flex items-center justify-center gap-2 bg-[#FD4C0E] hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition">
                <Phone className="w-5 h-5" />
                Prepaid plans
              </a>
              <a href="/postpaid" className="flex items-center justify-center gap-2 bg-[#FD4C0E] hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition">
                <Smartphone className="w-5 h-5" />
                Postpaid plans
              </a>
              <a href="/business-deals" className="flex items-center justify-center gap-2 bg-[#FD4C0E] hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition">
                <Vibrate className="w-5 h-5" />
                Business Deals
              </a>
              <a href="/travel-plans" className="flex items-center justify-center gap-2 bg-[#FD4C0E] hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition">
                <Plane className="w-5 h-5" />
                Travel Plans
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              {/* Title */}
              <div>
                <h3 className="text-2xl font-bold text-[#FD4C0E]">Checkout</h3>
                <p className="text-sm text-gray-500">
                  Connecting Every Possibility with Zoiko Mobile!
                </p>
              </div>

              {/* Clear Cart Button */}
              <button
                className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#FD4C0E] hover:bg-red-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                onClick={handleClearCart}
                disabled={loading}
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </button>
            </div>

           <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h5 className="font-bold mb-2">Selected Plan(s) JSON (from popup)</h5>
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
              {JSON.stringify(
                JSON.parse(localStorage.getItem("cart") || "[]"),
                null,
                2
              )}
            </pre>
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-x-auto">
              {JSON.stringify(
                JSON.parse(localStorage.getItem("discounts") || "[]"),
                null,
                2
              )}
            </pre>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="text-lg font-bold text-[#FD4C0E]">{item.planTitle}</h5>
                      <p className="text-sm text-gray-500">
                        Line Type: {item.lineType || "N/A"} | SIM Type: {item.simType || "N/A"}
                      </p>
                    </div>
                    <button
                      className="text-[#FD4C0E] hover:text-red-700 p-2"
                      onClick={() => handleRemove(idx)}
                      disabled={loading}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">
                      ${Number(item.planPrice ?? item.formData?.price ?? 0).toFixed(2)} / {item.planDuration}
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                        onClick={() => handleQuantity(idx, -1)}
                        disabled={loading}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold">{item.formData?.priceQty ?? 1}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                        onClick={() => handleQuantity(idx, 1)}
                        disabled={loading}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-white rounded-lg shadow p-6">
                <h5 className="font-bold mb-4">Have a Coupon?</h5>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD4C0E]"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    disabled={loading}
                  />

                  <button
                    className="w-full sm:w-auto bg-[#FD4C0E] hover:bg-red-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
                    onClick={handleApplyCoupon}
                    disabled={loading}
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className={`mt-2 text-sm ${discountData ? "text-green-600" : "text-[#FD4C0E]"}`}>
                    {couponMessage}
                  </p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h5 className="font-bold mb-4">Service/Billing Details</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(billingAddress).map((key) => {
                    const meta = billingFieldMeta[key] || {};
                    const errorKey = `billing${key.charAt(0).toUpperCase() + key.slice(1)}`;
                    const isRequired = ["firstName", "lastName", "state", "city", "houseNumber", "zip", "email"].includes(key);
                    
                    return (
                      <div key={key}>
                        <label className="block text-sm font-semibold mb-1">
                          {meta.label || key.replace(/([A-Z])/g, " $1")}
                          {isRequired && <span className="text-[#FD4C0E] ml-1">*</span>}
                        </label>
                        {key === "state" ? (
                          <select
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD4C0E] ${
                              errors[errorKey] ? "border-[#FD4C0E]" : "border-gray-300"
                            }`}
                            value={billingAddress.state}
                            onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                            disabled={loading}
                          >
                            <option value="">Select state</option>
                            {usStates.map((s) => (
                              <option key={s.code} value={s.code}>{s.name}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD4C0E] ${
                              errors[errorKey] ? "border-[#FD4C0E]" : "border-gray-300"
                            }`}
                            placeholder={meta.placeholder || `Enter ${key}`}
                            value={billingAddress[key as keyof Address]}
                            disabled={meta.disabled || loading}
                            onChange={(e) => setBillingAddress({ ...billingAddress, [key]: e.target.value })}
                          />
                        )}
                        {errors[errorKey] && <p className="text-[#FD4C0E] text-xs mt-1">{errors[errorKey]}</p>}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#FD4C0E] border-gray-300 rounded focus:ring-[#FD4C0E]"
                      checked={showShipping}
                      onChange={(e) => setShowShipping(e.target.checked)}
                      disabled={loading}
                    />
                    <span className="text-sm">Ship to a different address?</span>
                  </label>
                </div>

                {showShipping && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h6 className="font-bold mb-4 text-[#FD4C0E]">Shipping Address</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.keys(shippingAddress).map((key) => {
                        const meta = billingFieldMeta[key] || {};
                        const errorKey = `shipping${key.charAt(0).toUpperCase() + key.slice(1)}`;
                        const isRequired = ["firstName", "lastName", "state", "city", "houseNumber", "zip", "email"].includes(key);
                        
                        return (
                          <div key={key}>
                            <label className="block text-sm font-semibold mb-1">
                              {meta.label || key.replace(/([A-Z])/g, " $1")}
                              {isRequired && <span className="text-[#FD4C0E] ml-1">*</span>}
                            </label>
                            {key === "state" ? (
                              <select
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD4C0E] ${
                                  errors[errorKey] ? "border-[#FD4C0E]" : "border-gray-300"
                                }`}
                                value={shippingAddress.state}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                                disabled={loading}
                              >
                                <option value="">Select state</option>
                                {usStates.map((s) => (
                                  <option key={s.code} value={s.code}>{s.name}</option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD4C0E] ${
                                  errors[errorKey] ? "border-[#FD4C0E]" : "border-gray-300"
                                }`}
                                placeholder={meta.placeholder || `Enter ${key}`}
                                value={shippingAddress[key as keyof Address]}
                                disabled={meta.disabled || loading}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, [key]: e.target.value })}
                              />
                            )}
                            {errors[errorKey] && <p className="text-[#FD4C0E] text-xs mt-1">{errors[errorKey]}</p>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h5 className="font-bold mb-4">Your Order</h5>
                <div className="space-y-2 mb-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.planTitle} ({item.simType}) x {item.formData?.priceQty || 1}</span>
                      <span className="font-semibold">${(item.planPrice * (item.formData?.priceQty || 1)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {hasDeviceItem && (
                  <div className="border-t border-b border-gray-200 py-4 my-4">
                    <label className="block text-sm font-semibold mb-2">Shipping Options</label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD4C0E]"
                      value={selectedShippingOption.value}
                      onChange={(e) => {
                        const option = shippingOptions.find((opt) => opt.value === parseFloat(e.target.value));
                        if (option) setSelectedShippingOption(option);
                      }}
                    >
                      {shippingOptions.map((opt, i) => (
                        <option key={i} value={opt.value}>{opt.label} - ${opt.value}</option>
                      ))}
                    </select>
                    <div className="flex justify-between mt-3 text-sm">
                      <span>Shipping Fee</span>
                      <span className="font-semibold">${shippingFee.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {discountData && (
                  <div className="flex justify-between text-sm text-green-600 mb-2">
                    <span>
                      Discount ({discountData.type === "percentage" 
                        ? formatDiscount(discountData.discount) + "%" 
                        : "$" + formatDiscount(discountData.discount)})
                    </span>
                    <span className="font-semibold">- ${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#FD4C0E]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h5 className="font-bold mb-4">Payment Method</h5>
                
                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                  {clientSecret && (
                    <Elements
                      stripe={stripePromise}
                      options={{ clientSecret, appearance }}
                    >
                      <StripePaymentForm ref={stripeFormRef} />
                    </Elements>
                  )}

                </div>

                <div className="mb-4">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mt-1 text-[#FD4C0E] border-gray-300 rounded focus:ring-[#FD4C0E]"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      disabled={loading}
                    />
                    <span className="text-sm">
                      I have read and agree to the website terms and conditions.
                    </span>
                  </label>
                </div>

                <button
                  className="w-full bg-[#FD4C0E] hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
        )}
        </div>

      <Footer />

   {/* Login Required Popup */}
{showLoginPopup && (
  <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/50">
    <div className="w-[90%] max-w-md rounded-lg bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h5 className="font-semibold text-gray-800">Login Required</h5>
        <button
          type="button"
          onClick={() => setShowLoginPopup(false)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-5 text-center">
        <p className="text-gray-600">
          You need to login to apply your coupon code.
        </p>

        <a
          href={`/login?redirect=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.href : "/"
          )}`}
          className="mt-5 inline-block w-full rounded-md border border-[#DF1E5A] bg-[#DF1E5A] px-4 py-3 font-semibold text-white transition hover:bg-[#c91a50]"
        >
          Go to Login
        </a>

        <button
          type="button"
          onClick={() => setShowLoginPopup(false)}
          className="mt-3 text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{/* Terms & Conditions Popup */}
{showTermsPopup && (
  <div className="fixed inset-0 z-[1060] flex items-center justify-center bg-black/50">
    <div className="w-[90%] max-w-sm rounded-lg bg-white p-6 text-center shadow-lg">
      <h5 className="mb-3 font-bold text-[#FD4C0E]">
        Terms &amp; Conditions Required
      </h5>

      <p className="text-sm text-gray-600">
        You must agree to the website{" "}
        <a
          href="/terms-and-conditions"
          className="font-medium text-[#FD4C0E] underline"
        >
          terms and conditions
        </a>{" "}
        before placing your order.
      </p>

      <button
        type="button"
        onClick={() => setShowTermsPopup(false)}
        className="mt-5 w-full rounded-md bg-[#DF1E5A] px-4 py-3 font-semibold text-white transition hover:bg-[#c91a50]"
      >
        OK
      </button>
    </div>
  </div>
)}

  {/* Thank You Modal */}
{showThankYou && (
  <div className="fixed inset-0 z-[1070] flex items-center justify-center bg-black/50">
    <div className="w-[90%] max-w-md rounded-xl bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <h3 className="text-lg font-semibold text-gray-800">Thank You!</h3>
        <button
          type="button"
          onClick={() => setShowThankYou(false)}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-6 text-center">
        <div className="text-5xl text-green-600">✔️</div>

        <h4 className="mt-4 text-lg font-semibold text-green-600">
          Your order has been successfully placed!
        </h4>

        <p className="mt-2 text-sm text-gray-500">
          A confirmation email has been sent with your order details.
        </p>
      </div>

      {/* Footer */}
      <div className="border-t px-6 py-4">
        <button
          type="button"
          onClick={() => {
            setShowThankYou(false);
            // window.location.href = "/";
          }}
          className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
)}
    </div>
    </>
  );
}