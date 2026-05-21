"use client";

import { useState } from "react";
import { useCafe } from "../context";
import { CafeButton, CafePanel } from "../components";
import { cafeTokens, routes } from "../tokens";
import { ShieldCheck, ShoppingBag, AlertCircle, Phone, User, Mail, Home } from "lucide-react";

export default function CafeCheckoutPage() {
  const { cart, cartTotal, setCheckoutInfo, setLastOrderId, clearCart, changeView } = useCafe();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const [pickupLocation, setPickupLocation] = useState("Indiranagar Flagship");
  const [address, setAddress] = useState("");
  const [timeSlot, setTimeSlot] = useState("ASAP (15-20 mins)");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Focus and error validation state
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 mx-auto text-gray-300" />
        <h1 className="text-3xl font-bold" style={{ fontFamily: cafeTokens.font.display }}>Your Basket is Empty</h1>
        <p className="text-sm opacity-70">Add some delicious brews or single-origin beans to get started.</p>
        <CafeButton href={routes.menu} variant="primary">Browse Menu</CafeButton>
      </div>
    );
  }

  const deliveryFee = 100; // INR 100 delivery fee
  const totalAmount = cartTotal + (method === "pickup" ? 0 : deliveryFee);

  function validateField(name: string, value: string) {
    let err = "";
    if (!value) {
      err = "This field is required";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      err = "Please enter a valid email address";
    } else if (name === "phone" && !/^\+?[0-9\s-]{10,14}$/.test(value)) {
      err = "Please enter a valid mobile number";
    }
    setErrors((prev) => ({ ...prev, [name]: err }));
  }

  function handleBlur(name: string, value: string) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Trigger validation for all fields
    validateField("fullName", fullName);
    validateField("email", email);
    validateField("phone", phone);
    if (method === "delivery") {
      validateField("address", address);
    }

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      address: method === "delivery",
    });

    const hasErrors =
      !fullName ||
      !email ||
      !phone ||
      errors.fullName ||
      errors.email ||
      errors.phone ||
      (method === "delivery" && (!address || errors.address));

    if (hasErrors) return;

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const orderId = `ROAST-${Math.floor(1000 + Math.random() * 9000)}`;
      setCheckoutInfo({
        fullName,
        email,
        phone,
        method,
        address: method === "delivery" ? address : pickupLocation,
        timeSlot,
      });
      setLastOrderId(orderId);
      clearCart();
      setIsSubmitting(false);
      changeView("order-success");
    }, 1200);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 font-sans pb-24">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8" style={{ fontFamily: cafeTokens.font.display }}>
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Checkout Form */}
        <div className="lg:col-span-7 space-y-6">
          <CafePanel bg="white">
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: cafeTokens.font.display }}>
              1. Fulfillment Method
            </h2>

            {/* Toggle */}
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={() => setMethod("pickup")}
                className="flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-2 rounded-xl transition-all"
                style={{
                  backgroundColor: method === "pickup" ? cafeTokens.color.inkDark : "transparent",
                  color: method === "pickup" ? cafeTokens.color.bgIvory : cafeTokens.color.inkDark,
                  borderColor: method === "pickup" ? cafeTokens.color.inkDark : `${cafeTokens.color.inkDark}33`,
                }}
              >
                In-Store Pickup
              </button>
              <button
                type="button"
                onClick={() => setMethod("delivery")}
                className="flex-1 py-3.5 text-xs font-bold uppercase tracking-wider border-2 rounded-xl transition-all"
                style={{
                  backgroundColor: method === "delivery" ? cafeTokens.color.inkDark : "transparent",
                  color: method === "delivery" ? cafeTokens.color.bgIvory : cafeTokens.color.inkDark,
                  borderColor: method === "delivery" ? cafeTokens.color.inkDark : `${cafeTokens.color.inkDark}33`,
                }}
              >
                Home Delivery
              </button>
            </div>

            {method === "pickup" ? (
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Select Bengaluru Location</label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full mt-1.5 p-3 rounded-lg border-2 bg-gray-50 text-sm outline-none transition-all duration-200 focus:border-[oklch(0.46_0.13_32)] focus:bg-white focus:ring-4 focus:ring-[oklch(0.46_0.13_32_/_0.15)]"
                    style={{ borderColor: `${cafeTokens.color.inkDark}20` }}
                  >
                    <option value="Indiranagar Flagship">Indiranagar Flagship (12th Main Road, Indiranagar)</option>
                    <option value="Koramangala Kiosk">Koramangala Kiosk (80 Feet Road, Koramangala)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pickup Timing</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full mt-1.5 p-3 rounded-lg border-2 bg-gray-50 text-sm outline-none transition-all duration-200 focus:border-[oklch(0.46_0.13_32)] focus:bg-white focus:ring-4 focus:ring-[oklch(0.46_0.13_32_/_0.15)]"
                    style={{ borderColor: `${cafeTokens.color.inkDark}20` }}
                  >
                    <option value="ASAP (15-20 mins)">ASAP (15-20 mins)</option>
                    <option value="In 30 minutes">In 30 minutes</option>
                    <option value="In 1 hour">In 1 hour</option>
                    <option value="Later Today">Later Today</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="delivery-address" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Delivery Address</label>
                  <div className="relative mt-1.5">
                    <Home className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      id="delivery-address"
                      type="text"
                      required
                      placeholder="Flat/House No, Building, Street, Area in Bengaluru"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (touched.address) validateField("address", e.target.value);
                      }}
                      onBlur={() => handleBlur("address", address)}
                      className={`w-full pl-10 p-3 rounded-lg border-2 bg-gray-50 text-sm outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-[oklch(0.46_0.13_32_/_0.15)] ${
                        touched.address && errors.address
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-[oklch(0.46_0.13_32)] border-gray-200"
                      }`}
                    />
                  </div>
                  {touched.address && errors.address && (
                    <p className="mt-1.5 text-xs text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.address}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Preferred Delivery Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full mt-1.5 p-3 rounded-lg border-2 bg-gray-50 text-sm outline-none transition-all duration-200 focus:border-[oklch(0.46_0.13_32)] focus:bg-white focus:ring-4 focus:ring-[oklch(0.46_0.13_32_/_0.15)]"
                    style={{ borderColor: `${cafeTokens.color.inkDark}20` }}
                  >
                    <option value="ASAP (30-45 mins)">ASAP (30-45 mins)</option>
                    <option value="Today evening (6:00 - 7:30 PM)">Today evening (6:00 - 7:30 PM)</option>
                    <option value="Tomorrow morning (9:00 - 11:00 AM)">Tomorrow morning (9:00 - 11:00 AM)</option>
                  </select>
                </div>
              </div>
            )}
          </CafePanel>

          <CafePanel bg="white">
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: cafeTokens.font.display }}>
              2. Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="customer-name" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    id="customer-name"
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (touched.fullName) validateField("fullName", e.target.value);
                    }}
                    onBlur={() => handleBlur("fullName", fullName)}
                    className={`w-full pl-10 p-3 rounded-lg border-2 bg-gray-50 text-sm outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-[oklch(0.46_0.13_32_/_0.15)] ${
                      touched.fullName && errors.fullName
                        ? "border-red-500 focus:border-red-500"
                        : "focus:border-[oklch(0.46_0.13_32)] border-gray-200"
                    }`}
                  />
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-500 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customer-email" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      id="customer-email"
                      type="email"
                      required
                      placeholder="aarav@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (touched.email) validateField("email", e.target.value);
                      }}
                      onBlur={() => handleBlur("email", email)}
                      className={`w-full pl-10 p-3 rounded-lg border-2 bg-gray-50 text-sm outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-[oklch(0.46_0.13_32_/_0.15)] ${
                        touched.email && errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-[oklch(0.46_0.13_32)] border-gray-200"
                      }`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="customer-phone" className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Mobile Number</label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <input
                      id="customer-phone"
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (touched.phone) validateField("phone", e.target.value);
                      }}
                      onBlur={() => handleBlur("phone", phone)}
                      className={`w-full pl-10 p-3 rounded-lg border-2 bg-gray-50 text-sm outline-none transition-all duration-200 focus:bg-white focus:ring-4 focus:ring-[oklch(0.46_0.13_32_/_0.15)] ${
                        touched.phone && errors.phone
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-[oklch(0.46_0.13_32)] border-gray-200"
                      }`}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CafePanel>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <CafePanel bg="paper" className="border-2" style={{ borderColor: cafeTokens.color.inkDark }}>
            <h2 className="text-xl font-bold mb-4" style={{ fontFamily: cafeTokens.font.display }}>
              Order Breakdown
            </h2>

            <div className="divide-y max-h-80 overflow-y-auto mb-6" style={{ borderColor: cafeTokens.color.rule }}>
              {cart.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="py-4 flex justify-between gap-4 text-sm">
                  <div>
                    <p className="font-bold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Size: {item.size} × {item.quantity}</p>
                  </div>
                  <span className="font-bold shrink-0 text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3 text-sm" style={{ borderColor: cafeTokens.color.rule }}>
              <div className="flex justify-between">
                <span className="text-gray-500">Items Subtotal</span>
                <span className="font-bold text-gray-900">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Fulfillment Fee</span>
                <span className="font-bold text-gray-900">{method === "pickup" ? "Free" : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-3 border-t-2" style={{ borderColor: cafeTokens.color.inkDark }}>
                <span>Total Amount</span>
                <span className="text-lg text-[oklch(0.46_0.13_32)]">₹{totalAmount}</span>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[oklch(0.26_0.018_35)] text-white hover:bg-[oklch(0.46_0.13_32)] text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? "Brewing Order..." : "Confirm & Pay (Demo)"}
              </button>
            </div>
          </CafePanel>

          {/* Secure disclaimer */}
          <div className="flex gap-3 text-xs opacity-75 p-4 border rounded-xl bg-white" style={{ borderColor: cafeTokens.color.rule }}>
            <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Demo Environment:</strong> No real payments or financial data are processed. Orders are simulated locally for showcase purposes.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
