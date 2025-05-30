import { Button } from "@/components/ui/button"
 
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export function SaveButton({ children, className, ...props }: ButtonProps) {
  const baseClasses = "bg-blue-600 text-white rounded-lg py-2 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition";

  return (
    <Button
      className={`${baseClasses} ${className ?? ""}`}
      {...props}
    >
      {children}
    </Button>
  );
}