# skolinvest
Skolinvest est une application de e-learning. Cette plateforme de e-learning s’inscrit dans un projet lancé en 2020. Elle a  pour but de démocratiser l’éducation financière avec un outil accessible, pédagogique et complet, et s’adresse à une clientèle curieuse et motivée à développer son autonomie dans la gestion de portefeuille.

# Gestion des dépendances. 
Par exemple, si vous ajoutez un component Shadcn, vous devrez faire : 
```
npm install @radix-ui/react-dropdown-menu
```
Soit vous le faites dans votre container frontend soit localement directement dans le projet Front/my-front_app. Cependant, pour la personne qui récupère le projet, toutes ces dépendances ne seront pas à jour car les nodes_modules sont dans le gitignore. Ainsi, quand on clone le projet ou met à jour sa branche et que de nombreux changements ont eu lieu, il faut faire un ```npm install``` et normalement il ne devrait pas y avoir de bugs si la personne souhaite utiliser ces composants et les afficher dans le navigateur.

Si vraiment des erreurs persistent, la commande suivante supprime tous vos nodes_modules : 
```
rm -rf node_modules
```  
Ensuite vous pouvez refaire celle-ci pour être bien à jour.  
```
npm install
``` 

La commande npm ci à priori supprime les nodes_module, puis réinstalle les packages selon le package-lock-json.

# Travailler sans connexion internet avec Docker :
Pour lancer docker en local sans internet, ça sous entend qu'on ait bien buildé l'app récemment pour
avoir localement les dernières images à jour. 

Pour lancer les containers localement, saisir cette ligne de commande  : 
```
docker-compose up
```

# Dockerfile développement côté frontend :
On a retiré le build du dockerfile car :
Avec build dans l'image : Code modifié → Docker build → Création image → Démarrage conteneur (2-5 minutes à chaque changement)

Sans build (avec volumes) : Code modifié → Hot reload détecte → Rebuild à la volée (1-3 seconds). 

Dans tous les cas, le volume sera utilisé pour mettre à jour les changements et le build sera écrasé par le volume. 

# Mise à jour des images Docker distantes utilisées
Bonne pratique : afin d'être sûr que les images soient bien à jour, lancer manuellement de façon hebdomadaire cette commande notamment pour des soucis de mise à jour de sécurité sur les images distantes : 
```
docker-compose build --no-cache
```

# Mise en production avec Docker :
Il faudra créer une autre configuration Docker-compose. Exemple : docker-compose.prod.yml et également créer des fichiers dockerfile différents dans le backend et le frontend : Dockerfile.prod


# opérations asynchrones sur les routes
Si vous souhaitez rajouter une route.ts contenant des promesses et que vous n'avez pas encore travaillé sur le projet, si les promesses ne sont pas détectées du 1er coup, essayez les étapes suivantes :
- Se placer dans le container frontend
```
<span style="color:green">Gitbash</span>
winpty docker exec -it frontend sh
```
ou
```
<span style="color:green">Powershell</span>
docker exec -it frontend sh
```
- stasher toutes les modifs en cours :
```git stash --include-untracked```
- télécharger le gestionnaire de package codemod :
```npx @next/codemod@canary next-async-request-api```
- unstash 
- régler les conflits du merge

# Problème de modules non reconnus 
Parfois, lorsque l'on souhaite rajouter un composant. Par exemple, une boîte de dialog via shadcn. L'import dans le composant React n'est pas reconnu malgré la présence de la dépendance dans le package.json. Dans ce cas, la solution est de supprimer les nodes modules sur la machine locale. 

S'il y a la présence d'un dossier Node modules dans le dossier FRONT, lancer la commande suivante :
```
rm -rf FRONT/node_modules
```
Ensuite supprimer l'autre dossier Node modules présent dans my_front_app : 
```
rm -rf my_front_app/node_modules
```

Une fois les dossiers supprimés, réinstaller les dépendances en lançant toujours localement dans le dossier my_front_app :
```
npm install en se positionnant
```

