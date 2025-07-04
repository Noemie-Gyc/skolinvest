import { ReactNode } from 'react';
import '../admin/admin.css';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <div className="admin-background">{children}</div>;
}
