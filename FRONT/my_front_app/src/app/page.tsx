"use client";
import PublicHeader from "@/components/publicHeader";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { DiscoverButton } from "@/components/discoverButton";
import { Linkedin, Mail } from "lucide-react";
import { NewsletterInput} from "@/components/newsletterInput";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, } from "@/components/ui/carousel";
import { CarouselCourses } from "@/components/carouselCourse";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

export default function Page() {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const calendlyUrl = `https://calendly.com/skolinvest-formation/prise-de-rendez-vous-clone?month=${currentMonth}`;

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
        <section
          aria-labelledby="hero-title"
          className="bg-[#FFF8EE] min-h-[60vh] flex items-center px-4 py-12 sm:py-16"
        >
          <div className="w-full max-w-6xl mx-auto relative grid gap-6 sm:gap-8 md:grid-cols-2 md:items-center">
            <h1
              id="hero-title"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight md:absolute md:top-40 md:left-0 md:whitespace-nowrap md:z-10 md:pr-0 pointer-events-none"
            >
              INVESTIR AVEC SKOLINVEST
            </h1>
            <div className="pt-12 sm:pt-16 md:pt-40">
              <p className="text-base sm:text-lg text-gray-600">
                Se faire accompagner pour apprendre à placer
              </p>
              <DiscoverButton asChild className="mt-6">
                <Link
                  href="#formations-heading"
                  aria-label="Découvrir la section Nos formations"
                >
                  Découvrir
                </Link>
              </DiscoverButton>
            </div>
            <div className="relative md:col-start-2 md:row-start-1">
              <Image
                src="/apprendre-la-finance.png"
                alt="Illustration élève en formation financière"
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
          className="min-h-[60vh] flex flex-col justify-center px-4 py-12 sm:py-16 gap-4 w-full"
        >
          <div className="w-full max-w-4xl mx-auto">
            <h2 id="methode-heading" className="text-2xl font-semibold">
              LA METHODE SKOLINVEST
            </h2>
            <p className="leading-relaxed text-gray-700 mt-6">
              Des parcours structurés de manière à vous familiariser avec les
              concepts de base, indispensables à la bonne compréhension des
              mécanismes de marchés.
              <br />
              <br />
              Comprendre les institutions clés, leur rôle, les instruments
              financiers et leurs relations pour vous construire une vue globale
              et une réflexion sur l'univers financier.
              <br />
              <br />
              Après ces étapes vous verrez comment optimiser votre portefeuille
              et nous fixerons ensemble vos objectifs.
              <br />
              <br />
              Un second entretien a lieu à la fin du parcours afin de faire le
              point sur la construction de votre propre portefeuille.
            </p>
          </div>
        </section>

        <section
          id="formations"
          aria-labelledby="formations-heading"
          className="min-h-[60vh] flex flex-col justify-center px-4 py-12 sm:py-16 w-full"
        >
          <div className="w-full max-w-6xl mx-auto">
            <h2 id="formations-heading" className="text-2xl font-semibold">
              NOS COURS POUR APPRENDRE LA FINANCE
            </h2>

            <div className="bg-amber-300 flex flex-col lg:flex-row gap-10 p-4 rounded-md flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Parcours gestion passive : Débuter en bourse
                </h3>
                <p>
                  Les acteurs, le vocabulaire, les spécificités de chaque
                  instrument financier et gérer son portefeuille.
                </p>
                <p>
                  La formation vous indique les risques et rentabilités moyennes
                  selon les actifs et comment répartir votre épargne sur les
                  différents instruments en diversifiant votre risque.
                </p>
                <DiscoverButton>
                  <Link
                    href="/"
                    aria-label="Commencer le cours Gestion passive"
                  >
                    Commencer
                  </Link>
                </DiscoverButton>
              </div>

              <div className="flex-1 flex flex-col gap-8">
                {/* First carousel*/}
                <CarouselCourses
                  items={[
                    { id: 1, content: <>{"slide 1"}</> },
                    {
                      id: 2,
                      content: (
                        <>
                          {
                            "Un point sur la fiscalité est également fait afin d'optimiser le rendement de votre portefeuille. Vous apprendrez à sélectionner un fond et à diversifier le risque de votre portefeuille. A la fin de la formation vous aurez mis en place une routine d'investissement peu contraignante en terme de temps investi mensuellement dans la gestion de votre épargne."
                          }
                        </>
                      ),
                    },
                  ]}
                  className="self-start"
                />
              </div>
            </div>

            <div className="bg-amber-300 flex flex-col lg:flex-row gap-10 p-4 rounded-md flex-1 space-y-4 gap 8">
              <div>
                <h3 className="text-lg font-semibold">
                  Parcours expert : Stock picking
                </h3>
                <p>
                  Dans ce parcours vous apprendrez également les bases du
                  parcours gestion passive.
                </p>
                <p>
                  Une fois que vous aurez une bonne compréhension de l'univers
                  financier, de ses risques et de ses limites, indispensable à
                  la bonne réflexion d'un analyste financier.
                </p>
                <DiscoverButton>
                  <Link href="/" aria-label="Commencer le cours Stock picking">
                    Commencer
                  </Link>
                </DiscoverButton>
              </div>

              <div>
                {/* Second carousel */}
                <CarouselCourses
                  items={[
                    { id: 1, content: <>{}</> },
                    {
                      id: 2,
                      content: (
                        <>
                          {
                            "Vous serez plongé dans l'analyse d'entreprise afin d'aller chercher des rendements supérieurs au rendement du marché. Les actions sont historiquement l'actif le plus rentable, c'est pourquoi ce parcours se focalise sur l'analyse d'entreprises."
                          }
                        </>
                      ),
                    },
                    {
                      id: 3,
                      content: (
                        <>
                          {
                            "Nombreux sont les ratios et autres indicateurs boursiers alors comment savoir lesquels choisir? A partir de quel seuil sont-ils bons? Combien doivent-être validés pour passer à l'achat d'une action? L'analyse est-elle différente selon les secteurs?"
                          }
                        </>
                      ),
                    },
                    {
                      id: 4,
                      content: (
                        <>
                          {
                            "Ce parcours s'appuie notamment sur les expériences d'investisseurs ayant eu des performances remarquables pendant plus de 15 années tels que Warren Buffet, Peter Lynch, Ken Fisher, entre autres."
                          }
                        </>
                      ),
                    },
                    {
                      id: 5,
                      content: (
                        <>
                          {
                            "Vous apprendrez à lire des rapports financiers afin de dresser un cadre de sélection clair et les bons outils pour faciliter les analyses et le suivi de votre portefeuille vous seront fournis."
                          }
                        </>
                      ),
                    },
                  ]}
                  className="self-start"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          aria-labelledby="about-heading"
          className="min-h-[60vh] flex flex-col justify-center px-4 py-12 sm:py-16 gap-4 w-full"
        >
          <div className="w-full max-w-6xl mx-auto">
            <h2 id="about-heading" className="text-2xl font-semibold">
              À PROPOS
            </h2>
            <h3 className="text-lg font-medium mt-2">
              Skolinvest, c'est quoi ?
            </h3>
            <p>
              Skolinvest est née du constat d'un manque d'éducation financière
              en France alors que les études réalisées démontrent un fort
              intérêt de la part des français, en particulier les jeunes. <br />
              <br />
              Beaucoup de vulgarisateurs sont maintenant présents sur les
              réseaux sociaux. Cependant il n'est pas toujours évident de savoir
              par où commencer devant cette quantité d'information et comment
              procéder pour bien gérer son portefeuille.
            </p>
            <img
              src="/specialiste-finance-investissement.png"
              alt="illustration conseillère financière"
            />
            <p>
              Skolinvest est composé des termes skol et invest, skol signifie
              "école" en breton, vous êtes donc sur le site de l'école de
              l'investissement.
            </p>
            <p>
              Skolinvest se propose d'accompagner les débutants en bourse mais
              aussi les investisseurs plus aguerris afin de les guider dans
              l'utilisation des instruments et des indicateurs financiers, ainsi
              que leur apprendre à gérer un portefeuille boursier sur le
              long-terme et en faire des investisseurs confiants et
              indépendants.
            </p>
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="min-h-[60vh] flex flex-col justify-center px-4 py-12 sm:py-16 w-full"
        >
          <div className="w-full max-w-6xl mx-auto">
            <h2 id="contact-heading" className="text-2xl font-semibold">
              CONTACT
            </h2>
            <Link
              href="https://www.linkedin.com"
              aria-label="LinkedIn"
              className="text-black hover:text-black/60"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:alice@skolinvest.com"
              aria-label="Email"
              className="text-black hover:text-black/60"
            >
              <Mail className="w-5 h-5" />
            </Link>
            <NewsletterInput placeholder="Votre adresse email" />

            <DiscoverButton asChild>
              <Link href={calendlyUrl} aria-label="Prendre rendez-vous">
                Prendre rendez-vous
              </Link>
            </DiscoverButton>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}