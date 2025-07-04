"use client";

import AdminNavItem from "./adminNavItem";
import Link from "next/link";
import { LogOut, Settings, Menu } from "lucide-react";
import { useState } from "react";

export default function AdminNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-[#3952fb] shadow-sm rounded-b-4xl px-4 py-2 md:px-12">
      {/* Mobile header */}
      <div className="flex items-center md:hidden gap-2">
        <button
          className="p-4 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          <Menu size={32} />
        </button>
        <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex items-center gap-18">
          <img src="/logo.png" alt="Logo" />
          <div className="flex items-center gap-8">
            <AdminNavItem href="/">
              My
              <br />
              App
            </AdminNavItem>
            <AdminNavItem href="/admin/modules">
              My
              <br />
              Course Manager
            </AdminNavItem>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-white hover:bg-white hover:text-[#6C63FF] p-2 rounded-md transition"
            title="Paramètres"
          >
            <Settings size={36} strokeWidth={2.5} />
          </Link>
          <Link
            href="/"
            className="text-white hover:bg-white hover:text-[#6C63FF] p-2 rounded-md transition"
            title="Déconnexion"
          >
            <LogOut size={36} strokeWidth={3} />
          </Link>
        </div>
      </div>

      {/* Mobile burger menu */}
      {open && (
        <div className="fixed top-0 left-0 w-3/4 h-full bg-white z-50 shadow-lg flex flex-col p-6 md:hidden">
          <button
            className="self-end mb-8 text-[#3952fb]"
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
          >
            ✕
          </button>
          <AdminNavItem
            href="/"
            className="text-lg font-semibold text-[#3952fb] text-left items-start px-2 py-3"
          >
            My App
          </AdminNavItem>
          <AdminNavItem
            href="/"
            className="text-lg font-semibold text-[#3952fb] text-left items-start px-2 py-3"
          >
            My Course Manager
          </AdminNavItem>
          <Link
            href="/admin/modules"
            className="flex items-center gap-2 mt-8 text-[#3952fb] font-semibold"
            onClick={() => setOpen(false)}
          >
            <Settings size={28} strokeWidth={2.5} />
            Paramètres
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 mt-4 text-[#3952fb] font-semibold"
            onClick={() => setOpen(false)}
          >
            <LogOut size={28} strokeWidth={3} />
            Déconnexion
          </Link>
        </div>
      )}
    </nav>
  );
}
