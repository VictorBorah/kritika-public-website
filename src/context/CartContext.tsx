"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "firebase/auth";
import {
  auth,
  onAuthStateChanged,
  getCustomerProfile,
  CustomerProfile,
  ShippingAddress,
  signInWithGoogle,
  logOutUser,
  addCustomerAddress
} from "@/lib/firebase";
import { ProductItem } from "@/data/accessoriesCatalog";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  
  // Auth & Profile state
  currentUser: User | null;
  customerProfile: CustomerProfile | null;
  authLoading: boolean;
  loginWithGoogle: () => Promise<User>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  saveAddress: (address: Omit<ShippingAddress, "id">) => Promise<ShippingAddress>;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "kmf_cart_v1";

// Cookie helper
function setCookie(name: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
  return match ? decodeURIComponent(match[3]) : null;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Load cart from localStorage / Cookies on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY) || getCookie(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to parse stored cart:", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // 2. Persist cart to localStorage and Cookies when updated
  useEffect(() => {
    if (!isInitialized) return;
    try {
      const serialized = JSON.stringify(items);
      localStorage.setItem(CART_STORAGE_KEY, serialized);
      setCookie(CART_STORAGE_KEY, serialized);
    } catch (e) {
      console.warn("Failed to persist cart:", e);
    }
  }, [items, isInitialized]);

  // 3. Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const profile = await getCustomerProfile(user.uid);
          setCustomerProfile(profile);
        } catch (e) {
          console.warn("Failed to load customer profile:", e);
        }
      } else {
        setCustomerProfile(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (!currentUser) return;
    const profile = await getCustomerProfile(currentUser.uid);
    setCustomerProfile(profile);
  };

  const loginWithGoogle = async () => {
    const user = await signInWithGoogle();
    const profile = await getCustomerProfile(user.uid);
    setCustomerProfile(profile);
    showToast(`Signed in as ${user.displayName || user.email}`);
    return user;
  };

  const logout = async () => {
    await logOutUser();
    setCurrentUser(null);
    setCustomerProfile(null);
    showToast("Signed out successfully");
  };

  const saveAddress = async (address: Omit<ShippingAddress, "id">) => {
    if (!currentUser) throw new Error("User must be logged in to save an address");
    const saved = await addCustomerAddress(currentUser.uid, address);
    await refreshProfile();
    showToast("Shipping address saved successfully");
    return saved;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const addToCart = (product: ProductItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          badge: product.badge,
          quantity: Math.max(1, quantity)
        }
      ];
    });

    showToast(`Added ${quantity}x "${product.title}" to Cart`);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
    showToast("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // Free delivery across India for accessories
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        total,
        currentUser,
        customerProfile,
        authLoading,
        loginWithGoogle,
        logout,
        refreshProfile,
        saveAddress,
        toastMessage,
        showToast,
        hideToast
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#070C18]/95 border border-cyan-400/40 text-white shadow-2xl backdrop-blur-xl">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-medium">{toastMessage}</span>
            <button
              onClick={hideToast}
              className="text-slate-400 hover:text-white text-xs ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

