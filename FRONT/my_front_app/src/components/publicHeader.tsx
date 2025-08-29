"use client";
import HeaderNav from "@/components/headerNav";

export default function PublicHeader() {
  return (
    <HeaderNav
      items={[
        { href: "/", label: "Nos formations" },
        { href: "/about", label: "A propos" },
        { href: "/contact", label: "Contact" },
      ]}
      showSearch
    />
  );
}