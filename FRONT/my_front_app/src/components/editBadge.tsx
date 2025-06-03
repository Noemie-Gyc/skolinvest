import { Badge } from "@/components/ui/badge";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function EditBadge({ children, className, ...props }: ButtonProps) {
  const baseClasses = "bg-stone-200 border-1 border-amber-800 text-orange-950 rounded-lg py-2 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition";

  return (
    <Badge
      className={`${baseClasses} ${className ?? ""}`}
      {...props}
    >
      {children}
    </Badge>
  );
}