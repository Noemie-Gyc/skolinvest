"use client";
import PublicHeader from "@/components/publicHeader";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { DiscoverButton } from "@/components/discoverButton";
import { Linkedin, Mail } from "lucide-react";
import { NewsletterInput } from "@/components/newsletterInput";
import { CarouselCourses } from "@/components/carouselCourse";
import { useEffect, useState } from 'react';

export default function Page() {
  const [modules, setModules] = useState<Array<{ id: number; title: string }>>([]);
  const [modulesLoading, setModulesLoading] = useState(true);
  const [modulesError, setModulesError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadModules() {
      setModulesLoading(true);
      setModulesError(null);
      try {
  // Use the frontend proxy endpoint so we don't run into CORS or cookie issues.
        const res = await fetch('/api/modules/public');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        // backend now returns an array of published modules: [{ id, title }, ...]
        if (Array.isArray(data)) {
          setModules(data.map((m: any) => ({ id: Number(m.id), title: String(m.title) })));
        } else if (data && typeof data === 'object' && data.title) {
          // backward compatibility: single-object shape { title }
          setModules([{ id: Number(data.id ?? 0), title: String(data.title) }]);
        } else {
          setModules([]);
        }
      } catch (err: any) {
        if (!mounted) return;
        setModulesError(err?.message ?? 'Erreur réseau');
        setModules([]);
      } finally {
        if (mounted) setModulesLoading(false);
      }
    }

    loadModules();
    return () => { mounted = false; };
  }, []);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const calendlyUrl = `https://calendly.com/skolinvest-formation/prise-de-rendez-vous-clone?month=${currentMonth}`;

  return (
    <>
      <a
        href="#formations-heading"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-black focus:text-white focus:rounded"
      >
        Aller au contenu principal
      </a>

      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b" role="banner">
        <PublicHeader />
      </header>

      <main id="main-content" className="min-h-screen flex flex-col">
        <section
          aria-labelledby="hero-title"
          className="bg-[#FFF8EE] min-h-[60vh] flex items-center px-4 py-12 sm:py-16"
        >
          <div className="w-full max-w-5xl mx-auto relative grid gap-8 sm:gap-10 md:grid-cols-2">
            <div className="pt-8 sm:pt-10 md:pt-12 lg:pt-16">
              <h1
                id="hero-title"
                className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-gray-900"
              >
                APPRENDRE À INVESTIR AVEC SKOLINVEST
              </h1>
              <p className="text-base sm:text-lg text-gray-700 mt-4">
                Se faire accompagner pour apprendre à placer son argent en toute sérénité.
              </p>
              <DiscoverButton asChild className="mt-6" aria-label="Découvrir nos formations">
                <Link href="#formations-heading">Découvrir</Link>
              </DiscoverButton>
            </div>
            <div className="relative md:col-start-2 md:row-start-1">
              <Image
                src="/apprendre-la-finance.png"
                alt="Illustration d'un élève suivant une formation financière en ligne"
                width={720}
                height={480}
                priority
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </section>

        <section
          id="methode"
          aria-labelledby="methode-heading"
          className="min-h-[60vh] flex flex-col px-4 py-12 sm:py-16 gap-4 w-full"
        >
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            <h2 id="methode-heading" className="text-2xl font-semibold text-gray-900">
              PLACER SANS RISQUE : LA MÉTHODE SKOLINVEST
            </h2>
            <p className="leading-relaxed text-gray-700 mt-6 text-base sm:text-lg">
              Des parcours structurés de manière à vous familiariser avec les concepts de base, indispensables à la bonne compréhension des mécanismes de marchés.
              <br /><br />
              Comprendre les institutions clés, leur rôle, les instruments financiers et leurs relations pour vous construire une vue globale et une réflexion sur l'univers financier.
              <br /><br />
              Après ces étapes, vous verrez comment optimiser votre portefeuille et nous fixerons ensemble vos objectifs.
              <br /><br />
              Un second entretien a lieu à la fin du parcours afin de faire le point sur la construction de votre propre portefeuille.
            </p>
          </div>
        </section>

        <section
          id="formations"
          aria-labelledby="formations-heading"
          className="min-h-[60vh] flex flex-col justify-center px-4 py-12 sm:py-16 w-full"
        >
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            <h2 id="formations-heading" className="text-2xl font-semibold text-gray-900">
              NOS COURS POUR APPRENDRE LA FINANCE
            </h2>
            <div className="flex flex-col gap-10 mt-10">
              {modulesLoading ? (
                <div className="w-full p-6 m-6 shadow-sm shadow-black/10 rounded-xl bg-white/80">
                  <h3 className="text-lg font-semibold text-gray-800">Chargement...</h3>
                </div>
              ) : modules.length > 0 ? (
                modules.map((mod) => (
                  <div key={mod.id} className="w-full flex flex-col lg:flex-row gap-8 p-4 sm:p-6 items-start shadow-sm shadow-black/15 rounded-xl bg-white/80 backdrop-blur">
                    <div className="w-full lg:w-1/2 pr-4">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">{mod.title}{modulesError ? ` — erreur: ${modulesError}` : null}</h3>
                      <p className="mb-4 text-base sm:text-lg text-gray-700">
                        Découvrez les acteurs, le vocabulaire, les spécificités de chaque instrument financier et apprenez à gérer votre portefeuille.
                      </p>
                      <DiscoverButton className="mb-4" aria-label={`Commencer le cours ${mod.title}`}>
                        <Link href="/">Commencer</Link>
                      </DiscoverButton>
                    </div>
                    <div className="w-full lg:w-1/2 pl-4">
                      <CarouselCourses
                        items={[
                          {
                            id: 1,
                            content: (
                              <div className="w-full flex flex-col justify-start">
                                <Image
                                  src="/financeMiniature.webp"
                                  alt={`Aperçu du module ${mod.title}`}
                                  width={400}
                                  height={400}
                                  className="w-full h-auto object-cover rounded-lg"
                                />
                                <h4 className="mt-2 text-sm text-center text-gray-800">Détails du module {mod.title}</h4>
                              </div>
                            ),
                          },
                          {
                            id: 2,
                            content: (
                              <p className="text-base sm:text-lg text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                            ),
                          },
                        ]}
                        className="w-full"
                        aria-label={`Carousel des détails du cours ${mod.title}`}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="m-6 text-gray-600">Aucun module publié pour le moment.</div>
              )}
            </div>
          </div>
        </section>

        <section
          id="about"
          aria-labelledby="about-heading"
          className="min-h-[60vh] flex flex-col justify-center px-4 py-12 sm:py-16 gap-4 w-full"
        >
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 ">
            <h2 id="about-heading" className="text-2xl font-semibold text-gray-900">À PROPOS : DE LA PASSION DE LA FINANCE À SKOLINVEST</h2>
            <h3 className="text-lg font-medium mt-4 text-gray-800">Skolinvest, c'est quoi ?</h3>
            <p className="mt-4 text-base sm:text-lg text-gray-700">Skolinvest est née du constat d'un manque d'éducation financière en France alors que les études réalisées démontrent un fort intérêt de la part des Français, en particulier les jeunes.
              <br /><br />
              Beaucoup de vulgarisateurs sont maintenant présents sur les réseaux sociaux. Cependant, il n'est pas toujours évident de savoir par où commencer devant cette quantité d'informations et comment procéder pour bien gérer son portefeuille.
            </p>
            <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12 items-start mt-16">
              <div className="w-full md:w-1/2 md:mr-18">
                <Image src="/specialiste-finance-investissement.png" alt="Illustration d'une conseillère financière" height={400} width={400} className="w-full h-auto object-cover rounded-lg" />
              </div>
              <div className="w-full md:w-1/2 mt-4 md:mt-0">
                <p className="text-base sm:text-lg text-gray-700">Skolinvest est composé des termes "skol" et "invest". "Skol" signifie "école" en breton : vous êtes donc sur le site de l'école de l'investissement.
                  <br /><br />
                  Skolinvest se propose d'accompagner les débutants en bourse mais aussi les investisseurs plus aguerris afin de les guider dans l'utilisation des instruments et des indicateurs financiers, ainsi que leur apprendre à gérer un portefeuille boursier sur le long terme et en faire des investisseurs confiants et indépendants.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="min-h-[60vh] flex flex-col justify-center px-4 py-12 sm:py-16 w-full"
        >
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
            <h2 id="contact-heading" className="text-2xl font-semibold text-center text-gray-900">
              LE PROJET D'INVESTIR ? CONTACTEZ-MOI
            </h2>
            <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap mt-8">
              <DiscoverButton asChild>
                <Link
                  href={calendlyUrl}
                  aria-label="Prendre rendez-vous pour discuter d'un projet d'investissement"
                  className="inline-flex items-center gap-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Rendez-vous
                </Link>
              </DiscoverButton>
              <Link
                href="https://www.linkedin.com/company/skolinvest"
                aria-label="Visiter la page LinkedIn"
                className="text-black hover:text-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <Linkedin className="w-8 h-8" aria-hidden="true" focusable="false" />
              </Link>
              <Link
                href="mailto:alice@skolinvest.com"
                aria-label="Envoyer un email à alice@skolinvest.com"
                className="text-black hover:text-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                <Mail className="w-8 h-8" aria-hidden="true" focusable="false" />
              </Link>
            </div>
            <div className="flex justify-center w-full mt-8">
              <form className="w-full max-w-sm">
                <label htmlFor="newsletter-email" className="sr-only">
                  Adresse email pour la newsletter
                </label>
                <NewsletterInput
                  id="newsletter-email"
                  placeholder="Votre adresse email"
                  aria-label="S'inscrire à la newsletter pour recevoir des conseils en investissement"
                />
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer role="contentinfo" />
    </>
  );
}
 