# LineOut Records

Site vitrine et espace d'administration pour le studio / label **LineOut Records**.

- **Framework :** Next.js 16 (App Router), React 19, Tailwind CSS v4
- **Base de données :** MongoDB Atlas (Mongoose)
- **Emails :** Resend
- **Auth admin :** bcrypt + cookie de session

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Copier `.env.local` avec les variables nécessaires (voir `docs/GUIDE.md`).

## Documentation du projet

**Guide complet fichier par fichier :** [`docs/GUIDE.md`](docs/GUIDE.md)

Chaque fichier source contient aussi un en-tête en commentaire expliquant son rôle.

## Routes principales

| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/about` | À propos |
| `/artistes` | Liste des artistes (MongoDB) |
| `/artistes/[slug]` | Fiche artiste |
| `/release` | Productions (à compléter) |
| `/contact` | Formulaire de contact |
| `/admin` | Connexion admin |
| `/admin/dashboard` | Tableau de bord (protégé) |

## Déploiement

Déploiement prévu sur [Vercel](https://vercel.com). Configurer les variables d'environnement sur le dashboard Vercel (voir `docs/GUIDE.md`).
