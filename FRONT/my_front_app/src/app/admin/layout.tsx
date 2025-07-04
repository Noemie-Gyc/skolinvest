import { ReactNode } from 'react';
import AdminNav from '@/components/adminNav';
import './admin.css'; // optionnel si tu veux encore des styles globaux

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FBF8FF]">
      <AdminNav/>
      <main>{children}</main>
    </div>
  );
}
