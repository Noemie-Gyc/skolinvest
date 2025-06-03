import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mails } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
    placeholder?: string,
}

  {/* TODO : Créer une fonction pour vérifier la validité de l'adresse email  */}

export function NewsletterInput({placeholder} : Props) {
    return (
        <div className="border-none rounded-lg flex justify between items-center gap-x-2">
            <Input
                type ="text"
                placeholder={placeholder || "you@example.com"}
                className = "bg-white placeholder-black text-black border-none rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary flex-1/2"
            />
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Mails />
                        <span className="sr-only">Envoyer</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Inscription à la newsletter</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}