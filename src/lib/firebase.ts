import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

// Kritika Micro Foundation Firebase Configuration loaded from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "kritika-foundation.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "kritika-foundation",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "kritika-foundation.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ""
};

// Initialize Firebase (client-side singleton)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// ==========================================
// 1. DATA MODELS & TYPES
// ==========================================

export const AUTHORIZED_ADMIN_EMAILS = [
  "prandipb85@gmail.com",
  "victorborah@gmail.com"
];

export function isAuthorizedAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return AUTHORIZED_ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

export interface ShippingAddress {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  isDefault?: boolean;
}

export interface CustomerProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phone?: string | null;
  addresses: ShippingAddress[];
  defaultAddressId?: string | null;
  createdAt?: any;
  lastLoginAt?: any;
}

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderRecord {
  id: string; // Firestore document ID
  orderId: string; // Human-friendly order reference
  cfOrderId?: string;
  paymentSessionId?: string;
  userId: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: string;
  orderStatus: "Open" | "Dispatched" | "Closed";
  trackingNumber?: string;
  courierPartner?: string;
  adminNotes?: string;
  createdAt?: any;
  dispatchedAt?: any;
  closedAt?: any;
  updatedAt?: any;
}

export interface AdminAccount {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: "superadmin" | "admin";
  authorized: boolean;
  lastLoginAt?: any;
  createdAt?: any;
}

// ==========================================
// 2. AUTHENTICATION & CUSTOMER METHODS
// ==========================================

/**
 * Sign in with Google Popup and ensure Customer record exists in Firestore
 */
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  // Sync / create customer profile in Firestore
  await syncCustomerInFirestore(user);
  return user;
}

/**
 * Sign in with Google specifically for Admin portal with strict authorization check
 */
export async function signInAdminWithGoogle(): Promise<{ user: User; isAuthorized: boolean }> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  const isAuthorized = isAuthorizedAdminEmail(user.email);

  if (isAuthorized) {
    await syncAdminAccount(user);
  }

  return { user, isAuthorized };
}

/**
 * Sign out current user
 */
export async function logOutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Create or update customer record in Firestore
 */
export async function syncCustomerInFirestore(user: User): Promise<CustomerProfile> {
  const userRef = doc(db, "customers", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    const newProfile: CustomerProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phone: user.phoneNumber,
      addresses: [],
      defaultAddressId: null,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp()
    };
    await setDoc(userRef, newProfile);
    return newProfile;
  } else {
    await updateDoc(userRef, {
      lastLoginAt: serverTimestamp(),
      displayName: user.displayName,
      photoURL: user.photoURL
    });
    return snap.data() as CustomerProfile;
  }
}

/**
 * Sync Admin record in Firestore admins collection
 */
export async function syncAdminAccount(user: User): Promise<void> {
  if (!isAuthorizedAdminEmail(user.email)) return;
  const adminRef = doc(db, "admins", user.uid);
  const snap = await getDoc(adminRef);

  if (!snap.exists()) {
    await setDoc(adminRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: "superadmin",
      authorized: true,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp()
    });
  } else {
    await updateDoc(adminRef, {
      lastLoginAt: serverTimestamp(),
      displayName: user.displayName,
      photoURL: user.photoURL
    });
  }
}

/**
 * Fetch customer profile including saved addresses
 */
export async function getCustomerProfile(uid: string): Promise<CustomerProfile | null> {
  const userRef = doc(db, "customers", uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return snap.data() as CustomerProfile;
  }
  return null;
}

/**
 * Save a new shipping address to the customer's profile in Firestore
 */
