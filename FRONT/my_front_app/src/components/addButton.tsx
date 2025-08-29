import Link from "next/link";
import { Button } from "@/components/ui/button";


type AddButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  href?: string;
  "aria-label"?: string;
};

export function AddButton({ children, className, href, "aria-label": ariaLabel, ...props }: AddButtonProps) {
  const baseClasses =
    "inline-flex items-center gap-3 px-8 py-3 rounded-full whitespace-nowrap min-w-[140px] bg-orange-200 border border-amber-600 text-amber-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg font-semibold";

  if (href) {
    const linkClasses =
      "inline-flex items-center gap-3 px-10 py-3 rounded-full whitespace-nowrap min-w-[140px] bg-orange-200  text-amber-900 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg font-semibold";

    return (
      <Link href={href} className={`${linkClasses} ${className ?? ""}`} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <Button className={`${baseClasses} ${className ?? ""}`} aria-label={ariaLabel} {...props}>
      {children}
    </Button>
  );
}
