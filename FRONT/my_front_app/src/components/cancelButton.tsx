import { Button } from "@/components/ui/button"
 
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function CancelButton({ children, className, ...props }: ButtonProps) {
  const baseClasses = "bg-stone-100 text-neutral-950 border-1 border-neutral-400 rounded-lg py-2 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition";

  return (
    <Button
      className={`${baseClasses} ${className ?? ""}`}
      {...props}
    >
      {children}
    </Button>
  );
}