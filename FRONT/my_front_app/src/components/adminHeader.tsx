"use client";
import HeaderNav from "@/components/headerNav";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout/", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Erreur de déconnexion:", err);
    } finally {
      router.push("/admin-login");
    }
  };

  return (
    <HeaderNav
      items={[
        { href: "/", label: "My view app" },
        { href: "/admin/modules", label: "My course manager" },
      ]}
      onLogoutClick={handleLogout}
    />
  );
}