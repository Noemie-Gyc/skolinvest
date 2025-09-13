"use client";

import Link from "next/link";
import Image from "next/image";


export default function Footer({
  logoSrc = "/logo.png",
}: {
  logoSrc?: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#3952fb] text-white rounded-t-4xl mt-8">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 items-start">

        {/* + items-start */}
        {/* Col 1: Logo*/}
        <div>
          <Link href="/" aria-label="Accueil">
          <Image
            src={logoSrc}
            alt="Logo Skolinvest"
            width={220}
            height={88}
            className="block h-16 md:h-20 w-auto"
          />
          </Link>

          <p className="text-white/90 text-sm mt-3">
            Formations et ressources pour investir et se former sereinement à la
            finance.
          </p>
        </div>
        {/* Col 2: Navigation */}
        <div className="pt-1 md:pt-2">
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:underline" href="/#formations-heading">
                Nos formations
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/#about-heading">
                A propos
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/#contact-heading">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        {/* Col 3: Legal */}
        <div className="pt-1 md:pt-2">
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:underline" href="/mentions-legales">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/conditions-utilisation">
                Conditions d’utilisation
              </Link>
            </li>
            <li>
              <Link
                className="hover:underline"
                href="/politique-confidentialite"
              >
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 max-w-6xl mx-auto px-4 py-4 text-sm">
        <span className="text-white/90">
          © {year} SkolInvest. Tous droits réservés.
        </span>
      </div>
    </footer>
  );
}