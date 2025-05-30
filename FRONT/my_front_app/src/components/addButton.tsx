import { Button } from "@/components/ui/button"
 
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // On ne rend PAS la prop variant publique ici, car on veut forcer "orange"
  children: React.ReactNode;
};

export function AddButton({ children, className, ...props }: ButtonProps) {
  const baseClasses = "bg-orange-200 border-1 border-amber-800 text-amber-800 rounded-2xl py-2 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition";

  return (
    <Button className={`${baseClasses} ${className ?? ""}`} {...props}>
      {children}
    </Button>
  );
}