"use client";

import AdminNavItem from "./adminNavItem";
import Image from 'next/image';
import Link from "next/link";
import { LogOut, Settings, Menu } from "lucide-react";
import { useState } from "react";

export default function AdminNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#3952fb] shadow-sm rounded-b-4xl px-4 py-4 md:py-6 md:px-12">
      {/* Mobile Header */}
      <div className="flex items-center justify-between md:hidden">
        <button
          className="p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          <Menu size={28} />
        </button>
        <Image src="/logo.png" alt="Logo" className="h-12 w-auto" width={120}
          height={48} />
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex items-center gap-16">
          <Image src="/logo.png" alt="Logo" className="h-16 w-auto" width={120}
            height={48} />
          <div className="flex items-center gap-8">
            <AdminNavItem href="/">My<br />App</AdminNavItem>
            <AdminNavItem href="/admin/modules">My<br />Course Manager</AdminNavItem>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-white hover:bg-white hover:text-[#6C63FF] p-2 rounded-md transition"
            title="Paramètres"
          >
            <Settings size={32} strokeWidth={2.5} />
          </Link>
          <Link
            href="/"
            className="text-white hover:bg-white hover:text-[#6C63FF] p-2 rounded-md transition"
            title="Déconnexion"
          >
            <LogOut size={32} strokeWidth={3} />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed top-0 left-0 w-full sm:w-4/5 h-full bg-white z-50 shadow-lg flex flex-col p-6 md:hidden">
          <button
            className="self-end mb-6 text-[#3952fb] text-2xl"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
          >
            ✕
          </button>

          <AdminNavItem
            href="/"
            className="text-base font-semibold text-[#3952fb] text-left items-start px-2 py-3"
          >
            My App
          </AdminNavItem>
          <AdminNavItem
            href="/admin/modules"
            className="text-base font-semibold text-[#3952fb] text-left items-start px-2 py-3"
          >
            My Course Manager
          </AdminNavItem>

          <Link
            href="/"
            className="flex items-center gap-2 mt-8 text-[#3952fb] font-semibold"
            onClick={() => setOpen(false)}
          >
            <Settings size={24} strokeWidth={2.5} />
            Paramètres
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 mt-4 text-[#3952fb] font-semibold"
            onClick={() => setOpen(false)}
          >
            <LogOut size={24} strokeWidth={2.5} />
            Déconnexion
          </Link>
        </div>
      )}
    </nav>
  );
}