import { ReactNode } from 'react';
import './admin.css';
import AdminHeader from '@/components/adminHeader';


export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FBF8FF]">
      <AdminHeader/>
      <main>{children}</main>
    </div>
  );
}
