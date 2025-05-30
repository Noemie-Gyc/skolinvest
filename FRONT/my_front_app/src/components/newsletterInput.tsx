import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mails } from "lucide-react";

type Props = {
    placeholder?: string,
}

  {/* TODO : Créer une fonction pour vérifier la validité de l'adresse email  */}

export function NewsletterInput({placeholder} : Props) {
    return (
        <div className="border rounded-lg flex justify between items-center">
            <Input
                type ="text"
                placeholder={placeholder || "you@example.com"}
                className = "border-none"
            />
            <Button variant ="ghost" size="icon">
                <Mails/>
                <span className="sr-only"> Newsletter Button </span>
            </Button>
        </div>
    )


}