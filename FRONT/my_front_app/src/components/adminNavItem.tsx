import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

export default function AdminNavItem({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Button
      asChild
      variant="ghost"
      className={`
        text-white text-2xl font-semibold
        px-8 py-10
        flex flex-col items-center justify-center
        text-center
        rounded-md
        transition
        hover:bg-white hover:text-[#6C63FF]
        ${className}
      `}
>
  <Link href={href}>{children}</Link>
</Button>
  );
}
