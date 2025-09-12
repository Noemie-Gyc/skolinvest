import PublicHeader from "@/components/publicHeader";
import Footer from "@/components/footer";

export default function Page() {
  return (
    <>
      <a
        href="/#privacy-policy"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-black focus:text-white rounded"
      >
        Aller au contenu principal
      </a>
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
        <PublicHeader />
      </header>

      <main>
        <h1 id="privacy-policy">POLITIQUE DE COINFIDENTIALITE</h1>
        <h2>Introduction</h2>
        <p>
          SkolInvest, édité par Noémie Goyec et Caroline Cirier, s’engage à
          protéger la vie privée et les données personnelles de ses
          utilisateurs. Cette Politique de Confidentialité explique comment nous
          collectons, utilisons, partageons et protégeons les informations que
          vous nous fournissez lorsque vous utilisez notre site
          https://www.skolinvest.com. En utilisant notre site, vous acceptez les
          pratiques décrites dans cette politique.
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
          cookies pour améliorer votre expérience et analyser le trafic (voir notre 
          section "Cookies").
        </p>
        <h3>2.2. Données fournies volontairement</h3>
        <p>
          Formulaire d'inscription à notre newsletter : Si vous nous contactez via le formulaire, nous
          collectons votre nom, prénom et adresse e-mail.
        </p>
        <h2>Finalités de la Collecte</h2>
        <p>
          Les données collectées sont utilisées pour : 
          Vous envoyer notre newsletter (si vous y avez souscrit dans notre formulaire d'inscription). 
        </p>
        <h2>Base Légale du Traitement</h2>
        <p>Le traitement de vos données repose sur :</p>
        <ul>
          <li>
            Votre consentement (pour les cookies et le formulaire d'inscription à notre newsletter).
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
          <li>Données de contact : Conservées 3 ans à partir du dernier contact.</li>
          <li>Données de navigation : Conservées 13 mois (durée légale pour les
          cookies analytiques).</li>
        </ul>
        <h2>Vos Droits</h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul>
            <li> Droit d’accès : Demander une copie de vos données.</li>
            <li>Droit de rectification : Corriger vos données si elles sont inexactes.</li>
            <li>Droit à l’effacement : Demander la suppression de vos données. </li>
            <li>Droit d’opposition : Vous opposer au traitement de vos données.</li>
            <li>Droit à la portabilité : Récupérer vos données dans un format structuré.</li>
        </ul>
          
        <p>Pour exercer ces droits, contactez-nous à : alice@skolinvest.com.</p>
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
          personnelles, contactez-nous à :alice@skolinvest.com
        </p>
      </main>

      <Footer />
    </>
  );
}