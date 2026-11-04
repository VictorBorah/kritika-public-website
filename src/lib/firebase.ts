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
  createdAt?: unknown;
  lastLoginAt?: unknown;
}

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
  items: unknown[];
  totalAmount: number;
  paymentStatus: string;
}) {
  const ordersRef = collection(db, "orders");
  const docRef = await addDoc(ordersRef, {
    ...orderData,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export { app, auth, db, onAuthStateChanged };

