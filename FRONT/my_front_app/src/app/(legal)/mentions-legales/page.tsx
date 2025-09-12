import PublicHeader from "@/components/publicHeader";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <>
      <a
        href="/#legal-notices"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-black focus:text-white rounded"
      >
        Aller au contenu principal
      </a>
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
        <PublicHeader />
      </header>

      <main>
        <h1 id="legal-notices">MENTIONS LÉGALES</h1>
        <p>
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
          pour la confiance en l'économie numérique, il est précisé aux
          utilisateurs du site SkolInvest l'identité des différents
          intervenants dans le cadre de sa réalisation et de son suivi.
        </p>
        <section>
          <h2>Edition du site </h2>
          <p>
            Le présent site, accessible à l’URL https://www.skolinvest.com/ (le
            « Site »), est édité par :
          </p>
          <p>
            Noémie Goyec et Caroline Cirier, <br />3 boulevard Stalingrad <br />
            44000 Nantes
          </p>
        </section>

        <section>
          <h2>Hébergement</h2>
          <p>
            Le Site est hébergé par la société Serveur ADA, situé 116 Rue du
            Faubourg Saint-Martin, (contact téléphonique : +33144539092).
          </p>
        </section>
        <section>
          <h2>Directeur de publication</h2>
          <p>
            Les Directrices de la publication du Site sont Noémie Goyec et
            Caroline Cirier
          </p>
        </section>
        <section>
          <h2>Propriété Intellectuelle</h2>
          <p>
            Tous les contenus présents sur le site (textes, images, vidéos,
            logos, etc.) sont la propriété exclusive de SkolInvest ou de ses
            partenaires, sauf mention contraire. Toute reproduction,
            représentation ou diffusion, même partielle, des contenus du site
            est interdite sans autorisation écrite préalable, sauf exceptions
            légales (usage privé, citation avec mention de la source).
          </p>
        </section>
        <section>
          <h2>Nous contacter</h2>
          <p>Par email : alice@skolinvest.com </p>
        </section>
        <section>
          <h2>Données personnelles</h2>
          <p>
            Les données personnelles collectées sont traitées conformément à la
            loi Informatique et Libertés et au RGPD. Pour en savoir plus,
            consultez notre Politique de Confidentialité L’utilisateur dispose
            d’un droit d’accès, de rectification et de suppression de ses
            données.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}