"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { ShippingAddress, recordOrderInFirestore } from "@/lib/firebase";
import { createCashfreeOrder, launchCashfreeCheckout, loadCashfreeSDK } from "@/lib/cashfree";
import confetti from "canvas-confetti";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  Building2,
  Lock,
  MapPin,
  Sparkles,
  Phone,
  User as UserIcon,
  ChevronRight,
  LogOut,
  CreditCard,
  Package
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    totalItems,
    subtotal,
    shipping,
    total,
    removeFromCart,
    updateQuantity,
    clearCart,
    currentUser,
    customerProfile,
    loginWithGoogle,
    logout,
    saveAddress,
    showToast
  } = useCart();

  // Checkout State
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "Assam"
  });

  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{
    orderId: string;
    cfOrderId?: string;
    amount: number;
    address: ShippingAddress;
  } | null>(null);

  // Preload Cashfree SDK on cart mount
  useEffect(() => {
    loadCashfreeSDK().catch((err) => console.warn("Cashfree SDK preload:", err));
  }, []);

  // Set default address when customer profile loads
  useEffect(() => {
    if (customerProfile && customerProfile.addresses && customerProfile.addresses.length > 0) {
      if (!selectedAddressId) {
        const defaultAddr = customerProfile.addresses.find((a) => a.isDefault) || customerProfile.addresses[0];
        setSelectedAddressId(defaultAddr.id);
      }
    } else if (currentUser && (!customerProfile || customerProfile.addresses.length === 0)) {
      setIsAddingNewAddress(true);
      // Pre-populate name if available
      if (currentUser.displayName) {
        setAddressForm((prev) => ({ ...prev, fullName: currentUser.displayName || "" }));
      }
    }
  }, [customerProfile, currentUser, selectedAddressId]);

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.fullName || !addressForm.phone || !addressForm.pincode || !addressForm.addressLine1 || !addressForm.city) {
      showToast("Please fill all required address fields");
      return;
    }

    try {
      setIsSavingAddress(true);
      const saved = await saveAddress({
        fullName: addressForm.fullName,
        phone: addressForm.phone,
        pincode: addressForm.pincode,
        addressLine1: addressForm.addressLine1,
        addressLine2: addressForm.addressLine2,
        landmark: addressForm.landmark,
        city: addressForm.city,
        state: addressForm.state,
        isDefault: true
      });
      setSelectedAddressId(saved.id);
      setIsAddingNewAddress(false);
    } catch (err: unknown) {
      const error = err as Error;
      showToast(error.message || "Failed to save address");
    } finally {
      setIsSavingAddress(false);
    }
  };

  const selectedAddress = customerProfile?.addresses?.find((a) => a.id === selectedAddressId) || null;

  const handleProceedToPayment = async () => {
    if (!currentUser) {
      showToast("Please sign in with Google to continue");
      return;
    }

    if (!selectedAddress) {
      showToast("Please select or add a shipping address");
      return;
    }

    if (items.length === 0) {
      showToast("Your cart is empty");
      return;
    }

    try {
      setIsProcessingPayment(true);
      showToast("Initializing Cashfree Payment Gateway...");

      // 1. Create order session via Cashfree API
      const orderRes = await createCashfreeOrder({
        orderAmount: total,
        customerId: currentUser.uid,
        customerName: selectedAddress.fullName || currentUser.displayName || "Valued Customer",
        customerEmail: currentUser.email || "sales@kritikafoundation.com",
        customerPhone: selectedAddress.phone || "9954367393",
        orderNote: `Kritika Showroom Order for ${items.length} items`
      });

      // 2. Launch Cashfree Drop-in Checkout Modal
      const checkoutResult = await launchCashfreeCheckout(orderRes.payment_session_id);

      if (checkoutResult.error) {
        showToast("Payment was not completed. You can try again anytime.");
        setIsProcessingPayment(false);
        return;
      }

      // 3. User completed payment attempt or submitted
      // Record order into Firestore
      await recordOrderInFirestore({
        orderId: orderRes.order_id,
        cfOrderId: orderRes.cf_order_id,
        paymentSessionId: orderRes.payment_session_id,
        userId: currentUser.uid,
        customerEmail: currentUser.email || "",
        customerName: selectedAddress.fullName,
        customerPhone: selectedAddress.phone,
        shippingAddress: selectedAddress,
        items: items,
        totalAmount: total,
        paymentStatus: "CONFIRMED_STAGING"
      });

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if canvas-confetti unavailable
      }

      setOrderSuccess({
        orderId: orderRes.order_id,
        cfOrderId: orderRes.cf_order_id,
        amount: total,
        address: selectedAddress
      });

      clearCart();
      showToast("Payment initiated successfully! Order confirmed.");
    } catch (err: unknown) {
      const error = err as Error;
      showToast(error.message || "Failed to initialize payment gateway");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030508] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar onOpenEnquiry={() => {}} />

      <main className="flex-1 pt-24 sm:pt-28 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
            <Link href="/" className="hover:text-cyan-400 transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-cyan-400 transition">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Shopping Cart &amp; Checkout</span>
          </div>

          {/* SUCCESS SCREEN */}
          {orderSuccess ? (
            <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#070C18] border border-emerald-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                  Order Successfully Placed
                </span>
                <h1 className="text-2xl sm:text-4xl font-black font-heading text-white">
                  Thank You for Your Order!
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                  Your payment has been registered with Cashfree Gateway and your order docket is securely stored in Google Firestore.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-left max-w-xl mx-auto space-y-3 font-mono text-xs text-slate-300">
                <div className="flex justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="text-cyan-400 font-bold">{orderSuccess.orderId}</span>
                </div>
                {orderSuccess.cfOrderId && (
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-500">Cashfree Ref:</span>
                    <span className="text-white">{orderSuccess.cfOrderId}</span>
                  </div>
                )}
                <div className="flex justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-500">Total Amount:</span>
                  <span className="text-emerald-400 font-bold">₹{orderSuccess.amount.toLocaleString("en-IN")}.00</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500 block mb-1">Shipping Destination:</span>
                  <span className="text-white font-sans font-medium block">
                    {orderSuccess.address.fullName} • {orderSuccess.address.phone}
                  </span>
                  <span className="text-slate-400 font-sans text-[11px] block">
                    {orderSuccess.address.addressLine1}, {orderSuccess.address.city}, {orderSuccess.address.state} – {orderSuccess.address.pincode}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="px-6 py-3 rounded-xl text-xs font-mono font-bold text-[#030508] bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition flex items-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
                >
                  Back to Showroom Home
                </Link>
              </div>
            </div>
          ) : items.length === 0 ? (
            /* EMPTY CART */
            <div className="p-12 sm:p-16 rounded-3xl bg-[#070C18] border border-white/10 text-center max-w-2xl mx-auto space-y-6 shadow-2xl">
              <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 flex items-center justify-center mx-auto">
                <ShoppingCart className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  Your Cart is Empty
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  You haven&apos;t added any e-rickshaw spare parts, BLDC motors, or accessories to your cart yet.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-mono font-bold text-[#030508] bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition"
                >
                  <span>Explore Accessories Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* ACTIVE CART & CHECKOUT SPLIT */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column (Col 7 / 12): Items + Stepper */}
              <div className="lg:col-span-7 space-y-8">
                {/* 1. CART ITEMS LIST */}
                <div className="p-6 rounded-2xl bg-[#070C18] border border-white/10 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-cyan-400" />
                      <h2 className="text-lg font-bold font-heading text-white">
                        Cart Items ({totalItems})
                      </h2>
                    </div>
                    <button
                      onClick={clearCart}
                      className="text-xs font-mono text-slate-400 hover:text-rose-400 transition"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="space-y-4 divide-y divide-white/5">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-16 h-16 rounded-xl bg-black/40 border border-white/10 relative overflow-hidden shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-mono uppercase text-cyan-400 block">
                              {item.category}
                            </span>
                            <h3 className="text-sm font-bold font-heading text-white truncate max-w-xs sm:max-w-sm">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-mono font-bold text-emerald-400">
                                ₹{item.price.toLocaleString("en-IN")}.00
                              </span>
                              {item.originalPrice && (
                                <span className="text-[10px] font-mono text-slate-500 line-through">
                                  ₹{item.originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Stepper & Removal */}
                        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                          <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.02] p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5 transition"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-mono font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5 transition"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-mono font-bold text-white block">
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}.00
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[11px] font-mono text-slate-500 hover:text-rose-400 transition flex items-center gap-1 mt-0.5 ml-auto"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. AUTHENTICATION STEP */}
                <div className="p-6 rounded-2xl bg-[#070C18] border border-white/10 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                        1
                      </span>
                      <h3 className="text-base font-bold font-heading text-white">
                        Customer Account (Google Sign-In)
                      </h3>
                    </div>
                    {currentUser && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Account</span>
                      </span>
                    )}
                  </div>

                  {!currentUser ? (
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Sign in with your Google account to connect your order, save your shipping address in Firestore, and unlock secure Cashfree checkout.
                      </p>

                      <button
                        onClick={loginWithGoogle}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs transition flex items-center justify-center gap-3 shadow-lg cursor-pointer font-sans"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span>Sign in with Google</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-cyan-500/[0.06] border border-cyan-400/20">
                      <div className="flex items-center gap-3">
                        {currentUser.photoURL ? (
                          <div className="w-10 h-10 rounded-full relative overflow-hidden border border-cyan-400/40">
                            <Image
                              src={currentUser.photoURL}
                              alt="Avatar"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                            <UserIcon className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <span className="text-sm font-bold text-white block">
                            {currentUser.displayName || "Google Customer"}
                          </span>
                          <span className="text-xs font-mono text-slate-400 block">
                            {currentUser.email}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={logout}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition text-xs font-mono flex items-center gap-1.5"
                        title="Sign Out"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. SHIPPING ADDRESS STEP (FIRESTORE) */}
                <div className="p-6 rounded-2xl bg-[#070C18] border border-white/10 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center">
                        2
                      </span>
                      <h3 className="text-base font-bold font-heading text-white">
                        Delivery Address (Google Firestore)
                      </h3>
                    </div>
                    {currentUser && customerProfile?.addresses && customerProfile.addresses.length > 0 && !isAddingNewAddress && (
                      <button
                        onClick={() => setIsAddingNewAddress(true)}
                        className="text-xs font-mono text-cyan-400 hover:text-white transition flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Address</span>
                      </button>
                    )}
                  </div>

                  {!currentUser ? (
                    <p className="text-xs text-slate-400 italic">
                      Please sign in with Google in Step 1 to select or save your shipping destination.
                    </p>
                  ) : isAddingNewAddress ? (
                    /* ADD ADDRESS FORM */
                    <form onSubmit={handleSaveAddress} className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                            Recipient Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={addressForm.fullName}
                            onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                            placeholder="e.g. Ronald Smith"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                            Mobile Number (10 Digits) *
                          </label>
                          <input
                            type="tel"
                            required
                            maxLength={10}
                            value={addressForm.phone}
                            onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value.replace(/\D/g, "") })}
                            placeholder="e.g. 9954367393"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                          Street Address / House No. / Area *
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.addressLine1}
                          onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                          placeholder="e.g. House No. 24, Near Pegu Bazaar, Dhemaji Town"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                            City / Town *
                          </label>
                          <input
                            type="text"
                            required
                            value={addressForm.city}
                            onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                            placeholder="e.g. Dhemaji"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-cyan-400"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                            State *
                          </label>
                          <select
                            value={addressForm.state}
                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#091124] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-cyan-400"
                          >
                            <option value="Assam">Assam</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Other">Other States</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                            Pincode (6 Digits) *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={addressForm.pincode}
                            onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value.replace(/\D/g, "") })}
                            placeholder="e.g. 787057"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-cyan-400"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={isSavingAddress}
                          className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-[#030508] bg-gradient-to-r from-emerald-400 to-cyan-400 hover:brightness-110 transition shadow-md cursor-pointer disabled:opacity-50"
                        >
                          {isSavingAddress ? "Saving to Firestore..." : "Save Address"}
                        </button>

                        {customerProfile?.addresses && customerProfile.addresses.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setIsAddingNewAddress(false)}
                            className="px-4 py-2.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  ) : (
                    /* LIST SAVED ADDRESSES */
                    <div className="space-y-3">
                      {customerProfile?.addresses?.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        return (
                          <div
                            key={addr.id}
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`p-4 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                              isSelected
                                ? "bg-cyan-500/10 border-cyan-400/40 shadow-md shadow-cyan-500/10"
                                : "bg-white/[0.02] border-white/10 hover:border-white/20"
                            }`}
                          >
                            <input
                              type="radio"
                              name="shipping_addr"
                              checked={isSelected}
                              onChange={() => setSelectedAddressId(addr.id)}
                              className="mt-1 accent-cyan-400"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white font-heading">
                                  {addr.fullName}
                                </span>
                                <span className="text-xs font-mono text-slate-400">
                                  • {addr.phone}
                                </span>
                                {addr.isDefault && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                                {addr.addressLine1}
                                {addr.addressLine2 && `, ${addr.addressLine2}`}, {addr.city}, {addr.state} –{" "}
                                <strong className="text-white font-mono">{addr.pincode}</strong>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column (Col 5 / 12): Order Summary & Cashfree Button */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                <div className="p-6 rounded-2xl bg-[#070C18] border border-white/10 space-y-6 shadow-2xl">
                  <h3 className="text-base font-bold font-heading text-white pb-3 border-b border-white/10 flex items-center justify-between">
                    <span>Order Summary</span>
                    <span className="text-xs font-mono text-slate-400 font-normal">
                      {totalItems} Item{totalItems > 1 ? "s" : ""}
                    </span>
                  </h3>

                  <div className="space-y-3 text-xs font-mono text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Subtotal</span>
                      <span className="text-white">₹{subtotal.toLocaleString("en-IN")}.00</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>PAN-India Delivery</span>
                      </span>
                      <span className="text-emerald-400 font-semibold uppercase text-[11px]">
                        FREE
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Statutory GST</span>
                      <span className="text-slate-400">Included</span>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm font-bold">
                      <span className="text-white font-heading">Total Payable</span>
                      <span className="text-cyan-400 font-mono text-base">
                        ₹{total.toLocaleString("en-IN")}.00
                      </span>
                    </div>
                  </div>

                  {/* Cashfree Checkout Action */}
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={handleProceedToPayment}
                      disabled={isProcessingPayment || !currentUser || !selectedAddress}
                      className="w-full py-3.5 px-4 rounded-xl text-xs font-mono font-bold text-[#030508] bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 hover:brightness-110 shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessingPayment ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Opening Cashfree Checkout...</span>
                        </>
                      ) : !currentUser ? (
                        <span>Sign In with Google to Checkout</span>
                      ) : !selectedAddress ? (
                        <span>Add Delivery Address to Continue</span>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Pay Securely (₹{total.toLocaleString("en-IN")}.00)</span>
                        </>
                      )}
                    </button>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-[11px] text-slate-400 text-center font-mono">
                      <div className="flex items-center justify-center gap-2 text-slate-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Cashfree Payment Gateway (Sandbox/Testing)</span>
                      </div>
                      <span>Supports UPI, Cards, Netbanking &amp; Wallets</span>
                    </div>
                  </div>
                </div>

                {/* Showroom Trust Card */}
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2 text-white font-bold font-heading">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span>Authorized Showroom Dispatch</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    All spare parts are tested, packaged, and dispatched directly from our flagship facility at Pegu Bazaar, Dhemaji, Assam under statutory warranty guidelines.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

