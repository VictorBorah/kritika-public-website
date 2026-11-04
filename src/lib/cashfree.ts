/**
 * Cashfree Payment Gateway Integration Service
 * Cashfree.js v3 SDK Loader & Order Management
 */

declare global {
  interface Window {
    Cashfree?: (config: { mode: "sandbox" | "production" }) => {
      checkout: (options: {
        paymentSessionId: string;
        redirectTarget?: "_modal" | "_self" | "_top" | "_blank";
      }) => Promise<{
        error?: { message?: string; code?: string };
        redirect?: boolean;
        paymentDetails?: unknown;
      }>;
    };
  }
}

// Cashfree Configuration loaded from environment variables
export const CASHFREE_CONFIG = {
  mode: ((process.env.NEXT_PUBLIC_CASHFREE_ENV as "sandbox" | "production") || "sandbox"),
  appId: process.env.NEXT_PUBLIC_CASHFREE_APP_ID || "TEST11289989ec6887d30d9e187e901d98998211",
  secretKey: process.env.NEXT_PUBLIC_CASHFREE_SECRET_KEY || "",
  apiVersion: "2026-01-01",
  apiUrl: (process.env.NEXT_PUBLIC_CASHFREE_ENV === "production") 
    ? "https://api.cashfree.com/pg" 
    : "https://sandbox.cashfree.com/pg"
};

let cashfreeInstance: ReturnType<NonNullable<typeof window.Cashfree>> | null = null;
let sdkLoadingPromise: Promise<void> | null = null;

/**
 * Dynamically load Cashfree.js v3 script into DOM and initialize singleton instance
 */
export function loadCashfreeSDK(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.Cashfree && cashfreeInstance) {
    return Promise.resolve();
  }

  if (sdkLoadingPromise) {
    return sdkLoadingPromise;
  }

  sdkLoadingPromise = new Promise((resolve, reject) => {
    // Check if script tag is already attached
    const existingScript = document.querySelector('script[src*="cashfree.js"]');
    if (existingScript && window.Cashfree) {
      cashfreeInstance = window.Cashfree({ mode: CASHFREE_CONFIG.mode });
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => {
      if (window.Cashfree) {
        cashfreeInstance = window.Cashfree({ mode: CASHFREE_CONFIG.mode });
        resolve();
      } else {
        reject(new Error("Cashfree SDK failed to initialize after script load"));
      }
    };
    script.onerror = () => {
      reject(new Error("Failed to load Cashfree SDK script from CDN"));
    };
    document.body.appendChild(script);
  });

  return sdkLoadingPromise;
}

export interface CreateOrderParams {
  orderAmount: number;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderNote?: string;
}

export interface CashfreeOrderResponse {
  order_id: string;
  cf_order_id: string;
  payment_session_id: string;
  order_status: string;
  order_amount: number;
  order_currency: string;
}

/**
 * Create a new payment order session via the server-side API endpoint
 */
export async function createCashfreeOrder(
  params: CreateOrderParams
): Promise<CashfreeOrderResponse> {
  // Determine server-side order endpoint (relative on staging/production, hosted fallback for local dev)
  const endpoint =
    process.env.NEXT_PUBLIC_CREATE_ORDER_ENDPOINT ||
    (typeof window !== "undefined" && window.location.hostname === "localhost"
      ? "https://website.kmflabz.space/api/create-order.php"
      : "/api/create-order.php");

  const payload = {
    orderAmount: Number(params.orderAmount.toFixed(2)),
    customerId: params.customerId,
    customerName: params.customerName || "Kritika Customer",
    customerEmail: params.customerEmail || "sales@kritikafoundation.com",
    customerPhone: params.customerPhone,
    returnUrl: typeof window !== "undefined" ? `${window.location.origin}/cart?order_id={order_id}` : undefined,
    orderNote: params.orderNote || "Kritika Micro Foundation E-Commerce Checkout"
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Order creation failed" }));
    throw new Error(errorData.message || `Cashfree order creation failed with status ${response.status}`);
  }

  const data = (await response.json()) as CashfreeOrderResponse;
  return data;
}

/**
 * Launch Cashfree Drop-in Checkout modal
 */
export async function launchCashfreeCheckout(paymentSessionId: string) {
  await loadCashfreeSDK();

  if (!cashfreeInstance && window.Cashfree) {
    cashfreeInstance = window.Cashfree({ mode: CASHFREE_CONFIG.mode });
  }

  if (!cashfreeInstance) {
    throw new Error("Cashfree SDK instance unavailable");
  }

  return await cashfreeInstance.checkout({
    paymentSessionId,
    redirectTarget: "_modal"
  });
}

