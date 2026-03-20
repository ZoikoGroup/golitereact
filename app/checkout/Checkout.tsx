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
  Loader2,
  Users,
  Tag,
  Shield,
} from "lucide-react";

// Types
interface FormData {
  priceQty: number;
  price: number;
}

/* ── Device protection per cart item ── */
interface DeviceProtection {
  smartphone: boolean;
  tablet: boolean;
  smartwatch: boolean;
}

interface CartItem {
  planId: string | null;
  planSlug: string | null;
  vcPlanID: string | null;
  planTitle: string;
  planPrice: number;
  planDuration: string;
  lineType: string;
  simType: string;
  type?: string;
  bundleId?: string;
  formData: FormData;
  _raw?: any;
  /* NEW */
  deviceProtection?: DeviceProtection;
  protectionTotal?: number;
}

interface FamilyDiscount {
  type: string;
  bundleId: string;
  line: string;
  amount: number;
  description: string;
}

interface GroupedBundle {
  bundleId: string;
  items: CartItem[];
  bundleDiscount: number;
  familyDiscounts: FamilyDiscount[];
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
  code?: string;
  type: string;
  discount: string;
  name?: string;
}

interface Errors {
  [key: string]: string;
}

/* ── Protection price map ── */
const PROTECTION_PRICES = { smartphone: 8.99, tablet: 8.99, smartwatch: 5.99 };
const PROTECTION_LABELS: Record<keyof DeviceProtection, string> = {
  smartphone: "Smartphone Protection",
  tablet: "Tablet Protection",
  smartwatch: "Smartwatch Protection",
};


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
  const [familyDiscounts, setFamilyDiscounts] = useState<FamilyDiscount[]>([]);
  const [groupedBundles, setGroupedBundles] = useState<GroupedBundle[]>([]);
  const [regularItems, setRegularItems] = useState<CartItem[]>([]);
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
  const [loginReason, setLoginReason] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const billingFieldMeta: Record<string, { label: string; placeholder: string; disabled?: boolean }> = {
    firstName:   { label: "First Name",                          placeholder: "Enter your first name" },
    lastName:    { label: "Last Name",                           placeholder: "Enter your last name" },
    companyName: { label: "Company Name",                        placeholder: "Enter your company name (optional)" },
    region:      { label: "Country / Region",                    placeholder: "United States (US)", disabled: true },
    state:       { label: "State",                               placeholder: "Enter your state" },
    city:        { label: "City",                                placeholder: "Enter your city" },
    street:      { label: "Street Address",                      placeholder: "Enter your street address" },
    houseNumber: { label: "Apartment, suite, unit, etc.",        placeholder: "Apartment or suite" },
    zip:         { label: "ZIP Code",                            placeholder: "Enter your ZIP code" },
    phone:       { label: "Phone Number",                        placeholder: "Enter your phone number" },
    email:       { label: "Email Address",                       placeholder: "Enter your email address" },
  };

  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: "", lastName: "", companyName: "",
    region: "United States (US)", state: "", city: "",
    street: "", houseNumber: "", zip: "", phone: "", email: "",
  });

  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: "", lastName: "", companyName: "",
    region: "United States (US)", state: "", city: "",
    street: "", houseNumber: "", zip: "", phone: "", email: "",
  });

  /* ── Cart sync ── */
  const syncCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    localStorage.removeItem("applied-coupon");
    setDiscountData(null);
    window.dispatchEvent(new Event("storage"));
  };

  /* ── Group family bundles ── */
  const groupFamilyBundles = (cartItems: CartItem[], discounts: FamilyDiscount[]) => {
    const bundles: { [key: string]: CartItem[] } = {};
    const regular: CartItem[] = [];

    cartItems.forEach((item) => {
      if (item.bundleId) {
        if (!bundles[item.bundleId]) bundles[item.bundleId] = [];
        bundles[item.bundleId].push(item);
      } else {
        regular.push(item);
      }
    });

    const grouped: GroupedBundle[] = Object.keys(bundles).map((bundleId) => {
      const bundleDiscount = discounts.find(
        (d) => d.bundleId === bundleId && d.type === "bundle" && d.line === "all"
      );
      const familyDiscountsForBundle = discounts.filter(
        (d) => d.bundleId === bundleId && d.type === "family" && d.line !== "all"
      );
      return {
        bundleId,
        items: bundles[bundleId],
        bundleDiscount: bundleDiscount?.amount || 0,
        familyDiscounts: familyDiscountsForBundle,
      };
    });

    setGroupedBundles(grouped);
    setRegularItems(regular);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const storedDiscounts = JSON.parse(localStorage.getItem("family-discounts") || "[]");
      if (!Array.isArray(storedCart)) { syncCart([]); return; }

      const normalized: CartItem[] = [];

      storedCart.forEach((item: any) => {
        // Main plan item
        normalized.push({
          planId:       item.vcPlanID ? String(item.vcPlanID) : null,
          vcPlanID:     item.vcPlanID ? String(item.vcPlanID) : null,
          planSlug:     item.planSlug ?? null,
          planTitle:    item.planTitle ?? "Unknown Plan",
          planPrice:    Number(item.planPrice ?? 0),
          planDuration: item.planDuration ?? "",
          lineType:     item.lineType ?? "",
          simType:      item.simType ?? "",
          type:         item.type ?? undefined,
          bundleId:     item.bundleId ?? undefined,
          formData: {
            priceQty: Number(item.formData?.priceQty ?? 1),
            price:    Number(item.planPrice ?? 0),
          },
          _raw: item._raw ?? undefined,
        });

        // Expand deviceProtection into individual addon rows
        const dp: DeviceProtection | undefined = item.deviceProtection;
        if (dp) {
          const addonMap: { key: keyof DeviceProtection; label: string }[] = [
            { key: "smartphone", label: "Smart Phone Device Protection" },
            { key: "tablet",     label: "Tablet Device Protection" },
            { key: "smartwatch", label: "Smart Watch Device Protection" },
          ];
          addonMap.forEach(({ key, label }) => {
            if (dp[key]) {
              normalized.push({
                planId:       null,
                vcPlanID:     null,
                planSlug:     null,
                planTitle:    label,
                planPrice:    PROTECTION_PRICES[key],
                planDuration: "month",
                lineType:     "addon",
                simType:      "device_protection",
                type:         "addon",
                bundleId:     undefined,
                formData:     { priceQty: 1, price: PROTECTION_PRICES[key] },
              });
            }
          });
        }
      });

      setCart(normalized);
      setFamilyDiscounts(storedDiscounts);
      groupFamilyBundles(normalized, storedDiscounts);
    } catch {
      syncCart([]);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedCoupon = localStorage.getItem("applied-coupon");
    if (storedCoupon) {
      try { setDiscountData(JSON.parse(storedCoupon)); }
      catch { localStorage.removeItem("applied-coupon"); }
    }
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("golite_token") || localStorage.getItem("golite_accessToken");
      setIsLoggedIn(!!token);
      if (token) setShowLoginPopup(false);
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, [showLoginPopup]);

  const needsShipping = cart.some((item) => {
    const lt = item.lineType?.toLowerCase();
    const st = item.simType?.toLowerCase();
    if (item.type === "device") return true;
    if ((lt === "prepaid" || lt === "travel") && st === "psim") return true;
    if ((lt === "postpaid" || lt === "business") && st === "psim") return true;
    return false;
  });

  const handleQuantity = (bundleId: string | null, index: number, delta: number) => {
    const updated = [...cart];
    let targetIndex = index;
    if (bundleId) {
      targetIndex = cart.findIndex((item, idx) => item.bundleId === bundleId && idx === index);
    }
    if (targetIndex !== -1) {
      updated[targetIndex].formData.priceQty = Math.max(1, Number(updated[targetIndex].formData.priceQty) + delta);
      syncCart(updated);
      groupFamilyBundles(updated, familyDiscounts);
    }
  };

  const handleRemove = (bundleId: string | null, index: number) => {
    if (bundleId) {
      const updated = cart.filter((item) => item.bundleId !== bundleId);
      syncCart(updated);
      const updatedDiscounts = familyDiscounts.filter((d) => d.bundleId !== bundleId);
      localStorage.setItem("family-discounts", JSON.stringify(updatedDiscounts));
      setFamilyDiscounts(updatedDiscounts);
      groupFamilyBundles(updated, updatedDiscounts);
    } else {
      syncCart(cart.filter((_, i) => i !== index));
      groupFamilyBundles(cart.filter((_, i) => i !== index), familyDiscounts);
    }
  };

  const handleClearCart = () => {
    syncCart([]);
    localStorage.removeItem("family-discounts");
    setCoupon(""); setDiscountData(null); setCouponMessage("");
    setFamilyDiscounts([]); setGroupedBundles([]); setRegularItems([]);
  };

  const handleApplyCoupon = async () => {
    if (!isLoggedIn) { setLoginReason("You need to login to apply coupon code."); setShowLoginPopup(true); return; }
    if (!coupon.trim()) { setCouponMessage("Please enter a coupon code"); return; }
    try {
      setLoading(true); setCouponMessage("");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/preview-coupon/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ code: coupon }),
      });
      const data = await res.json();
      if (!res.ok || !data?.valid) throw new Error("Invalid or expired coupon");
      const couponInfo = data.coupon;
      const allowedUserIds = Array.isArray(couponInfo?.allowed_user_ids) ? couponInfo.allowed_user_ids.map(Number) : [];
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = Number(userData?.id || 0);
      if (couponInfo?.has_user_restriction && allowedUserIds.length > 0 && !allowedUserIds.includes(userId))
        throw new Error("This coupon is not valid for your account");
      const cartLocal = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartPlanIds = cartLocal.map((item: any) => Number(item?.planId || 0)).filter((id: number) => id > 0);
      const allowedPlanIds = Array.isArray(couponInfo?.allowed_plan_ids) ? couponInfo.allowed_plan_ids.map(Number) : [];
      if (couponInfo?.has_plan_restriction) {
        if (allowedPlanIds.length === 0) throw new Error("Coupon not valid for selected plan");
        if (!cartPlanIds.some((id: number) => allowedPlanIds.includes(id))) throw new Error("Coupon not valid for selected plan");
      }
      const couponData = { code: couponInfo.code, type: couponInfo.type, discount: String(couponInfo.discount), name: couponInfo.name, allowed_plan_ids: allowedPlanIds };
      setDiscountData(couponData);
      localStorage.setItem("applied-coupon", JSON.stringify(couponData));
      setCouponMessage("Coupon applied successfully!");
      setCoupon(couponInfo.code);
    } catch (err: any) {
      setDiscountData(null); localStorage.removeItem("applied-coupon");
      setCouponMessage(err?.message || "Wrong coupon code");
    } finally { setLoading(false); }
  };

  const handleCancelCoupon = () => {
    setCoupon(""); setDiscountData(null);
    localStorage.removeItem("applied-coupon");
    setCouponMessage("Coupon cancelled.");
  };

  /* ── Subtotal (plan prices only) ── */
  const subtotal = cart.reduce((acc, item) => {
    return acc + Number(item.planPrice ?? item.formData?.price ?? 0) * Number(item.formData?.priceQty ?? 1);
  }, 0);

  /* ── Activation fees ── */
  const ACTIVATION_FEE_PER_LINE = 13.99;
  const totalActivationFees = cart.reduce((acc, item) => {
    const lt = item.lineType?.toLowerCase();
    if (lt === "prepaid" || lt === "travel")
      return acc + ACTIVATION_FEE_PER_LINE * Number(item.formData?.priceQty ?? 1);
    return acc;
  }, 0);

  const prepaidLineCount = cart.reduce((acc, item) => {
    const lt = item.lineType?.toLowerCase();
    return (lt === "prepaid" || lt === "travel") ? acc + Number(item.formData?.priceQty ?? 1) : acc;
  }, 0);

  const totalFamilyBundleDiscount = groupedBundles.reduce((acc, b) => acc + b.bundleDiscount, 0);

  const discountAmount = discountData
    ? discountData.type === "percentage"
      ? (subtotal * Number(discountData.discount)) / 100
      : Number(discountData.discount)
    : 0;

  useEffect(() => {
    setShippingFee(needsShipping ? selectedShippingOption.value : 0);
  }, [selectedShippingOption, needsShipping]);

  /* ── Grand total includes protection ── */
  const total = Math.max(
    subtotal + totalActivationFees + shippingFee - discountAmount - totalFamilyBundleDiscount,
    0
  );

  const validateFields = () => {
    const newErrors: Errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;
    newErrors.billingFirstName   = billingAddress.firstName ? "" : "First name is required";
    newErrors.billingLastName    = billingAddress.lastName  ? "" : "Last name is required";
    newErrors.billingState       = billingAddress.state     ? "" : "State is required";
    newErrors.billingCity        = billingAddress.city      ? "" : "City is required";
    newErrors.billingHouseNumber = billingAddress.houseNumber ? "" : "House number is required";
    newErrors.billingZip         = billingAddress.zip       ? "" : "ZIP code is required";
    newErrors.billingEmail       = emailRegex.test(billingAddress.email) ? "" : "Invalid email address";
    newErrors.billingPhone       = phoneRegex.test(billingAddress.phone) ? "" : "Invalid phone number";
    if (showShipping) {
      newErrors.shippingFirstName   = shippingAddress.firstName   ? "" : "First name is required";
      newErrors.shippingLastName    = shippingAddress.lastName    ? "" : "Last name is required";
      newErrors.shippingState       = shippingAddress.state       ? "" : "State is required";
      newErrors.shippingCity        = shippingAddress.city        ? "" : "City is required";
      newErrors.shippingHouseNumber = shippingAddress.houseNumber ? "" : "House number is required";
      newErrors.shippingZip         = shippingAddress.zip         ? "" : "ZIP code is required";
      newErrors.shippingEmail       = emailRegex.test(shippingAddress.email) ? "" : "Invalid email address";
      newErrors.shippingPhone       = phoneRegex.test(shippingAddress.phone) ? "" : "Invalid phone number";
    }
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e && e.length);
  };

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) { setLoginReason("Please login to complete checkout."); setShowLoginPopup(true); return; }
    if (!agreeTerms) { setShowTermsPopup(true); return; }
    if (!validateFields()) { alert("Please fill all required fields correctly"); return; }
    if (!stripeFormRef.current) { alert("Payment form not ready"); return; }
    setLoading(true);
    const result = await stripeFormRef.current.submitPayment();
    if (!result.success || !result.paymentIntentId) { setLoading(false); return; }
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const res = await fetch("/api/process-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentIntentId: result.paymentIntentId,
        paymentResponse: result,
        cart,
        familyDiscounts,
        billingAddress,
        shippingAddress: showShipping ? shippingAddress : billingAddress,
        subtotal,
        totalActivationFees,
        shippingFee,
        discountAmount,
        totalFamilyBundleDiscount,
        total,
        logged_user: user?.email ?? null,
        order_shipping_email: shippingAddress?.email || billingAddress?.email || null,
        applied_coupon: JSON.parse(localStorage.getItem("applied-coupon") || "null"),
      }),
    });
    if (!res.ok) { alert("Order processing failed"); setLoading(false); return; }
    setShowThankYou(true);
    syncCart([]);
    localStorage.removeItem("family-discounts");
    setLoading(false);
  };

  const formatDiscount = (value: string) => {
    const num = parseFloat(value);
    return Number.isInteger(num) ? num.toString() : num.toFixed(2);
  };

  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(media.matches);
    const listener = (e: any) => setIsDark(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const appearance: Appearance = {
    theme: isDark ? "night" : "stripe",
    variables: {
      colorPrimary: "#FD4C0E",
      colorBackground: isDark ? "#374151" : "#ffffff",
      colorText: isDark ? "#f3f4f6" : "#111827",
      colorDanger: "#ef4444",
      colorTextPlaceholder: isDark ? "#9ca3af" : "#6b7280",
      borderRadius: "8px",
    },
    rules: {
      ".Input": { padding: "12px", border: `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`, backgroundColor: isDark ? "#374151" : "#ffffff" },
      ".Input:focus": { border: "1px solid #FD4C0E", boxShadow: "0 0 0 1px #FD4C0E" },
      ".Label": { fontWeight: "500" },
    },
  };

  useEffect(() => {
    if (cart.length === 0) return;
    const createIntent = async () => {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, billingAddress, shippingAddress: showShipping ? shippingAddress : billingAddress, subtotal, totalActivationFees, shippingFee, discountAmount, total }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };
    createIntent();
  }, [cart, billingAddress, shippingAddress, subtotal, totalActivationFees, shippingFee, discountAmount, total]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-[#FD4C0E] text-white py-3">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm md:text-base">Get Our Best Postpaid Mobile Plans & Pay Only for Every Need!</p>
          </div>
        </div>

        <div className="container mx-auto py-4 md:py-8 lg:py-12 px-4 md:px-12 lg:px-24 xl:px-30 2xl:px-32 bg-[#fd4c0e0d]">
          {cart.length === 0 ? (
            <div className="flex flex-col justify-center items-center text-center min-h-[60vh]">
              <ShoppingCart className="w-32 h-32 text-gray-300 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-8">Looks like you have not added anything to your cart yet.</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-4xl">
                {[
                  { href: "/prepaid-plans",  icon: <Phone className="w-5 h-5" />,      label: "Prepaid plans" },
                  { href: "/postpaid-plans", icon: <Smartphone className="w-5 h-5" />, label: "Postpaid plans" },
                  { href: "/business",       icon: <Vibrate className="w-5 h-5" />,    label: "Business Deals" },
                  { href: "/travel-plans",   icon: <Plane className="w-5 h-5" />,      label: "Travel Plans" },
                ].map(({ href, icon, label }) => (
                  <a key={href} href={href} className="flex items-center justify-center gap-2 bg-[#FD4C0E] hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition">
                    {icon} {label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#FD4C0E]">Checkout</h3>
                  <p className="text-sm text-gray-500">Connecting Every Possibility with Zoiko Mobile!</p>
                </div>
                <button
                  className="flex w-full sm:w-auto items-center justify-center gap-2 bg-[#FD4C0E] hover:bg-red-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                  onClick={handleClearCart} disabled={loading}
                >
                  <Trash2 className="w-4 h-4" /> Clear Cart
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ── Left column ── */}
                <div className="lg:col-span-2 space-y-6">

                  {/* Family Bundle Groups */}
                  {groupedBundles.map((bundle) => (
                    <div key={bundle.bundleId} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-[#FD4C0E]/20">
                      <div className="bg-gradient-to-r from-[#FD4C0E] to-[#ff6b3d] text-white p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <Users className="w-6 h-6" />
                            <div>
                              <h5 className="text-lg font-bold">Family Bundle Plan</h5>
                              <p className="text-sm text-white/90">{bundle.items.length} line{bundle.items.length > 1 ? "s" : ""} • Save ${bundle.bundleDiscount.toFixed(2)}</p>
                            </div>
                          </div>
                          <button className="text-white hover:text-red-200 p-2 transition" onClick={() => handleRemove(bundle.bundleId, 0)} disabled={loading}>
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        {bundle.items.map((item, itemIdx) => {
                          const isPrimary = itemIdx === 0;
                          const lineDiscount = !isPrimary ? bundle.familyDiscounts.find((d) => d.line === `line${itemIdx}`) : null;
                          return (
                            <div key={itemIdx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <span className={`${isPrimary ? "bg-[#FD4C0E]" : "bg-blue-500"} text-white text-xs font-semibold px-2 py-1 rounded`}>
                                      {isPrimary ? "Primary Line" : `Line ${itemIdx + 1}`}
                                    </span>
                                    {lineDiscount && (
                                      <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
                                        <Tag className="w-3 h-3" /> -{lineDiscount.amount.toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                  <h6 className="font-bold text-gray-900 dark:text-white">{item.planTitle}</h6>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Line Type: {item.lineType || "N/A"}{item.simType && item.simType !== "device_protection" ? ` | SIM: ${item.simType?.toLowerCase() === "psim" ? "pSIM" : "eSIM"}` : ""}
                                  </p>

                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="text-lg font-bold text-[#FD4C0E]">${Number(item.planPrice).toFixed(2)}</span>
                                  <span className="text-sm text-gray-500 ml-1">/ {item.planDuration}</span>

                                </div>
                                <div className="flex items-center gap-3">
                                  <button className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleQuantity(bundle.bundleId, cart.indexOf(item), -1)} disabled>
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="font-semibold min-w-[20px] text-center">{item.formData?.priceQty ?? 1}</span>
                                  <button className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleQuantity(bundle.bundleId, cart.indexOf(item), 1)} disabled>
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 border-t-2 border-green-200 dark:border-green-700 p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-green-700 dark:text-green-400">Family Bundle Savings</span>
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">-${bundle.bundleDiscount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Regular Items */}
                  {regularItems.map((item, idx) => {
                    return (
                      <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h5 className="text-lg font-bold text-[#FD4C0E]">{item.planTitle}</h5>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Line Type: {item.lineType || "N/A"}{item.simType && item.simType !== "device_protection" ? ` | SIM: ${item.simType?.toLowerCase() === "psim" ? "pSIM" : "eSIM"}` : ""}
                            </p>

                          </div>
                          <button className="text-[#FD4C0E] hover:text-red-700 p-2 transition" onClick={() => handleRemove(null, cart.indexOf(item))} disabled={loading}>
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-bold text-gray-900 dark:text-white">
                              ${Number(item.planPrice ?? item.formData?.price ?? 0).toFixed(2)} / {item.planDuration}
                            </span>

                          </div>
                          <div className="flex items-center gap-3">
                            <button className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition" onClick={() => handleQuantity(null, cart.indexOf(item), -1)} disabled={loading}>
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold">{item.formData?.priceQty ?? 1}</span>
                            <button className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition" onClick={() => handleQuantity(null, cart.indexOf(item), 1)} disabled={loading}>
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Coupon */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h5 className="font-bold mb-4 text-gray-900 dark:text-white">Have a Coupon?</h5>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      {!discountData ? (
                        <>
                          <input type="text" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD4C0E]" placeholder="Enter coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} disabled={loading} />
                          <button className="w-full sm:w-auto bg-[#FD4C0E] hover:bg-red-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50" onClick={handleApplyCoupon} disabled={loading}>Apply</button>
                        </>
                      ) : (
                        <div className="flex items-center justify-between w-full bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg border border-green-300 dark:border-green-700">
                          <span className="text-green-700 dark:text-green-400 font-semibold text-sm">Coupon "{discountData.name || coupon}" Applied</span>
                          <button onClick={handleCancelCoupon} className="text-red-500 hover:text-red-700 transition"><X className="w-5 h-5" /></button>
                        </div>
                      )}
                    </div>
                    {couponMessage && <p className={`mt-2 text-sm ${discountData ? "text-green-600" : "text-[#FD4C0E]"}`}>{couponMessage}</p>}
                  </div>

                  {/* Billing Details */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h5 className="font-bold mb-4 text-gray-900 dark:text-white">Service/Billing Details</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.keys(billingAddress).map((key) => {
                        const meta = billingFieldMeta[key] || {};
                        const errorKey = `billing${key.charAt(0).toUpperCase() + key.slice(1)}`;
                        const isRequired = ["firstName","lastName","state","city","houseNumber","zip","email"].includes(key);
                        return (
                          <div key={key}>
                            <label className="block text-sm font-semibold mb-1 text-gray-900 dark:text-white">
                              {meta.label || key.replace(/([A-Z])/g, " $1")}
                              {isRequired && <span className="text-[#FD4C0E] ml-1">*</span>}
                            </label>
                            {key === "state" ? (
                              <select className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FD4C0E] ${errors[errorKey] ? "border-[#FD4C0E]" : "border-gray-300 dark:border-gray-600"}`} value={billingAddress.state} onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })} disabled={loading}>
                                {usStates.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
                              </select>
                            ) : (
                              <input type="text" className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FD4C0E] ${errors[errorKey] ? "border-[#FD4C0E]" : "border-gray-300 dark:border-gray-600"}`} placeholder={meta.placeholder || `Enter ${key}`} value={billingAddress[key as keyof Address]} disabled={meta.disabled || loading} onChange={(e) => setBillingAddress({ ...billingAddress, [key]: e.target.value })} />
                            )}
                            {errors[errorKey] && <p className="text-[#FD4C0E] text-xs mt-1">{errors[errorKey]}</p>}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-[#FD4C0E] border-gray-300 rounded focus:ring-[#FD4C0E]" checked={showShipping} onChange={(e) => setShowShipping(e.target.checked)} disabled={loading} />
                        <span className="text-sm text-gray-900 dark:text-white">Ship to a different address?</span>
                      </label>
                    </div>
                    {showShipping && (
                      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                        <h6 className="font-bold mb-4 text-[#FD4C0E]">Shipping Address</h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.keys(shippingAddress).map((key) => {
                            const meta = billingFieldMeta[key] || {};
                            const errorKey = `shipping${key.charAt(0).toUpperCase() + key.slice(1)}`;
                            const isRequired = ["firstName","lastName","state","city","houseNumber","zip","email"].includes(key);
                            return (
                              <div key={key}>
                                <label className="block text-sm font-semibold mb-1 text-gray-900 dark:text-white">
                                  {meta.label || key.replace(/([A-Z])/g, " $1")}
                                  {isRequired && <span className="text-[#FD4C0E] ml-1">*</span>}
                                </label>
                                {key === "state" ? (
                                  <select className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FD4C0E] ${errors[errorKey] ? "border-[#FD4C0E]" : "border-gray-300 dark:border-gray-500"}`} value={shippingAddress.state} onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} disabled={loading}>
                                    <option value="">Select state</option>
                                    {usStates.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
                                  </select>
                                ) : (
                                  <input type="text" className={`w-full px-4 py-2 border rounded-lg dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FD4C0E] ${errors[errorKey] ? "border-[#FD4C0E]" : "border-gray-300 dark:border-gray-500"}`} placeholder={meta.placeholder || `Enter ${key}`} value={shippingAddress[key as keyof Address]} disabled={meta.disabled || loading} onChange={(e) => setShippingAddress({ ...shippingAddress, [key]: e.target.value })} />
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

                {/* ── Order Summary Sidebar ── */}
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h5 className="font-bold mb-4 text-gray-900 dark:text-white">Your Order</h5>

                    {/* Family bundles summary */}
                    {groupedBundles.map((bundle, bundleIdx) => (
                      <div key={bundleIdx} className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="w-4 h-4 text-[#FD4C0E]" />
                          <h6 className="font-bold text-sm text-[#FD4C0E]">Family Bundle {bundleIdx + 1}</h6>
                        </div>
                        <div className="space-y-2 ml-6">
                          {bundle.items.map((item, itemIdx) => {
                            const isPrimary = itemIdx === 0;
                            const lineDiscount = !isPrimary ? bundle.familyDiscounts.find((d) => d.line === `line${itemIdx}`) : null;
                            const itemTotal = item.planPrice * (item.formData?.priceQty || 1);
                            const discountedPrice = lineDiscount ? itemTotal - lineDiscount.amount * (item.formData?.priceQty || 1) : itemTotal;
                            return (
                              <div key={itemIdx} className="space-y-1">
                                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                                  <span className="flex items-center gap-2">
                                    <span className={`${isPrimary ? "text-[#FD4C0E]" : "text-blue-500"} font-semibold text-xs`}>{isPrimary ? "●" : "○"}</span>
                                    {item.planTitle} ({item.simType}) × {item.formData?.priceQty || 1}
                                  </span>
                                  <span className={lineDiscount ? "line-through text-gray-400" : "font-semibold"}>${itemTotal.toFixed(2)}</span>
                                </div>
                                {lineDiscount && (
                                  <div className="flex justify-between text-xs text-green-600 dark:text-green-400 ml-4">
                                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> Line discount (-${lineDiscount.amount.toFixed(2)} each)</span>
                                    <span className="font-semibold">${discountedPrice.toFixed(2)}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {bundle.bundleDiscount > 0 && (
                          <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-700">
                            <div className="flex justify-between text-sm font-semibold text-green-600 dark:text-green-400">
                              <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> Bundle Discount</span>
                              <span>-${bundle.bundleDiscount.toFixed(2)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Regular items summary */}
                    {regularItems.length > 0 && (
                      <div className="space-y-3 mb-4">
                        {regularItems.map((item, idx) => {
                          return (
                            <div key={idx}>
                              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                                <span className="flex-1">
                                  {item.planTitle} ({item.simType?.toLowerCase() === "psim" ? "pSIM" : "eSIM"}) × {item.formData?.priceQty || 1}
                                </span>
                                <span className="font-semibold">${(item.planPrice * (item.formData?.priceQty || 1)).toFixed(2)}</span>
                              </div>

                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Subtotal */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mb-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">Subtotal</span>
                        <span className="font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                      </div>
                    </div>



                    {/* Coupon discount */}
                    {discountData && (
                      <div className="flex justify-between text-sm text-green-600 dark:text-green-400 mb-2">
                        <span>Coupon {discountData.name ? `"${discountData.name}"` : ""} ({discountData.type === "percentage" ? formatDiscount(discountData.discount) + "%" : "$" + formatDiscount(discountData.discount)})</span>
                        <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    {/* Activation fees */}
                    {totalActivationFees > 0 && (
                      <div className="mb-3 rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <span className="font-medium text-orange-800 dark:text-orange-300">Activation Fees</span>
                            <p className="text-xs text-orange-600 dark:text-orange-400">{prepaidLineCount} prepaid/travel line{prepaidLineCount > 1 ? "s" : ""} × ${ACTIVATION_FEE_PER_LINE.toFixed(2)}</p>
                          </div>
                          <span className="font-bold text-orange-800 dark:text-orange-300">${totalActivationFees.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {/* Family savings */}
                    {totalFamilyBundleDiscount > 0 && (
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-3">
                        <div className="flex justify-between text-sm font-bold text-green-600 dark:text-green-400">
                          <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Total Family Savings</span>
                          <span>-${totalFamilyBundleDiscount.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {/* Shipping */}
                    {needsShipping && (
                      <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 my-4">
                        <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">Shipping Options</label>
                        <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD4C0E]" value={selectedShippingOption.value} onChange={(e) => { const opt = shippingOptions.find((o) => o.value === parseFloat(e.target.value)); if (opt) setSelectedShippingOption(opt); }}>
                          {shippingOptions.map((opt, i) => <option key={i} value={opt.value}>{opt.label} - ${opt.value}</option>)}
                        </select>
                        <div className="flex justify-between mt-3 text-sm text-gray-700 dark:text-gray-300">
                          <span>Shipping Fee</span>
                          <span className="font-semibold">${shippingFee.toFixed(2)}</span>
                        </div>
                      </div>
                    )}

                    {/* Total */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-gray-900 dark:text-white">Total</span>
                        <span className="text-[#FD4C0E]">${total.toFixed(2)}</span>
                      </div>
                      {totalFamilyBundleDiscount > 0 && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2 text-right">🎉 You saved ${totalFamilyBundleDiscount.toFixed(2)} with family bundles!</p>
                      )}
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h5 className="font-bold mb-4 text-gray-900 dark:text-white">Payment Method</h5>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4">
                      {clientSecret && (
                        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                          <StripePaymentForm ref={stripeFormRef} />
                        </Elements>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 mt-1 text-[#FD4C0E] border-gray-300 rounded focus:ring-[#FD4C0E]" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} disabled={loading} />
                        <span className="text-sm text-gray-900 dark:text-white">I have read and agree to the website terms and conditions.</span>
                      </label>
                    </div>
                    <button className="w-full bg-[#FD4C0E] hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2" onClick={handlePlaceOrder} disabled={loading}>
                      {loading ? (<><Loader2 className="w-5 h-5 animate-spin" /> Processing Order...</>) : "Place Order"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />

      {/* Login popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/50">
          <div className="w-[90%] max-w-md rounded-lg bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex items-center justify-between border-b dark:border-gray-700 px-4 py-3">
              <h5 className="font-semibold text-gray-800 dark:text-white">Login Required</h5>
              <button type="button" onClick={() => setShowLoginPopup(false)} className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">✕</button>
            </div>
            <div className="px-6 py-5 text-center">
              <p className="text-gray-600 dark:text-gray-300">{loginReason || "You need to login."}</p>
              <a href={`/login?redirect=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "/")}`} className="mt-5 inline-block w-full rounded-md border border-[#DF1E5A] bg-[#DF1E5A] px-4 py-3 font-semibold text-white transition hover:bg-[#c91a50]">Go to Login</a>
              <button type="button" onClick={() => setShowLoginPopup(false)} className="mt-3 text-sm text-gray-500 hover:underline dark:text-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Terms popup */}
      {showTermsPopup && (
        <div className="fixed inset-0 z-[1060] flex items-center justify-center bg-black/50">
          <div className="w-[90%] max-w-sm rounded-lg bg-white dark:bg-gray-800 p-6 text-center shadow-lg">
            <h5 className="mb-3 font-bold text-[#FD4C0E]">Terms &amp; Conditions Required</h5>
            <p className="text-sm text-gray-600 dark:text-gray-300">You must agree to the website <a href="/terms-and-conditions" className="font-medium text-[#FD4C0E] underline">terms and conditions</a> before placing your order.</p>
            <button type="button" onClick={() => setShowTermsPopup(false)} className="mt-5 w-full rounded-md bg-[#DF1E5A] px-4 py-3 font-semibold text-white transition hover:bg-[#c91a50]">OK</button>
          </div>
        </div>
      )}

      {/* Thank you modal */}
      {showThankYou && (
        <div className="fixed inset-0 z-[1070] flex items-center justify-center bg-black/50">
          <div className="w-[90%] max-w-md rounded-xl bg-white dark:bg-gray-800 shadow-xl">
            <div className="flex items-center justify-between border-b dark:border-gray-700 px-5 py-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Thank You!</h3>
              <button type="button" onClick={() => setShowThankYou(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">✕</button>
            </div>
            <div className="px-6 py-6 text-center">
              <div className="text-5xl text-green-600">✔️</div>
              <h4 className="mt-4 text-lg font-semibold text-green-600">Your order has been successfully placed!</h4>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">A confirmation email has been sent with your order details.</p>
            </div>
            <div className="border-t dark:border-gray-700 px-6 py-4">
              <button type="button" onClick={() => setShowThankYou(false)} className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700">Continue Shopping</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}