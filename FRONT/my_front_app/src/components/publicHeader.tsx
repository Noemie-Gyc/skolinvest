"use client";
import HeaderNav from "@/components/headerNav";

export default function PublicHeader() {
  return (
    <HeaderNav
      items={[
  { href: "/#formations-heading", label: "Nos formations" },
  { href: "/#about-heading", label: "A propos" },
  { href: "/#contact-heading", label: "Contact" },
      ]}
      showSearch
    />
  );
}