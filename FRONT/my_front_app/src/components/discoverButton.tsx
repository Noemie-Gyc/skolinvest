import { Button } from "@/components/ui/button"
import type { ComponentProps } from "react";

 
type ButtonProps = ComponentProps<typeof Button> & {
  children: React.ReactNode;
};

export function DiscoverButton({ children, className, ...props }: ButtonProps) {
  const baseClasses = "bg-orange-200 border-1 border-amber-800 text-amber-800 font-medium rounded-2xl py-2 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition";

  return (
    <Button
      className={`${baseClasses} ${className ?? ""}`}
      {...props}
    >
      {children}
    </Button>
  );
}