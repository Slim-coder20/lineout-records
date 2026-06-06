"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type SiteChromeProps = {
  children: React.ReactNode;
};

/**
 * Affiche Navbar + Footer sur le site public uniquement.
 * L'espace admin utilise NavbarAdmin via app/admin/(protected)/layout.tsx.
 */
export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdminArea = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminArea) {
    return <main className="grow">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="grow pt-16">{children}</main>
      <Footer />
    </>
  );
}
