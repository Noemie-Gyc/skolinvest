'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mails } from "lucide-react";
import { useState } from "react";

type Props = {
    placeholder?: string,
}

{/* TODO : Créer une fonction pour vérifier la validité de l'adresse email  */ }

export function NewsletterInput({ placeholder }: Props) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    // Regex simple pour valider un email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleClick = () => {
        if (!emailRegex.test(email)) {
            setError("Adresse email invalide");
        } else {
            setError("");
            console.log("Email valide :", email);
        }
    };
    return (
        <div className="border rounded-lg flex justify between items-center">
            <Input
                type="text"
                placeholder={placeholder || "you@example.com"}
                data-testid="newsletter-email-input"
                className="border-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="ghost" size="icon" onClick={handleClick} data-testid="submit-button">
                <Mails />
                <span className="sr-only"> Newsletter Button </span>
            </Button>
            {error && (
                <p data-testid="error-message" className="text-red-600 text-sm">
                    {error}
                </p>
            )}
        </div>
    )
}