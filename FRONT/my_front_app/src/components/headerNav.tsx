"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, LogOut, Menu } from "lucide-react";

type NavItem = { href: string; label: string };

interface HeaderNavProps {
  items: NavItem[];
  logoSrc?: string;
  showSearch?: boolean;
  onLogoutClick?: () => void;
  className?: string;
}

export default function HeaderNav({
  items,
  logoSrc = "/logo.svg",
  showSearch = false,
  onLogoutClick,
  className = "",
}: HeaderNavProps) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <nav className={`bg-[#3952fb] shadow-sm rounded-b-4xl px-4 py-2 md:px-12 ${className}`}>
      {/* Mobile header */}
      <div className="flex items-center md:hidden gap-2">
        <button
          className="p-4 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          <Menu size={28} />
        </button>
        <Link href="/" aria-label="Accueil">
        <img src={logoSrc} alt="Logo Skolinvest" className="h-14 w-auto" />
        </Link>
        <div className="ml-auto flex items-center gap-2">
          {showSearch && (
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white hover:text-[#6C63FF] transition-colors" aria-label="Recherche">
                  <Search style={{ width: 26, height: 26 }} className="shrink-0" strokeWidth={2} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Recherche</DialogTitle>
                </DialogHeader>
                <Input 
                  placeholder="Rechercher…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </DialogContent>
            </Dialog>
          )}
          {onLogoutClick && (
            <Button variant="ghost" className="text-white hover:bg-white hover:text-[#6C63FF] transition-colors" onClick={onLogoutClick} aria-label="Déconnexion">
              <LogOut style={{ width: 26, height: 26 }} className="shrink-0" strokeWidth={2} />
            </Button>
          )}
        </div>
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex items-center gap-10">
          <Link href="/" aria-label="Accueil">
          <img src={logoSrc} alt="Logo Skolinvest" />
          </Link>
          <div className="flex items-center gap-2">
            {items.map((it) => (
              <Button
                key={it.href}
                asChild
                variant="ghost"
                className="text-white text-lg font-semibold px-4 py-6 rounded-md hover:bg-white hover:text-[#6C63FF]"
              >
                <Link href={it.href}>{it.label}</Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {showSearch && (
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white hover:text-[#6C63FF] transition-colors" aria-label="Recherche">
                  <Search style={{ width: 30, height: 30 }} className="shrink-0" strokeWidth={2} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle >Recherche</DialogTitle>
                </DialogHeader>
                <Input className="text-white hover:bg-white hover:text-[#6C63FF] transition-colors"
                  placeholder="Rechercher…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </DialogContent>
            </Dialog>
          )}
          {onLogoutClick && (
            <Button variant="ghost" className="text-white hover:bg-white hover:text-[#6C63FF] transition-colors" onClick={onLogoutClick} aria-label="Déconnexion">
               <LogOut style={{ width: 30, height: 30 }} className="shrink-0" strokeWidth={2} />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-3 bg-white rounded-xl shadow p-3 space-y-1">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="block px-3 py-2 rounded text-[#3952fb] font-semibold hover:bg-[#f0f2ff]"
              onClick={() => setOpen(false)}
            >
              {it.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}