export async function addCustomerAddress(
  uid: string,
  address: Omit<ShippingAddress, "id">
): Promise<ShippingAddress> {
  const userRef = doc(db, "customers", uid);
  const snap = await getDoc(userRef);
  const newAddress: ShippingAddress = {
    ...address,
    id: `addr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  };

  if (snap.exists()) {
    const data = snap.data() as CustomerProfile;
    const addresses = Array.isArray(data.addresses) ? [...data.addresses] : [];

    // If it's the first address or marked default, set default
    if (addresses.length === 0 || address.isDefault) {
      addresses.forEach((a) => (a.isDefault = false));
      newAddress.isDefault = true;
    }

    addresses.push(newAddress);
    await updateDoc(userRef, {
      addresses,
      defaultAddressId: newAddress.isDefault ? newAddress.id : data.defaultAddressId || newAddress.id
    });
  } else {
    newAddress.isDefault = true;
    await setDoc(userRef, {
      uid,
      addresses: [newAddress],
      defaultAddressId: newAddress.id,
      createdAt: serverTimestamp()
    });
  }

  return newAddress;
}

/**
 * Record confirmed e-commerce order in Firestore
 */
export async function recordOrderInFirestore(orderData: {
  orderId: string;
  cfOrderId?: string;
  paymentSessionId?: string;
  userId: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: string;
  orderStatus?: "Open" | "Dispatched" | "Closed";
}) {
  const ordersRef = collection(db, "orders");
  const docRef = await addDoc(ordersRef, {
    ...orderData,
    orderStatus: orderData.orderStatus || "Open",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
}

// ==========================================
// 3. ADMIN: ORDERS MANAGEMENT
// ==========================================

/**
 * Fetch all orders from Firestore (admin only)
 */
export async function getAllOrders(): Promise<OrderRecord[]> {
  const ordersRef = collection(db, "orders");
  const snap = await getDocs(ordersRef);
  const orders: OrderRecord[] = [];

  snap.forEach((docSnap) => {
    const data = docSnap.data();
    orders.push({
      id: docSnap.id,
      orderId: data.orderId || docSnap.id,
      cfOrderId: data.cfOrderId,
      paymentSessionId: data.paymentSessionId,
      userId: data.userId || "",
      customerEmail: data.customerEmail || "",
      customerName: data.customerName || "Customer",
      customerPhone: data.customerPhone || "",
      shippingAddress: data.shippingAddress || ({} as ShippingAddress),
      items: Array.isArray(data.items) ? data.items : [],
      totalAmount: typeof data.totalAmount === "number" ? data.totalAmount : 0,
      paymentStatus: data.paymentStatus || "UNKNOWN",
      orderStatus: (data.orderStatus as "Open" | "Dispatched" | "Closed") || "Open",
      trackingNumber: data.trackingNumber || "",
      courierPartner: data.courierPartner || "",
      adminNotes: data.adminNotes || "",
      createdAt: data.createdAt,
      dispatchedAt: data.dispatchedAt,
      closedAt: data.closedAt,
      updatedAt: data.updatedAt
    });
  });

  // Sort descending by creation time
  orders.sort((a, b) => {
    const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
    const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
    return timeB - timeA;
  });

  return orders;
}

/**
 * Update order status (Open, Dispatched, Closed) and tracking info
 */
export async function updateOrderStatus(
  orderDocId: string,
  orderStatus: "Open" | "Dispatched" | "Closed",
  details?: {
    trackingNumber?: string;
    courierPartner?: string;
    adminNotes?: string;
  }
): Promise<void> {
  const orderRef = doc(db, "orders", orderDocId);
  const updatePayload: Record<string, any> = {
    orderStatus,
    updatedAt: serverTimestamp()
  };

  if (details?.trackingNumber !== undefined) updatePayload.trackingNumber = details.trackingNumber;
  if (details?.courierPartner !== undefined) updatePayload.courierPartner = details.courierPartner;
  if (details?.adminNotes !== undefined) updatePayload.adminNotes = details.adminNotes;

  if (orderStatus === "Dispatched") {
    updatePayload.dispatchedAt = serverTimestamp();
  } else if (orderStatus === "Closed") {
    updatePayload.closedAt = serverTimestamp();
  }

  await updateDoc(orderRef, updatePayload);
}

// ==========================================
// 4. ADMIN: CUSTOMERS MANAGEMENT
// ==========================================

/**
 * Fetch all registered customers
 */
export async function getAllCustomers(): Promise<CustomerProfile[]> {
  const custRef = collection(db, "customers");
  const snap = await getDocs(custRef);
  const customers: CustomerProfile[] = [];

  snap.forEach((docSnap) => {
    customers.push(docSnap.data() as CustomerProfile);
  });

  // Sort by created / last login
  customers.sort((a, b) => {
    const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return timeB - timeA;
  });

  return customers;
}

/**
 * Get orders placed by a specific customer
 */
export async function getCustomerOrders(userId: string): Promise<OrderRecord[]> {
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("userId", "==", userId));
  const snap = await getDocs(q);
  const orders: OrderRecord[] = [];

  snap.forEach((docSnap) => {
    const data = docSnap.data();
    orders.push({
      id: docSnap.id,
      orderId: data.orderId || docSnap.id,
      cfOrderId: data.cfOrderId,
      paymentSessionId: data.paymentSessionId,
      userId: data.userId || "",
      customerEmail: data.customerEmail || "",
      customerName: data.customerName || "Customer",
      customerPhone: data.customerPhone || "",
      shippingAddress: data.shippingAddress || ({} as ShippingAddress),
      items: Array.isArray(data.items) ? data.items : [],
      totalAmount: data.totalAmount || 0,
      paymentStatus: data.paymentStatus || "UNKNOWN",
      orderStatus: (data.orderStatus as "Open" | "Dispatched" | "Closed") || "Open",
      trackingNumber: data.trackingNumber || "",
      courierPartner: data.courierPartner || "",
      adminNotes: data.adminNotes || "",
      createdAt: data.createdAt,
      dispatchedAt: data.dispatchedAt,
      closedAt: data.closedAt
    });
  });

  return orders;
}

// ==========================================
// 5. SETTINGS: PRODUCT AVAILABILITY REGULATION
// ==========================================

/**
 * Fetch product availability settings map from Firestore settings/products
 * Returns a map of productId -> boolean (true = in stock / available, false = currently unavailable)
 */
export async function getProductAvailabilitySettings(): Promise<Record<string, boolean>> {
  try {
    const settingsRef = doc(db, "settings", "products");
    const snap = await getDoc(settingsRef);
    if (snap.exists()) {
      const data = snap.data();
      return (data.availability as Record<string, boolean>) || {};
    }
  } catch (err) {
    console.warn("Could not load product availability settings from Firestore:", err);
  }
  return {};
}

/**
 * Save product availability configuration to Firestore settings/products
 */
export async function saveProductAvailabilitySettings(
  availabilityMap: Record<string, boolean>,
  updatedByEmail: string
): Promise<void> {
  const settingsRef = doc(db, "settings", "products");
  await setDoc(settingsRef, {
    availability: availabilityMap,
    updatedBy: updatedByEmail,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

export { app, auth, db, onAuthStateChanged };
