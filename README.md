# Cloud Lab - Démonstration PaaS (EMSI Rabat)
Application web Node.js illustrant le modèle PaaS avec déploiement automatique sur Coolify.

## Démarrage local
Installez les dépendances avec `npm install` puis démarrez l'application avec `npm start`.

## Routes disponibles
- `GET /` : page web récapitulative (informations système et bénéfices du PaaS)
- `GET /api/info` : métadonnées d'exécution au format JSON
- `GET /health` : vérification de l'état de santé du service (`{"status":"ok"}`)

