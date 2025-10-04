import PublicHeader from "@/components/publicHeader";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-black focus:text-white rounded"
        aria-label="Aller au contenu principal"
      >
        Aller au contenu principal
      </a>
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
        <PublicHeader />
      </header>

      <main id="main-content" role="main">
        <h1>CONDITIONS GENERALES D'UTILISATION</h1>
        <section>
          <h2>1. Préambule</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation (CGU) régissent
            l’accès et l’utilisation du site SkolInvest (ci-après « le Site »),
            édité par Noémie Goyec et Caroline Cirier, et accessible à l’adresse
            https://www.skolinvest.com. <br />
            <br />
            Les présentes Conditions Générales d'Utilisation (CGU) s'appliquent à tous les utilisateurs de SkolInvest, qu'ils soient visiteurs, apprenants ou administrateurs. Certaines sections concernent spécifiquement les administrateurs accédant au back office.
          </p>
          <p>
            En accédant au Site, vous acceptez sans réserve les présentes CGU.
            Si vous n’acceptez pas ces conditions, nous vous invitons à ne pas
            utiliser le Site.
          </p>
        </section>

        <section>
          <h2>2. Objet du Site</h2>
          <p>
            Le Site SkolInvest propose des cours et ressources éducatives en
            finance, créés par une conseillère financière, en accès libre et
            gratuit. Ces contenus sont destinés à informations et éducation
            financières uniquement et ne constituent pas un conseil personnalisé
            en investissement.
          </p>
        </section>
        <section>
          <h2>3. Accès au Site</h2>
          <ul>
            <li>
              L’accès au Site est gratuit et ouvert à toute personne majeure ou
              émancipée.
            </li>
            <li>
              L’utilisateur est responsable de son équipement et de sa connexion
              internet.
            </li>
            <li>
              Le Site se réserve le droit de suspendre, modifier ou interrompre
              l’accès au Site à tout moment, sans préavis, notamment pour des
              raisons de maintenance ou d’évolution des services.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Propriété Intellectuelle</h2>
          <ul>
            <li>
              Tous les contenus (textes, vidéos, images, logos, etc.) publiés
              sur le Site sont la propriété exclusive de SkolInvest ou de ses
              partenaires.
            </li>
            <li>
              Toute reproduction, représentation ou diffusion, même partielle,
              des contenus du Site est interdite sans autorisation écrite
              préalable, sauf exceptions légales (usage privé, citation avec
              mention de la source).
            </li>
            <li>
              Les marques SkolInvest et son logo sont des marques déposées.
            </li>
          </ul>
        </section>
        <section>
          <h2>5. Responsabilités</h2>
          <h3>5.1. Responsabilité de l’utilisateur</h3>
          <ul>
            <li>
              L’utilisateur s’engage à utiliser le Site conformément à la loi et
              aux présentes CGU.
            </li>
            <li>
              Il est interdit d’utiliser le Site à des fins illicites,
              frauduleuses ou nuisibles.
            </li>
            <li>
              L’utilisateur est seul responsable des consequences de ses actes
              sur le Site.
            </li>
          </ul>
          <h3>5.2. Responsabilité de SkolInvest</h3>
          <ul>
            <li>
              Les informations diffusées sur le Site sont fournies à titre
              indicatif et éducatif.
            </li>
            <li>
              SkolInvest ne saurait être tenue responsable :
              <ul>
                <li>Des erreurs ou omissions dans les contenus.</li>
                <li>
                  Des décisions d’investissement prises par l’utilisateur sur la
                  base des informations du Site.
                </li>
                <li>
                  Des dommages directs ou indirects résultant de l’utilisation
                  du Site.
                </li>
              </ul>
            </li>
            <li>
              Le Site ne garantit pas l’exhaustivité, l’exactitude ou
              l’actualité des informations.
            </li>
          </ul>
        </section>
        <section>
          <h2>6. Données Personnelles</h2>
          <ul>
            <li>
              Les données personnelles collectées (ex : adresse e-mail via un
              formulaire de contact) sont traitées conformément à la loi
              Informatique et Libertés et au RGPD.
            </li>
            <li>
              Pour en savoir plus, consultez notre Politique de Confidentialité
              (à créer si ce n’est pas déjà fait).
            </li>
            <li>
              L’utilisateur dispose d’un droit d’accès, de rectification et de
              suppression de ses données.
            </li>
          </ul>
        </section>
        <section>
          <h2>7. Liens Hypertextes</h2>
          <ul>
            <li>
              Le Site peut contenir des liens vers des sites tiers. SkolInvest
              n’exerce aucun contrôle sur ces sites et décline toute
              responsabilité quant à leur contenu.
            </li>
            <li>
              La création de liens vers le Site est autorisée, sous réserve de
              ne pas porter atteinte à l’image de SkolInvest.
            </li>
          </ul>
        </section>
        <section>
          <h2>8. Modification des CGU</h2>
          <ul>
            <li>
              SkolInvest se réserve le droit de modifier les présentes CGU à
              tout moment.
            </li>
            <li>
              Les modifications seront effectives dès leur publication sur le
              Site.
            </li>
            <li>L’utilisateur est invité à consulter régulièrement les CGU.</li>
          </ul>
        </section>
        <section>
          <h2>9. Loi Applicable et Litiges</h2>
          <ul>
            <li>Les présentes CGU sont régies par le droit français.</li>
            <li>
              Tout litige relatif à l’utilisation du Site sera soumis aux
              tribunaux compétents, nonobstant pluralité de défendeurs.
            </li>
          </ul>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>
            Pour toute question ou réclamation, vous pouvez nous contacter à
            l’adresse suivante : <a href="mailto:alice@skolinvest.com">alice@skolinvest.com</a>
          </p>
          <ul>
            <li>Les présentes CGU sont régies par le droit français.</li>
            <li>
              Tout litige relatif à l’utilisation du Site sera soumis aux
              tribunaux compétents, nonobstant pluralité de défendeurs.
            </li>
          </ul>
        </section>
        <section>
          <h2>Utilisation du Back Office</h2>
          <h3>1. Accès réservé</h3>
          <ul>
            <li>
              L’accès au back office est réservé aux membres autorisés de
              l’équipe de [Nom de la cliente].
            </li>
            <li>
              Chaque utilisateur dispose d’un compte personnel et est
              responsable de la confidentialité de ses identifiants.
            </li>
          </ul>

          <h3>2. Utilisation autorisée</h3>
          <ul>
            <li>
              Le back office est destiné uniquement à la gestion des cours, des
              utilisateurs et des contenus de SkolInvest.
            </li>
            <li>
              Toute utilisation non autorisée (partage de compte, accès
              frauduleux, etc.) est interdite.
            </li>
          </ul>

          <h3>3. Responsabilités des administrateurs</h3>
          <p>Les administrateurs s’engagent à :</p>
          <ul>
            <li>Ne pas partager leurs identifiants avec des tiers.</li>
            <li>
              Respecter les lois en vigueur (droit d’auteur, protection des
              données, etc.).
            </li>
            <li>
              Ne pas modifier ou supprimer des contenus sans autorisation.
            </li>
          </ul>
          <h3>4. Sécurité</h3>
          <ul>
            <li>
              Les administrateurs doivent signaler immédiatement toute suspicion
              de violation de sécurité (ex : accès non autorisé).
            </li>
            <li>
              SkolInvest se réserve le droit de suspendre ou résilier l’accès
              en cas de non-respect des règles.
            </li>
          </ul>
          <h3>5. Propriété des contenus</h3>
          <ul>
            <li>
              Les contenus créés via le back office (cours, images, vidéos,
              etc.) restent la propriété de Alice Goyec.
            </li>
            <li>Les administrateurs ne peuvent ni copier ni redistribuer ces contenus en dehors du cadre de SkolInvest.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}