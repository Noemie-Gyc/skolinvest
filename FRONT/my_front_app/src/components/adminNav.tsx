// src/components/AdminNav.tsx

import AdminNavItem from './adminNavItem';
import Link from 'next/link';

export default function AdminNav() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#3952fb] shadow-sm">
      {/* Logo */}
      <div className="text-white font-bold text-xl">Logo</div>

      {/* Menu */}
      <div className="flex items-center gap-4">
        <AdminNavItem href="/admin">
          My<br />App
        </AdminNavItem>
        <AdminNavItem href="/admin/modules">
          My<br />Course Manager
        </AdminNavItem>

        <Link href="/logout" className="text-white hover:underline text-sm">
          Déconnexion
        </Link>
      </div>
    </nav>
  );
}
