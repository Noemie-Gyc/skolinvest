"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Youtube, Linkedin } from "lucide-react";

export default function Footer({
  logoSrc = "/logo.png",
}: {
  logoSrc?: string;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#3952fb] text-white rounded-t-4xl mt-8">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 items-start"> {/* + items-start */}

        {/* Col 1: Logo*/}
        <div>
          <Image
            src={logoSrc}
            alt="Logo"
            width={220}
            height={88}
            className="block h-16 md:h-20 w-auto"
          />

          <p className="text-white/80 text-sm mt-3">
            Formations et ressources pour investir et se former sereinement à la
            finance.
          </p>
        </div>

        {/* Col 2: Navigation */}
        <div className="pt-1 md:pt-2">
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:underline" href="/">
                Nos formations
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/about">
                A propos
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Legal */}
        <div className="pt-1 md:pt-2">
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:underline" href="/">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/">
                Conditions d’utilisation
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-4 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-white/80">
            © {year} Skol Invest. Tous droits réservés.
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="https://twitter.com"
              aria-label="Twitter"
              className="text-white/90 hover:text-white"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-white/90 hover:text-white"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.youtube.com"
              aria-label="YouTube"
              className="text-white/90 hover:text-white"
            >
              <Youtube className="w-5 h-5" />
            </Link>
            <Link
              href="https://www.linkedin.com"
              aria-label="LinkedIn"
              className="text-white/90 hover:text-white"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}