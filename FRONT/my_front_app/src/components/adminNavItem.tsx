import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

export default function AdminNavItem({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Button
      asChild
      variant="ghost" // style neutre sans fond
      className="text-white text-lg leading-tight px-4 py-2 hover:bg-white hover:text-[#6C63FF] rounded-md transition"
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
