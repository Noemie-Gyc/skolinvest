# Utiliser l'image officielle Node.js comme base
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de votre projet Next.js
COPY . /app/

# Installer les dépendances
RUN npm install

# Construire l'application Next.js pour la production
RUN npm run build

# Exposer le port pour Next.js
EXPOSE 3000

# Commande pour démarrer Next.js
CMD ["npm", "start"]