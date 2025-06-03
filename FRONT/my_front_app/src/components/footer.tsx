
import { NewsletterInput } from "@/components/newsletterInput";

export default function Footer() {
    return (
        <footer className="bg-blue-600 py-10 border-t text-muted-foreground">
            <div className="container mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-start gap-8">

                {/* Newsletter form */}
                <form
                    className="flex flex-col items-center w-full max-w-md md:items-start"
                    role="form"
                    aria-label="Souscrire à la newsletter"
                >
                    <NewsletterInput />
                </form>

                {/* Contact section */}
                <section className="text-center md:text-right max-w-md w-full" aria-labelledby="contact-heading">
                    <h3
                        id="contact-heading"
                        className="text-lg font-semibold mb-4 text-white"
                    >
                        Contactez-moi
                    </h3>
                    <address className="not-italic text-sm space-y-2 text-white">
                        <p>
                            Email:{" "}
                            <a
                                href="mailto:contact@skolinvest.com"
                                className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                contact@skolinvest.com
                            </a>
                        </p>
                        <p>
                            Téléphone:{" "}
                            <a
                                href="tel:+33123456789"
                                className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                +33 1 23 45 67 89
                            </a>
                        </p>
                    </address>
                </section>
            </div>

            <p className="flex  text-white  justify-center w-full max-w-md mx-auto">
                © 2025 Skolinvest. Tous droits réservés.
            </p>
        </footer>
    );
}