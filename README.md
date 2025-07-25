# skolinvest
Skolinvest est une application de e-learning. Cette plateforme de e-learning s’inscrit dans un projet lancé en 2020. Elle a  pour but de démocratiser l’éducation financière avec un outil accessible, pédagogique et complet, et s’adresse à une clientèle curieuse et motivée à développer son autonomie dans la gestion de portefeuille.

# Travailler sans connexion internet avec Docker :
Pour lancer docker en local sans internet, ça sous entend qu'on ait bien buildé l'app récemment pour
avoir localement les dernières images à jour. 

Pour lancer les containers localement, saisir cette ligne de commande  : docker-compose up.

# Dockerfile développement côté frontend :
On a retiré le build du dockerfile car :
Avec build dans l'image : Code modifié → Docker build → Création image → Démarrage conteneur (2-5 minutes à chaque changement)

Sans build (avec volumes) : Code modifié → Hot reload détecte → Rebuild à la volée (1-3 seconds). 

Dans tous les cas, le volume sera utilisé pour mettre à jour les changements et le build sera écrasé par le volume. 

# Mise à jour des images Docker distantes utilisées
Bonne pratique : afin d'être sûr que les images soient bien à jour, lancer manuellement de façon hebdomadaire la commande docker-compose build --no-cache. Notamment pour des soucis de mise à jour de sécurité sur les images distantes. 

# Mise en production avec Docker :
Il faudra créer une autre configuration Docker-compose. Exemple : docker-compose.prod.yml et également créer des fichiers dockerfile différents dans le backend et le frontend : Dockerfile.prod

