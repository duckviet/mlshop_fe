import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navigation/Navbar";
import { StrictMode } from "react";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import CustomerProvider from "@/providers/CustomerProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Shopz - Your One-Stop Shop",
  description: "Find everything you need at Shopz",
  openGraph: {
    title: "My Website",
    description: "Welcome to My Website",
    images: [
      {
        url: "/path/to/image.jpg",
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
    ],
    siteName: "My Website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@eMartiiin94",
    title: "Title webtsite",
    description: "this is the desciption",
  },
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StrictMode>
          <NextAuthProvider>
            <CustomerProvider>
              {/* <CartProvider> */}
              <Navbar />
              <ToastContainer position="top-right" />
              <div className="  bg-zinc-100">
                <div>
                  {children}
                  <div id="modal-root" className="fixed w-full h-full">
                    {modal}
                  </div>
                </div>
              </div>
              {/* </CartProvider> */}
              <Footer />
            </CustomerProvider>{" "}
          </NextAuthProvider>
        </StrictMode>
      </body>
    </html>
  );
}
