import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "LineOut Records",
  description: "Venez concrétisez vos idées musicales ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
