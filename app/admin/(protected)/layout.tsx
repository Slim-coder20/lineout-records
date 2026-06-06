import NavbarAdmin from "@/components/NavbarAdmin";

export default function AdminProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarAdmin />
      <div className="pt-16">{children}</div>
    </>
  );
}
