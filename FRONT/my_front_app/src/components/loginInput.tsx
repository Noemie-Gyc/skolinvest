import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils"; // utile si tu veux combiner className

type Props = InputHTMLAttributes<HTMLInputElement>;

export function LoginInput({placeholder, className, type = "text", ...rest}: Props) {
    return (
        <div className="border rounded-lg flex justify-between items-center">
            <Input
                type= {type}
                placeholder= {placeholder}
                className= {cn("bg-indigo-50", className)}
                {...rest}
            />
        </div>
    )
}