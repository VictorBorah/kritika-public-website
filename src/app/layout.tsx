import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030508",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kritikafoundation.com"),
  title: "Kritika Micro Foundation | Commercial E-Rickshaw Showroom, Assam",
  description:
    "Explore E-Rickshaws, premium accessories, and convenient vehicle financing assistance at Kritika Micro Foundation showroom in Assam.",
  keywords: [
    "E-Rickshaw showroom Assam",
    "Kritika Micro Foundation",
    "electric rickshaw Assam",
    "E-Rickshaw accessories",
    "commercial electric vehicle Assam",
    "Rittika Enterprise",
    "E-Rickshaw dealership",
    "vehicle finance assistance",
  ],
  authors: [{ name: "Victor Borah" }, { name: "Kritika Micro Foundation" }],
  openGraph: {
    title: "Kritika Micro Foundation | E-Rickshaw Showroom & Dealership",
    description:
      "Explore E-Rickshaws, premium accessories, and convenient vehicle financing assistance at Kritika Micro Foundation showroom in Assam.",
    url: "https://kritikafoundation.com",
    siteName: "Kritika Micro Foundation",
    images: [
      {
        url: "/frames/ezgif-frame-180.jpg",
        width: 1920,
        height: 1080,
        alt: "Kritika Micro Foundation E-Rickshaws Showroom Fleet",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#030508] text-slate-100 antialiased selection:bg-[#00FF9D] selection:text-[#030508]">
        {children}
      </body>
    </html>
  );
}
