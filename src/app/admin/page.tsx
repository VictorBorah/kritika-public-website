"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  auth,
  signInAdminWithGoogle,
  logOutUser,
  onAuthStateChanged,
  isAuthorizedAdminEmail,
  getAllOrders,
  updateOrderStatus,
  getAllCustomers,
  getCustomerOrders,
  getProductAvailabilitySettings,
  saveProductAvailabilitySettings,
  OrderRecord,
  CustomerProfile,
  ShippingAddress,
  AUTHORIZED_ADMIN_EMAILS
} from "@/lib/firebase";
import { ACCESSORIES_CATALOG, ProductItem } from "@/data/accessoriesCatalog";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Package,
  Users,
  Settings,
  CheckCircle2,
  Clock,
  Truck,
  Printer,
  Search,
  Filter,
  Eye,
  LogOut,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  DollarSign,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  Sliders,
  Check,
  X,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Lock,
  UserCheck,
  FileText
} from "lucide-react";
import type { User } from "firebase/auth";

type ActiveTab = "overview" | "orders" | "customers" | "products" | "settings";
type OrderFilter = "All" | "Open" | "Dispatched" | "Closed";

export default function AdminPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");

  // Orders State
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderFilter, setOrderFilter] = useState<OrderFilter>("All");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [statusUpdateInProgress, setStatusUpdateInProgress] = useState(false);
  const [orderUpdateForm, setOrderUpdateForm] = useState({
    status: "Open" as "Open" | "Dispatched" | "Closed",
    courierPartner: "",
    trackingNumber: "",
    adminNotes: ""
  });

  // Customers State
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [customersLoading, setCustomersLoading] = useState(false);
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);
  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState<OrderRecord[]>([]);
  const [customerOrdersLoading, setCustomerOrdersLoading] = useState(false);

  // Print Shipping Label State
  const [shippingLabelData, setShippingLabelData] = useState<{
    customer: CustomerProfile | null;
    address: ShippingAddress | null;
    orderId?: string;
  } | null>(null);

  // Print Invoice / Packing Slip State
  const [packingSlipOrder, setPackingSlipOrder] = useState<OrderRecord | null>(null);

  // Products Availability State
  const [availabilityMap, setAvailabilityMap] = useState<Record<string, boolean>>({});
  const [productsLoading, setProductsLoading] = useState(false);
  const [savingProducts, setSavingProducts] = useState(false);
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);

  // Global feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthLoading(false);

      if (user) {
        const authorized = isAuthorizedAdminEmail(user.email);
        setIsAuthorized(authorized);
        if (!authorized) {
          setShowUnauthorizedModal(true);
        } else {
          setShowUnauthorizedModal(false);
          // Initial data loads for authorized admins
          loadAllData();
        }
      } else {
        setIsAuthorized(false);
        setShowUnauthorizedModal(false);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Fetch all datasets
  const loadAllData = async () => {
    fetchOrders();
    fetchCustomers();
    fetchProductAvailability();
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchCustomers = async () => {
    setCustomersLoading(true);
    try {
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setCustomersLoading(false);
    }
  };

  const fetchProductAvailability = async () => {
    setProductsLoading(true);
    try {
      const map = await getProductAvailabilitySettings();
      // Initialize map with catalog defaults (all true unless explicitly false)
      const fullMap: Record<string, boolean> = {};
      ACCESSORIES_CATALOG.forEach((item) => {
        fullMap[item.id] = map[item.id] !== undefined ? map[item.id] : true;
      });
      setAvailabilityMap(fullMap);
    } catch (err) {
      console.error("Error fetching product availability:", err);
    } finally {
      setProductsLoading(false);
    }
  };

  // Google Admin Sign-in handler
  const handleAdminSignIn = async () => {
    try {
      const { user, isAuthorized: authorized } = await signInAdminWithGoogle();
      setCurrentUser(user);
      setIsAuthorized(authorized);
      if (!authorized) {
        setShowUnauthorizedModal(true);
      } else {
        showToast(`Welcome back, ${user.displayName || "Administrator"}!`);
        loadAllData();
      }
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        console.error("Admin sign-in error:", err);
        showToast("Sign-in failed. Please try again.");
      }
    }
  };

  const handleAdminSignOut = async () => {
    await logOutUser();
    setCurrentUser(null);
    setIsAuthorized(false);
    setShowUnauthorizedModal(false);
    showToast("Signed out successfully.");
  };

  // Open Order Detail Drawer / Modal
  const handleOpenOrderDetail = (order: OrderRecord) => {
    setSelectedOrder(order);
    setOrderUpdateForm({
      status: order.orderStatus,
      courierPartner: order.courierPartner || "",
      trackingNumber: order.trackingNumber || "",
      adminNotes: order.adminNotes || ""
    });
  };

  // Update Order Status in Firestore
  const handleSaveOrderStatus = async () => {
    if (!selectedOrder) return;
    setStatusUpdateInProgress(true);
    try {
      await updateOrderStatus(selectedOrder.id, orderUpdateForm.status, {
        courierPartner: orderUpdateForm.courierPartner,
        trackingNumber: orderUpdateForm.trackingNumber,
        adminNotes: orderUpdateForm.adminNotes
      });

      // Update local state
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id
            ? {
                ...o,
                orderStatus: orderUpdateForm.status,
                courierPartner: orderUpdateForm.courierPartner,
                trackingNumber: orderUpdateForm.trackingNumber,
                adminNotes: orderUpdateForm.adminNotes
              }
            : o
        )
      );

      setSelectedOrder((prev) =>
        prev
          ? {
              ...prev,
              orderStatus: orderUpdateForm.status,
              courierPartner: orderUpdateForm.courierPartner,
              trackingNumber: orderUpdateForm.trackingNumber,
              adminNotes: orderUpdateForm.adminNotes
            }
            : null
      );

      showToast(`Order ${selectedOrder.orderId} updated to ${orderUpdateForm.status}`);
    } catch (err) {
      console.error("Error updating order status:", err);
      showToast("Failed to update order status.");
    } finally {
      setStatusUpdateInProgress(false);
    }
  };

  // View Customer Details
  const handleSelectCustomer = async (cust: CustomerProfile) => {
    setSelectedCustomer(cust);
    setCustomerOrdersLoading(true);
    try {
      const ordersForCust = await getCustomerOrders(cust.uid);
      setSelectedCustomerOrders(ordersForCust);
    } catch (err) {
      console.error("Error fetching customer orders:", err);
    } finally {
      setCustomerOrdersLoading(false);
    }
  };

  // Toggle individual product availability checkbox
  const handleToggleProductAvailability = (productId: string) => {
    setAvailabilityMap((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Save product availability configuration to Firestore
  const handleSaveProductAvailability = async () => {
    if (!currentUser?.email) return;
    setSavingProducts(true);
    try {
      await saveProductAvailabilitySettings(availabilityMap, currentUser.email);
      setSaveSuccessToast(true);
      setTimeout(() => setSaveSuccessToast(false), 3000);
      showToast("Product availability updated and live on storefront!");
    } catch (err) {
      console.error("Error saving product availability:", err);
      showToast("Error saving product availability settings.");
    } finally {
      setSavingProducts(false);
    }
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesFilter =
        orderFilter === "All" || o.orderStatus === orderFilter;
      const q = orderSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        o.orderId.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [orders, orderFilter, orderSearchQuery]);

  // Filtered Customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const q = customerSearchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        (c.displayName && c.displayName.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q)) ||
        (c.phone && c.phone.includes(q)) ||
        c.addresses.some(
          (a) =>
            a.city.toLowerCase().includes(q) ||
            a.state.toLowerCase().includes(q) ||
            a.pincode.includes(q)
        )
      );
    });
  }, [customers, customerSearchQuery]);

  // Executive Metrics
  const metrics = useMemo(() => {
    const totalRev = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const openOrders = orders.filter((o) => o.orderStatus === "Open").length;
    const dispatchedOrders = orders.filter((o) => o.orderStatus === "Dispatched").length;
    const closedOrders = orders.filter((o) => o.orderStatus === "Closed").length;
    const activeProducts = Object.values(availabilityMap).filter((v) => v !== false).length;
    return {
      totalRevenue: totalRev,
      totalOrders: orders.length,
      openOrders,
      dispatchedOrders,
      closedOrders,
      totalCustomers: customers.length,
      activeProducts,
      unavailableProducts: ACCESSORIES_CATALOG.length - activeProducts
    };
  }, [orders, customers, availabilityMap]);

  // Format currency
  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);

  // Format date
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "—";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Helper for status badge color
  const getStatusBadge = (status: "Open" | "Dispatched" | "Closed") => {
    switch (status) {
      case "Open":
        return "bg-amber-500/10 text-amber-300 border-amber-500/30";
      case "Dispatched":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/30";
      case "Closed":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
      default:
        return "bg-slate-800 text-slate-300 border-white/10";
    }
  };

  // Print action
  const triggerPrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // -------------------------------------------------------------
  // RENDER: LOADING STATE
  // -------------------------------------------------------------
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#030508] text-white flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-400 to-emerald-400 p-[2px] animate-spin">
          <div className="w-full h-full bg-[#030508] rounded-[10px]" />
        </div>
        <p className="text-xs font-mono tracking-wider text-slate-400 uppercase">
          Verifying Security Clearance...
        </p>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: UNAUTHENTICATED OR UNAUTHORIZED LOGIN SCREEN
  // -------------------------------------------------------------
  if (!currentUser || !isAuthorized) {
    return (
      <div className="min-h-screen bg-[#030508] text-white flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-emerald-500/5 to-transparent blur-[140px]" />
        </div>

        {/* Header Bar */}
        <header className="relative z-10 border-b border-white/5 py-4 px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-600 p-[1.5px]">
              <div className="w-full h-full bg-[#030508] rounded-[10px] flex items-center justify-center font-mono font-bold text-cyan-300 text-sm">
                K
              </div>
            </div>
            <div>
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase block">
                Kritika Micro Foundation
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                E-Commerce Control Plane
              </span>
            </div>
          </Link>

          <Link
            href="/products"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </header>

        {/* Center Auth Card */}
        <main className="relative z-10 flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-6">
              <Shield className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                <Lock className="w-3 h-3" /> Restricted Administration Portal
              </span>
              <h1 className="text-2xl font-bold font-heading text-white">
                Store Operations Sign-In
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Authorized access restricted strictly to registered company administrators.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAdminSignIn}
                className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-white text-slate-900 font-mono text-xs font-bold hover:bg-slate-100 transition shadow-lg shadow-white/10 group"
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
                <span>Sign in with Google Administrator</span>
              </button>

              <div className="pt-4 border-t border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block text-center">
                  Pre-Configured Admin Whitelist
                </span>
                <div className="flex flex-col gap-1 text-[11px] font-mono text-slate-400 bg-black/40 rounded-lg p-2.5 border border-white/5">
                  <div className="flex items-center justify-between">
                    <span>prandipb85@gmail.com</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">Primary</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>victorborah@gmail.com</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">Co-Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/5 py-4 px-6 text-center text-slate-500 font-mono text-[10px]">
          Kritika Micro Foundation • E-Commerce Control Plane • Protected System
        </footer>

        {/* ACCESS DENIED MODAL (IF SIGNED IN WITH UNLISTED EMAIL) */}
        {showUnauthorizedModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-[#080d14] border border-red-500/30 rounded-2xl p-6 shadow-2xl relative space-y-5">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <div className="text-center space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30">
                  Access Declined • 403 Forbidden
                </span>
                <h3 className="text-lg font-bold font-heading text-white">
                  Administrator Clearance Required
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The account <strong className="text-white font-mono">{currentUser?.email}</strong> is not listed among the authorized administrators.
                </p>
              </div>

              <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-3 text-[11px] font-mono text-slate-400 space-y-1">
                <p className="text-red-300 font-semibold">Authorized Admin Accounts:</p>
                <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                  <li>prandipb85@gmail.com</li>
                  <li>victorborah@gmail.com</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAdminSignOut}
                  className="w-full py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 transition flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out & Switch Account</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: AUTHORIZED ADMIN PORTAL
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#030508] text-white flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#0c121d] border border-cyan-500/30 text-cyan-300 px-4 py-2.5 rounded-xl shadow-2xl font-mono text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#030508]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-cyan-400 to-violet-600 p-[1.5px]">
              <div className="w-full h-full bg-[#030508] rounded-[10px] flex items-center justify-center font-mono font-bold text-cyan-300 text-sm">
                K
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Kritika Micro Foundation
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Control Plane
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                E-Commerce Administration
              </span>
            </div>
          </div>
        </div>

        {/* Admin Profile Pill & Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            <span>Live Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={loadAllData}
            title="Refresh All Datasets"
            className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
            {currentUser.photoURL ? (
              <Image
                src={currentUser.photoURL}
                alt={currentUser.displayName || "Admin"}
                width={28}
                height={28}
                className="rounded-full ring-1 ring-cyan-500/40"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">
                A
              </div>
            )}
            <div className="hidden md:block text-left">
              <span className="text-xs font-mono font-bold text-white block leading-tight">
                {currentUser.displayName || "Administrator"}
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                {currentUser.email}
              </span>
            </div>

            <button
              onClick={handleAdminSignOut}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* SUB-HEADER / TAB NAVIGATION */}
      <div className="bg-[#050911] border-b border-white/5 px-4 sm:px-8">
        <nav className="flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition whitespace-nowrap ${
              activeTab === "orders"
                ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders</span>
            {metrics.openOrders > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                {metrics.openOrders}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("customers")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition whitespace-nowrap ${
              activeTab === "customers"
                ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Customers</span>
            <span className="text-[10px] text-slate-500 font-normal">
              ({metrics.totalCustomers})
            </span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition whitespace-nowrap ${
              activeTab === "products"
                ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Product Grid & Availability</span>
            {metrics.unavailableProducts > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-red-500/20 text-red-300 border border-red-500/30">
                {metrics.unavailableProducts} off
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono transition whitespace-nowrap ${
              activeTab === "settings"
                ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings & Admins</span>
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* ========================================================
            TAB 1: OVERVIEW & DASHBOARD METRICS
           ======================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase tracking-wider">Gross Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {formatINR(metrics.totalRevenue)}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  From {metrics.totalOrders} total orders
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase tracking-wider">Open Orders</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-amber-400">
                  {metrics.openOrders}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  Awaiting dispatch & tracking
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase tracking-wider">Dispatched</span>
                  <Truck className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-cyan-400">
                  {metrics.dispatchedOrders}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  In transit with couriers
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-mono uppercase tracking-wider">Customers</span>
                  <Users className="w-4 h-4 text-violet-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {metrics.totalCustomers}
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  Registered Google accounts
                </div>
              </div>
            </div>

            {/* Quick Actions & Stock Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Product Stock Status Box */}
              <div className="md:col-span-1 bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                    Storefront Inventory
                  </h3>
                  <button
                    onClick={() => setActiveTab("products")}
                    className="text-xs font-mono text-cyan-400 hover:underline"
                  >
                    Manage
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Available Items</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-emerald-400">
                      {metrics.activeProducts} / {ACCESSORIES_CATALOG.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span>Marked Unavailable</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-red-400">
                      {metrics.unavailableProducts}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                  Items marked unavailable immediately update on the front-end catalog to show &quot;Currently Unavailable&quot; with checkout disabled.
                </p>
              </div>

              {/* Recent Orders Preview */}
              <div className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                    Recent Orders
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 font-mono text-xs">
                    No orders recorded yet. Complete a checkout in sandbox to see live orders here.
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {orders.slice(0, 5).map((ord) => (
                      <div
                        key={ord.id}
                        onClick={() => handleOpenOrderDetail(ord)}
                        className="py-3 flex items-center justify-between hover:bg-white/[0.02] px-2 rounded-lg cursor-pointer transition"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-white">
                              {ord.orderId}
                            </span>
                            <span
                              className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${getStatusBadge(
                                ord.orderStatus
                              )}`}
                            >
                              {ord.orderStatus}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-400">
                            {ord.customerName} • {formatINR(ord.totalAmount)}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-mono text-slate-500 block">
                            {formatDate(ord.createdAt)}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400 hover:underline">
                            Inspect &rarr;
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: ORDERS MANAGEMENT
           ======================================================== */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {/* Filter Bar & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
              {/* Status Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {(["All", "Open", "Dispatched", "Closed"] as OrderFilter[]).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setOrderFilter(filter)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
                      orderFilter === filter
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by Order ID, name, email, phone..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.01] text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4">Order Reference</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs font-mono">
                    {ordersLoading ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          Loading orders from Firestore...
                        </td>
                      </tr>
                    ) : filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          No orders matching &quot;{orderFilter}&quot; status found.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr
                          key={ord.id}
                          className="hover:bg-white/[0.02] transition group"
                        >
                          <td className="py-3.5 px-4 font-bold text-white">
                            <div>{ord.orderId}</div>
                            <span className="text-[10px] font-normal text-slate-500 block">
                              {formatDate(ord.createdAt)}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="text-white font-medium">{ord.customerName}</div>
                            <div className="text-[10px] text-slate-400">{ord.customerPhone}</div>
                            <div className="text-[10px] text-slate-500 truncate max-w-[160px]">{ord.customerEmail}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="text-slate-300">
                              {ord.items.length} item{ord.items.length > 1 ? "s" : ""}
                            </span>
                            <div className="text-[10px] text-slate-500 truncate max-w-[180px]">
                              {ord.items.map((i) => i.title).join(", ")}
                            </div>
                          </td>

                          <td className="py-3.5 px-4 font-bold text-emerald-400">
                            {formatINR(ord.totalAmount)}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                              {ord.paymentStatus}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(
                                ord.orderStatus
                              )}`}
                            >
                              {ord.orderStatus}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleOpenOrderDetail(ord)}
                              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono transition"
                            >
                              Manage
                            </button>
                            <button
                              onClick={() => setPackingSlipOrder(ord)}
                              title="Print Invoice / Packing Slip"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition inline-flex items-center"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: CUSTOMERS MANAGEMENT
           ======================================================== */}
        {activeTab === "customers" && (
          <div className="space-y-6">
            {/* Search Customers */}
            <div className="flex items-center justify-between gap-4 bg-white/[0.02] border border-white/10 p-4 rounded-2xl">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search customers by name, email, phone, city..."
                  value={customerSearchQuery}
                  onChange={(e) => setCustomerSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <span className="text-xs font-mono text-slate-400">
                Total Customers: <strong className="text-white">{filteredCustomers.length}</strong>
              </span>
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customersLoading ? (
                <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
                  Loading customers from Firestore...
                </div>
              ) : filteredCustomers.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
                  No registered customers found.
                </div>
              ) : (
                filteredCustomers.map((cust) => {
                  const defaultAddr =
                    cust.addresses.find((a) => a.id === cust.defaultAddressId) ||
                    cust.addresses[0];

                  return (
                    <div
                      key={cust.uid}
                      className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-4 hover:border-cyan-500/30 transition flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {cust.photoURL ? (
                              <Image
                                src={cust.photoURL}
                                alt={cust.displayName || "Customer"}
                                width={40}
                                height={40}
                                className="rounded-full ring-1 ring-cyan-500/30"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center text-sm">
                                {cust.displayName?.charAt(0) || "C"}
                              </div>
                            )}
                            <div>
                              <h4 className="text-xs font-bold font-mono text-white">
                                {cust.displayName || "Unnamed Customer"}
                              </h4>
                              <p className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">
                                {cust.email}
                              </p>
                            </div>
                          </div>

                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                            Customer
                          </span>
                        </div>

                        {/* Address Preview */}
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-[11px] font-mono text-slate-300">
                          <div className="flex items-center justify-between text-[10px] text-slate-500">
                            <span>Primary Shipping Address:</span>
                            {defaultAddr && (
                              <span className="text-cyan-400">{cust.addresses.length} saved</span>
                            )}
                          </div>
                          {defaultAddr ? (
                            <div>
                              <p className="font-semibold text-white">{defaultAddr.fullName}</p>
                              <p className="text-slate-400 text-[10px] line-clamp-1">
                                {defaultAddr.addressLine1}, {defaultAddr.city}, {defaultAddr.state} - {defaultAddr.pincode}
                              </p>
                              <p className="text-slate-400 text-[10px]">📞 {defaultAddr.phone}</p>
                            </div>
                          ) : (
                            <p className="text-slate-500 italic">No saved address yet</p>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleSelectCustomer(cust)}
                          className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-mono font-semibold transition"
                        >
                          View Orders
                        </button>

                        {defaultAddr && (
                          <button
                            onClick={() =>
                              setShippingLabelData({
                                customer: cust,
                                address: defaultAddr
                              })
                            }
                            title="Print Shipping Address Label"
                            className="px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold transition flex items-center gap-1.5"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Print Label</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: PRODUCT MANAGEMENT & AVAILABILITY GRID
           ======================================================== */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Header / Save Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.02] border border-white/10 p-5 rounded-2xl">
              <div>
                <h3 className="text-base font-bold font-mono text-white flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-cyan-400" />
                  <span>Storefront Product Grid & Availability Regulation</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Check or uncheck &quot;Item Available&quot; to regulate product availability on the front-end catalog in real time.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveProductAvailability}
                  disabled={savingProducts}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {savingProducts ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Availability Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Success Banner */}
            {saveSuccessToast && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Product availability settings published and synchronized with Google Firestore!</span>
              </div>
            )}

            {/* Products Grid (All 8 Products) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {ACCESSORIES_CATALOG.map((prod) => {
                const isAvailable = availabilityMap[prod.id] !== false;

                return (
                  <div
                    key={prod.id}
                    className={`rounded-2xl border transition flex flex-col justify-between overflow-hidden ${
                      isAvailable
                        ? "bg-white/[0.02] border-white/10"
                        : "bg-red-950/[0.06] border-red-500/30"
                    }`}
                  >
                    <div>
                      {/* Product Thumbnail */}
                      <div className="relative aspect-square w-full bg-black/40 p-4 border-b border-white/5 flex items-center justify-center">
                        <Image
                          src={prod.image}
                          alt={prod.title}
                          width={240}
                          height={240}
                          className={`object-contain transition ${!isAvailable ? "opacity-40 grayscale" : ""}`}
                        />

                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          {isAvailable ? (
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                              ✓ Live & In Stock
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-red-500/20 text-red-300 border border-red-500/30 font-bold">
                              ⚠ Currently Unavailable
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                          {prod.category}
                        </span>
                        <h4 className="text-xs font-bold font-mono text-white line-clamp-1">
                          {prod.title}
                        </h4>
                        <div className="text-sm font-bold font-mono text-emerald-400">
                          {formatINR(prod.price)}
                        </div>
                        <p className="text-[10px] font-mono text-slate-400 line-clamp-2">
                          {prod.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Regulation Checkbox */}
                    <div className="p-4 pt-3 border-t border-white/10 bg-white/[0.01]">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isAvailable}
                          onChange={() => handleToggleProductAvailability(prod.id)}
                          className="w-4 h-4 rounded border-white/20 text-cyan-500 focus:ring-0 focus:ring-offset-0 bg-black/40 cursor-pointer accent-cyan-400"
                        />
                        <span className={`text-xs font-mono font-semibold ${isAvailable ? "text-white" : "text-red-400"}`}>
                          {isAvailable ? "Item Available" : "Marked Unavailable"}
                        </span>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: SETTINGS & ADMIN ROLES
           ======================================================== */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-4xl">
            {/* Whitelisted Admins Section */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                    <span>Authorized Administrator Accounts</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Pre-configured Google accounts granted full clearance into the E-Commerce Admin Control Plane.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-white/5 border border-white/5 rounded-xl bg-black/30 overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">prandipb85@gmail.com</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                        Primary Administrator
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      Full access to Orders, Customers, Shipping labels, Product Availability, and Firestore Settings.
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Active</span>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">victorborah@gmail.com</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        Co-Administrator
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      Full access to Orders, Customers, Shipping labels, Product Availability, and Firestore Settings.
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Active</span>
                </div>
              </div>
            </div>

            {/* Cloud & Database Status */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Security Rules & Service Connectivity</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[10px] block">Database Engine</span>
                  <p className="text-white font-semibold">Google Cloud Firestore</p>
                  <p className="text-[10px] text-slate-400">Project: kritika-foundation</p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-slate-500 text-[10px] block">Payment Gateway</span>
                  <p className="text-white font-semibold">Cashfree Payments</p>
                  <p className="text-[10px] text-amber-300">Environment: Sandbox (Pilot Testing)</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          MODAL: MANAGE ORDER / REGULATE STATUS & DISPATCH
         ======================================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#090e17] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  Order Management
                </span>
                <h3 className="text-lg font-bold font-mono text-white mt-0.5">
                  {selectedOrder.orderId}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer & Shipping Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <span className="text-slate-500 text-[10px] block uppercase tracking-wider">
                  Customer Details
                </span>
                <p className="font-bold text-white">{selectedOrder.customerName}</p>
                <p className="text-slate-400">{selectedOrder.customerPhone}</p>
                <p className="text-slate-400 truncate">{selectedOrder.customerEmail}</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[10px] block uppercase tracking-wider">
                    Shipping Destination
                  </span>
                  <button
                    onClick={() =>
                      setShippingLabelData({
                        customer: null,
                        address: selectedOrder.shippingAddress,
                        orderId: selectedOrder.orderId
                      })
                    }
                    className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Printer className="w-3 h-3" />
                    <span>Print Label</span>
                  </button>
                </div>
                <p className="font-bold text-white">{selectedOrder.shippingAddress?.fullName}</p>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {selectedOrder.shippingAddress?.addressLine1},{" "}
                  {selectedOrder.shippingAddress?.city},{" "}
                  {selectedOrder.shippingAddress?.state} -{" "}
                  {selectedOrder.shippingAddress?.pincode}
                </p>
              </div>
            </div>

            {/* Itemized Order List */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                Purchased Accessories ({selectedOrder.items.length})
              </span>
              <div className="divide-y divide-white/5 border border-white/5 rounded-xl bg-black/40 overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image || "/images/products/skyy-rider-bldc-motor-1200w.jpg"}
                        alt={item.title}
                        width={36}
                        height={36}
                        className="rounded-lg object-contain bg-white/5 p-1"
                      />
                      <div>
                        <p className="text-white font-medium">{item.title}</p>
                        <p className="text-[10px] text-slate-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-emerald-400">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="p-3 flex items-center justify-between text-xs font-mono font-bold bg-white/[0.02]">
                  <span>Total Order Amount</span>
                  <span className="text-sm text-emerald-400">{formatINR(selectedOrder.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Regulation & Status Form */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
              <span className="text-xs font-mono font-bold text-white block">
                Regulate Order Status & Dispatch Details
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderUpdateForm({ ...orderUpdateForm, status: "Open" })}
                  className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition ${
                    orderUpdateForm.status === "Open"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "bg-black/30 text-slate-400 border-white/10 hover:border-white/20"
                  }`}
                >
                  Open
                </button>
                <button
                  type="button"
                  onClick={() => setOrderUpdateForm({ ...orderUpdateForm, status: "Dispatched" })}
                  className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition ${
                    orderUpdateForm.status === "Dispatched"
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                      : "bg-black/30 text-slate-400 border-white/10 hover:border-white/20"
                  }`}
                >
                  Dispatched
                </button>
                <button
                  type="button"
                  onClick={() => setOrderUpdateForm({ ...orderUpdateForm, status: "Closed" })}
                  className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition ${
                    orderUpdateForm.status === "Closed"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : "bg-black/30 text-slate-400 border-white/10 hover:border-white/20"
                  }`}
                >
                  Closed
                </button>
              </div>

              {/* Courier & Tracking Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">
                    Courier Partner
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bluedart, Delhivery, DTDC"
                    value={orderUpdateForm.courierPartner}
                    onChange={(e) =>
                      setOrderUpdateForm({ ...orderUpdateForm, courierPartner: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">
                    Tracking Number / Docket ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DL123456789IN"
                    value={orderUpdateForm.trackingNumber}
                    onChange={(e) =>
                      setOrderUpdateForm({ ...orderUpdateForm, trackingNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Admin Internal Notes */}
              <div className="text-xs font-mono">
                <label className="text-[10px] text-slate-400 block mb-1">
                  Internal Operational Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes about packaging, courier pickup, or special handling..."
                  value={orderUpdateForm.adminNotes}
                  onChange={(e) =>
                    setOrderUpdateForm({ ...orderUpdateForm, adminNotes: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setPackingSlipOrder(selectedOrder)}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Packing Slip</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveOrderStatus}
                  disabled={statusUpdateInProgress}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  {statusUpdateInProgress ? "Saving..." : "Save Order Status"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: VIEW CUSTOMER CONNECTED ORDERS
         ======================================================== */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#090e17] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                {selectedCustomer.photoURL ? (
                  <Image
                    src={selectedCustomer.photoURL}
                    alt={selectedCustomer.displayName || "Customer"}
                    width={42}
                    height={42}
                    className="rounded-full ring-1 ring-cyan-500/30"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center">
                    C
                  </div>
                )}
                <div>
                  <h3 className="text-base font-bold font-mono text-white">
                    {selectedCustomer.displayName || "Customer Record"}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    {selectedCustomer.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Saved Shipping Addresses */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                Saved Shipping Addresses ({selectedCustomer.addresses.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCustomer.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs font-mono space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {addr.addressLine1}
                        {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
                        {addr.landmark ? `, ${addr.landmark}` : ""}
                        <br />
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p className="text-[10px] text-slate-500">📞 {addr.phone}</p>
                    </div>

                    <button
                      onClick={() =>
                        setShippingLabelData({
                          customer: selectedCustomer,
                          address: addr
                        })
                      }
                      className="w-full py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono font-semibold transition flex items-center justify-center gap-1.5"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Print Shipping Address Label</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Orders */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                Order History & Status
              </span>

              {customerOrdersLoading ? (
                <p className="text-xs font-mono text-slate-500 py-4 text-center">
                  Loading customer orders...
                </p>
              ) : selectedCustomerOrders.length === 0 ? (
                <p className="text-xs font-mono text-slate-500 py-4 text-center">
                  No orders placed yet by this account.
                </p>
              ) : (
                <div className="divide-y divide-white/5 border border-white/5 rounded-xl bg-black/40 overflow-hidden">
                  {selectedCustomerOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-3.5 flex items-center justify-between text-xs font-mono"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{ord.orderId}</span>
                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${getStatusBadge(
                              ord.orderStatus
                            )}`}
                          >
                            {ord.orderStatus}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {formatDate(ord.createdAt)} • {ord.items.length} items
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-emerald-400 block">
                          {formatINR(ord.totalAmount)}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedCustomer(null);
                            handleOpenOrderDetail(ord);
                          }}
                          className="text-[10px] text-cyan-400 hover:underline"
                        >
                          Manage Order &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: PRINTABLE SHIPPING ADDRESS LABEL (4"x6" standard)
         ======================================================== */}
      {shippingLabelData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#090e17] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-cyan-400" />
                <span>Shipping Address Label Preview</span>
              </span>
              <button
                onClick={() => setShippingLabelData(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Slip Container */}
            <div
              id="printable-shipping-label"
              className="bg-white text-slate-900 p-6 rounded-xl border border-slate-300 font-sans shadow-inner space-y-5"
            >
              {/* Sender Info */}
              <div className="border-b-2 border-slate-900 pb-3 flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    FROM / SENDER:
                  </span>
                  <h4 className="text-sm font-bold tracking-tight text-slate-900">
                    KRITIKA MICRO FOUNDATION
                  </h4>
                  <p className="text-[11px] text-slate-700 leading-snug">
                    Rittika Enterprise, Pegu Bazaar, Dhemaji Town<br />
                    Dhemaji – 787057, Assam, India<br />
                    Helpline: +91-99543-67393
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-slate-900 font-bold uppercase">
                    E-COMMERCE
                  </span>
                  {shippingLabelData.orderId && (
                    <span className="text-[10px] font-mono block text-slate-700 mt-1 font-semibold">
                      Ref: {shippingLabelData.orderId}
                    </span>
                  )}
                </div>
              </div>

              {/* Consignee / Delivery Address */}
              <div className="py-2 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  DELIVER TO / SHIP TO:
                </span>
                <div className="text-slate-900 space-y-1">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    {shippingLabelData.address?.fullName || shippingLabelData.customer?.displayName}
                  </h3>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {shippingLabelData.address?.addressLine1}
                    {shippingLabelData.address?.addressLine2
                      ? `, ${shippingLabelData.address.addressLine2}`
                      : ""}
                    {shippingLabelData.address?.landmark
                      ? ` (Near ${shippingLabelData.address.landmark})`
                      : ""}
                  </p>
                  <p className="text-sm font-bold text-slate-900 tracking-wider">
                    {shippingLabelData.address?.city}, {shippingLabelData.address?.state} —{" "}
                    <span className="underline">{shippingLabelData.address?.pincode}</span>
                  </p>
                  <p className="text-xs font-mono font-bold text-slate-900 pt-1">
                    Contact Phone: {shippingLabelData.address?.phone || shippingLabelData.customer?.phone}
                  </p>
                </div>
              </div>

              {/* Barcode Mock & Routing Code */}
              <div className="border-t-2 border-slate-900 pt-3 flex items-center justify-between text-xs font-mono">
                <div className="space-y-0.5">
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">
                    DESTINATION PIN
                  </span>
                  <span className="text-lg font-bold tracking-widest text-slate-900">
                    {shippingLabelData.address?.pincode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">
                    COURIER ROUTING
                  </span>
                  <span className="text-xs font-bold text-slate-800">EXP-ASSAM-SURFACE</span>
                </div>
              </div>
            </div>

            {/* Print Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShippingLabelData(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition"
              >
                Close Preview
              </button>

              <button
                type="button"
                onClick={triggerPrint}
                className="flex-1 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Shipping Label</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: PRINTABLE PACKING SLIP / INVOICE
         ======================================================== */}
      {packingSlipOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-[#090e17] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Order Packing Slip / Dispatch Manifest</span>
              </span>
              <button
                onClick={() => setPackingSlipOrder(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Packing Slip Body */}
            <div className="bg-white text-slate-900 p-6 rounded-xl border border-slate-300 font-sans shadow-inner space-y-4">
              <div className="flex justify-between items-start border-b border-slate-300 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    KRITIKA MICRO FOUNDATION
                  </h3>
                  <p className="text-[11px] text-slate-600">
                    CIN: U65990AS2023NPL025547 • Dhemaji, Assam
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold block text-slate-900">
                    {packingSlipOrder.orderId}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {formatDate(packingSlipOrder.createdAt)}
                  </span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[9px] font-mono text-slate-500 font-bold uppercase block">
                    CUSTOMER
                  </span>
                  <p className="font-bold text-slate-900">{packingSlipOrder.customerName}</p>
                  <p className="text-slate-700">{packingSlipOrder.customerPhone}</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-slate-500 font-bold uppercase block">
                    SHIP TO
                  </span>
                  <p className="text-slate-800 font-medium">
                    {packingSlipOrder.shippingAddress?.addressLine1},<br />
                    {packingSlipOrder.shippingAddress?.city}, {packingSlipOrder.shippingAddress?.state} - {packingSlipOrder.shippingAddress?.pincode}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-xs text-left border-collapse mt-2">
                <thead>
                  <tr className="border-b border-slate-300 text-[10px] font-mono text-slate-500 uppercase">
                    <th className="py-2">Item Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Price</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {packingSlipOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="py-2 font-medium text-slate-900">{it.title}</td>
                      <td className="py-2 text-center font-mono">{it.quantity}</td>
                      <td className="py-2 text-right font-mono">{formatINR(it.price)}</td>
                      <td className="py-2 text-right font-mono font-bold">
                        {formatINR(it.price * it.quantity)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-900 font-bold">
                    <td colSpan={3} className="py-2.5 text-right font-mono">
                      GRAND TOTAL:
                    </td>
                    <td className="py-2.5 text-right font-mono text-sm text-slate-900">
                      {formatINR(packingSlipOrder.totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-500 flex justify-between items-center">
                <span>Payment Mode: Cashfree PG (Verified)</span>
                <span>Authorized Signatory • Kritika Micro Foundation</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPackingSlipOrder(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition"
              >
                Close
              </button>

              <button
                type="button"
                onClick={triggerPrint}
                className="flex-1 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Packing Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
