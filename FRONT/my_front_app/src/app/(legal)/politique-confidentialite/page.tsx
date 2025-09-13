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
        <h1>POLITIQUE DE CONFIDENTIALITÉ</h1>
        <h2>Introduction</h2>
        <p>
          SkolInvest, édité par Noémie Goyec et Caroline Cirier, s’engage à
          protéger la vie privée et les données personnelles de ses
          utilisateurs. Cette Politique de Confidentialité explique comment nous
          collectons, utilisons, partageons et protégeons les informations que
          vous nous fournissez lorsque vous utilisez notre site
          https://www.skolinvest.com. En utilisant notre site, vous acceptez les
          pratiques décrites dans cette politique. Les membres de l’équipe
          d'Alice Goyec accédant au back office sont soumis à des règles
          supplémentaires décrites dans la section 'Données des Utilisateurs
          Administrateurs'.
        </p>
        <h2>Données Personnelles Collectées</h2>
        <p>
          Dans le cadre de l’utilisation de notre site vitrine, nous pouvons
          collecter les données suivantes :
        </p>
        <h3>2.1. Données collectées automatiquement</h3>
        <p>
          Données de navigation : Adresse IP, type de navigateur, pages
          consultées, durée de visite, référents. Cookies : Nous utilisons des
          cookies pour améliorer votre expérience et analyser le trafic (voir
          notre section "Cookies").
        </p>
        <h3>2.2. Données fournies volontairement</h3>
        <p>
          Formulaire d'inscription à notre newsletter : Si vous nous contactez
          via le formulaire, nous collectons votre nom, prénom et adresse
          e-mail.
        </p>
        <h2>Finalités de la Collecte</h2>
        <p>
          Les données collectées sont utilisées pour : Vous envoyer notre
          newsletter (si vous y avez souscrit dans notre formulaire
          d'inscription).
        </p>
        <h2>Base Légale du Traitement</h2>
        <p>Le traitement de vos données repose sur :</p>
        <ul>
          <li>
            Votre consentement (pour les cookies et le formulaire d'inscription
            à notre newsletter).
          </li>
        </ul>
        <h2>Destinataires des Données</h2>
        <p>
          Vos données personnelles ne sont ni vendues ni partagées avec des
          tiers, sauf :
        </p>
        <p>
          Prestataires techniques (hébergeur, outils d’analyse comme Google
          Analytics) pour le fonctionnement du site. Autorités légales si la loi
          l’exige.
        </p>
        <h2>Cookies</h2>
        <p>
          Qu’est-ce qu’un cookie ? : Un cookie est un petit fichier texte déposé
          sur votre terminal lors de la visite d’un site. Pourquoi
          utilisons-nous des cookies ? :
        </p>
        Cookies techniques : Nécessaires au fonctionnement du site. Cookies
        analytiques : Pour mesurer l’audience (ex : Google Analytics).
        <p>
          Vous pouvez désactiver les cookies via les paramètres de votre
          navigateur. En poursuivant votre navigation, vous acceptez
          l’utilisation des cookies.
        </p>
        <h2>Durée de Conservation des Données</h2>
        <ul>
          <li>
            Données de contact : Conservées 3 ans à partir du dernier contact.
          </li>
          <li>
            Données de navigation : Conservées 13 mois (durée légale pour les
            cookies analytiques).
          </li>
        </ul>
        <h2>Vos Droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
          <li> Droit d’accès : Demander une copie de vos données.</li>
          <li>
            Droit de rectification : Corriger vos données si elles sont
            inexactes.
          </li>
          <li>
            Droit à l’effacement : Demander la suppression de vos données.
          </li>
          <li>
            Droit d’opposition : Vous opposer au traitement de vos données.
          </li>
          <li>
            Droit à la portabilité : Récupérer vos données dans un format
            structuré.
          </li>
        </ul>
        <p>Pour exercer ces droits, contactez-nous à : <a href="mailto:alice@skolinvest.com">alice@skolinvest.com</a>.</p>
        <h2>Sécurité des Données</h2>
        <p>
          Nous mettons en place des mesures techniques et organisationnelles
          pour protéger vos données contre toute perte, altération ou accès non
          autorisé.
        </p>
        <h2>Modifications de la Politique de Confidentialité</h2>
        <p>
          Nous nous réservons le droit de modifier cette politique à tout
          moment. Les modifications seront publiées sur cette page et, si
          nécessaire, notifiées par e-mail.
        </p>
        <h2>Contact</h2>
        <p>
          Pour toute question concernant cette politique ou vos données
          personnelles, contactez-nous à :<a href="mailto:alice@skolinvest.com">alice@skolinvest.com</a>
        </p>
        <section>
          <h2>Données des Utilisateurs Administrateurs</h2>
          <h3>1. Types de données collectées</h3>
          <p>
            Pour les utilisateurs administrateurs (membres de l’équipe de Alice
            Goyec), nous collectons les données suivantes :
          </p>
          <ul>
            <li>
              Données d’identification : Nom, prénom, adresse e-mail,
              identifiant de connexion, mot de passe (chiffré).
            </li>
            <li>
              Données d’activité : Historique des connexions, actions effectuées
              dans le back office (création/modification de cours, gestion des
              utilisateurs, etc.).
            </li>
            <li>
              Données techniques : Adresse IP, navigateur utilisé, logs d’accès.
            </li>
          </ul>

          <h3>2. Finalités du traitement</h3>
          <p>Les données des administrateurs sont utilisées pour :</p>
          <ul>
            <li>
              Gérer les comptes administrateurs (création, authentification,
              support).
            </li>
            <li>
              Assurer la sécurité du back office (détection des accès non
              autorisés, audit des actions).
            </li>
            <li>
              Améliorer les fonctionnalités du back office (analyse des besoins,
              feedbacks).
            </li>
          </ul>

          <h3>3. Base légale</h3>
          <p>Le traitement de ces données repose sur :</p>
          <ul>
            <li>
              L’exécution d’un contrat (accès au back office pour gérer les
              cours).
            </li>
            <li>
              Notre intérêt légitime (sécurité du système, amélioration des
              outils internes).
            </li>
          </ul>

          <h3>4. Accès et partage des données</h3>
          <ul>
            <li>
              Les données des administrateurs sont accessibles uniquement à
              l’équipe technique de SkolInvest et à la cliente responsable.
            </li>

            <li>
              Elles ne sont pas partagées avec des tiers, sauf obligation
              légale.
            </li>

            <li>
              Les données sont stockées de manière sécurisée (chiffrement, accès
              restreint).
            </li>
          </ul>

          <h3>5. Durée de conservation</h3>
          <ul>
            <li>
              Les données des administrateurs sont conservées pendant la durée
              de leur accès au back office + 1 an (pour des raisons de sécurité
              et d’audit).
            </li>
            <li>
              Les logs d’activité sont conservés 6 mois (sauf obligation légale
              plus longue).
            </li>
          </ul>

          <h3>6. Sécurité renforcée</h3>
          <ul>
            <li> Authentification sécurisée. </li>
            <li>
              Accès restreint : Seuls les membres autorisés de l’équipe peuvent
              accéder au back office.
            </li>
            <li>
              Audit des actions : Les actions sensibles (suppression de cours,
              modification des données) sont loguées et traçables.
            </li>
          </ul>
          <h3>7. Droits des administrateurs</h3>
          <p>
            Les administrateurs disposent des mêmes droits que les autres
            utilisateurs (accès, rectification, effacement, etc.). Pour exercer
            ces droits, ils peuvent contacter : <a href="mailto:alice@skolinvest.com">alice@skolinvest.com</a>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}