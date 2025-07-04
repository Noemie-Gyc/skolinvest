# skolinvest
Skolinvest est une application de e-learning. Cette plateforme de e-learning s’inscrit dans un projet lancé en 2020. Elle a  pour but de démocratiser l’éducation financière avec un outil accessible, pédagogique et complet, et s’adresse à une clientèle curieuse et motivée à développer son autonomie dans la gestion de portefeuille.

# opérations asynchrones sur les routes
Si vous souhaitez rajouter une route.ts contenant des promesses et que vous n'avez pas encore travaillé sur le projet, si les promesses ne sont pas détectées du 1er coup, essayez les étapes suivantes :
- Se placer dans le container frontend  winpty docker exec -it frontend sh (sur Gitbash) ou docker exec -it frontend sh (sur Powershell)
- stasher toutes les modifs en cours : git stash --include-untracked
- télécharger le gestionnaire de package codemod : npx @next/codemod@canary next-async-request-api .
- unstash 
- régler les conflits du merge

