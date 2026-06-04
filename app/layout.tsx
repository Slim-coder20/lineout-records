import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

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
    <html lang="fr" className={`h-full ${poppins.variable}`}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={`${poppins.className} min-h-full flex flex-col font-sans antialiased`}>
        <Navbar />
        <main className="grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
