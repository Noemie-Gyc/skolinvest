import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  hideLabel?: boolean; // option pour cacher visuellement le label
};

export function LoginInput({
  label,
  id,
  className,
  type = "text",
  hideLabel = false,
  ...rest
}: Props) {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={id}
        className={cn("text-sm font-medium text-gray-700", hideLabel && "sr-only")}
      >
        {label}
      </label>
      <div className="border rounded-lg flex justify-between items-center">
        <Input
          id={id}
          type={type}
          className={cn("bg-indigo-50", className)}
          {...rest}
        />
      </div>
    </div>
  );
}
