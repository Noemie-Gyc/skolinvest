import PublicHeader from "@/components/publicHeader";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { DiscoverButton } from "@/components/discoverButton";

export default function Page() {
  return (
    <>
      <a
        href="#formations-heading"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-black focus:text-white rounded"
      >
        Aller au contenu principal
      </a>
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
        <PublicHeader />
      </header>

      <main className="min-h-screen flex flex-col">
        <section aria-labelledby="hero-title" className="bg-[#FFF8EE] min-h-[60vh] flex items-center px-4 py-12 sm:py-16">
          <div className="w-full max-w-6xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 id="hero-title" className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                INVESTIR AVEC SKOLINVEST
              </h1>
              <p className="mt-3 text-base sm:text-lg text-gray-600">Se faire accompagner pour apprendre à placer</p>
              <DiscoverButton asChild className="mt-6">
                <Link href="#formations" aria-label="Découvrir la section Nos formations">Découvrir</Link>
              </DiscoverButton>
            </div>

            <div className="relative">
              <Image
                src="/apprendre-la-finance.png"
                alt="Illustration d'un élève en formation financière"
                width={720}
                height={480}
                priority
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </section>

        <section id="formations" aria-labelledby="formations-heading" className="min-h-[60vh] flex items-center justify-center px-4 py-12 sm:py-16">
          <h2 id="formations-heading" className="text-2xl font-semibold">Nos formations</h2>
        </section>

        <section id="about" aria-labelledby="about-heading" className="min-h-[60vh] flex items-center justify-center px-4 py-12 sm:py-16">
          <h2 id="about-heading" className="text-2xl font-semibold">À propos</h2>
        </section>

        <section id="contact" aria-labelledby="contact-heading" className="min-h-[60vh] flex items-center justify-center px-4 py-12 sm:py-16">
          <h2 id="contact-heading" className="text-2xl font-semibold">Contact</h2>
        </section>
      </main>

      <Footer />
    </>
  );
}