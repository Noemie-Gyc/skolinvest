import { Button } from "@/components/ui/button"
 
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function ConnexionButton({ children, className, ...props }: ButtonProps) {
  const baseClasses = "bg-orange-200 text-amber-800 rounded-lg py-2 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition";

  return (
    <Button
      className={`${baseClasses} ${className ?? ""}`}
      {...props}
    >
      {children}
    </Button>
  );
}
