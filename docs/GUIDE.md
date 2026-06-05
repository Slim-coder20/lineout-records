# Guide du projet LineOut Records

Ce document explique **chaque fichier** de l'application : son rôle, pourquoi il existe, et comment il s'articule avec le reste.

---

## Vue d'ensemble

**LineOut Records** est un site vitrine + espace admin pour un studio / label musical.

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Base de données | MongoDB Atlas via Mongoose |
| Emails | Resend |
| Auth admin | bcrypt + cookie de session |

```
Visiteur → Pages publiques (/, /about, /artistes, /contact…)
Admin    → /admin (login) → cookie → /admin/dashboard (protégé)
Contact  → formulaire → Server Action → MongoDB + email Resend
```

---

## Arborescence

```
lineout-records/
├── app/                    # Routes et pages (App Router)
│   ├── layout.tsx          # Coquille globale (navbar, footer, police)
│   ├── page.tsx            # Page d'accueil
│   ├── globals.css         # Couleurs de marque + styles formulaires
│   ├── icon.png            # Logo (favicon + images du site)
│   ├── about/              # Page « À propos »
│   ├── artistes/           # Liste + fiche artiste (données MongoDB)
│   ├── contact/            # Formulaire + page de succès
│   ├── release/            # Productions (stub, à compléter)
│   ├── admin/              # Login + dashboard protégé
│   └── actions/            # Server Actions (logique serveur)
├── components/             # Composants React réutilisables
├── lib/                    # Logique métier, DB, auth, email
├── middleware.ts           # Protection des routes /admin/*
├── public/studios/         # Images statiques du studio
├── docs/GUIDE.md           # Ce fichier
├── .env.local              # Secrets (jamais commité)
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## Configuration

### `package.json`
Liste les dépendances et scripts npm.

| Script | Commande | Rôle |
|--------|----------|------|
| `dev` | `next dev` | Serveur de développement local |
| `build` | `next build` | Compilation pour la production |
| `start` | `next start` | Lance le build en production |
| `lint` | `eslint` | Vérification du code |

**Dépendances clés :** `next`, `react`, `mongoose`, `bcryptjs`, `resend`, `slugify`.

### `next.config.ts`
Configuration Next.js. Actuellement minimal ; peut accueillir plus tard des règles `images.remotePatterns` pour optimiser les images externes.

### `tsconfig.json`
Configuration TypeScript : alias `@/*` → racine du projet, mode strict, compatibilité Next.js.

### `next-env.d.ts`
Fichier **généré automatiquement** par Next.js. Ne pas modifier.

### `.env.local` (local uniquement, gitignored)

| Variable | Rôle |
|----------|------|
| `MONGODB_URI` | Connexion à MongoDB Atlas |
| `RESEND_API_KEY` | Clé API Resend pour l'envoi d'emails |
| `MAIL_TO` | Destinataire des messages contact |
| `MAIL_FROM` | Expéditeur affiché (domaine vérifié en prod) |
| `ADMIN_EMAIL` | Email unique de l'admin |
| `ADMIN_PASSWORD_HASH` | Hash bcrypt du mot de passe admin |
| `SESSION_SECRET` | Clé pour signer le cookie de session |

> **Important :** en local, échapper les `$` du hash bcrypt :  
> `ADMIN_PASSWORD_HASH=\$2b\$12\$...`  
> Sur Vercel, coller le hash brut sans `\`.

---

## `app/` — Pages et routes

### `app/layout.tsx`
**Quoi :** mise en page racine de toute l'application.  
**Pourquoi :** évite de répéter Navbar + Footer sur chaque page. Charge la police Poppins et `globals.css`.

### `app/page.tsx`
**Quoi :** page d'accueil (`/`).  
**Pourquoi :** première vitrine du studio — hero, services, galerie photos, productions (placeholder), CTAs.  
**Données :** statiques en dur pour l'instant (services, galerie, productions).

### `app/globals.css`
**Quoi :** styles globaux Tailwind v4.  
**Pourquoi :** définit la palette `brand-*` (couleurs LineOut) et la classe `.form-field` partagée par tous les formulaires.

### `app/about/page.tsx`
**Quoi :** page « À propos » (`/about`).  
**Pourquoi :** présente l'histoire, les valeurs et l'équipe du studio. Contenu statique + SEO (`metadata`).

### `app/artistes/page.tsx`
**Quoi :** liste des artistes (`/artistes`).  
**Pourquoi :** affiche le roster depuis MongoDB via `getArtists()`.  
**Note :** `dynamic = "force-dynamic"` → la page est toujours rendue côté serveur à la demande (données fraîches).

### `app/artistes/[slug]/page.tsx`
**Quoi :** fiche d'un artiste (`/artistes/slim-abida` par ex.).  
**Pourquoi :** route dynamique basée sur le `slug` généré automatiquement à la création en base.  
**Fonctions :** `generateMetadata` (titre SEO), `notFound()` si slug inconnu.

### `app/contact/page.tsx`
**Quoi :** formulaire de contact (`/contact`).  
**Pourquoi :** Server Component qui délègue l'envoi à `submitContact` via `action={submitContact}`.

### `app/contact/success/page.tsx`
**Quoi :** confirmation après envoi (`/contact/success`).  
**Pourquoi :** feedback utilisateur après redirection de l'action contact.

### `app/release/page.tsx`
**Quoi :** page productions (`/release`) — **stub**.  
**Pourquoi :** placeholder en attendant le modèle MongoDB `Production` et le CRUD admin.

### `app/admin/page.tsx`
**Quoi :** page de connexion admin (`/admin`).  
**Pourquoi :** formulaire email/mot de passe branché sur `loginAdmin`. Affiche les erreurs via `?error=...` dans l'URL.

### `app/admin/dashboard/page.tsx`
**Quoi :** tableau de bord admin (`/admin/dashboard`).  
**Pourquoi :** page protégée par le middleware ; point d'entrée futur pour gérer artistes et productions. Bouton déconnexion via `logoutAdmin`.

---

## `app/actions/` — Server Actions

Les Server Actions s'exécutent **uniquement sur le serveur** (`"use server"`). Elles reçoivent un `FormData`, traitent la logique, puis `redirect()`.

### `app/actions/contact.ts` — `submitContact`
1. Lit et valide les champs du formulaire contact
2. Enregistre le message dans MongoDB (`Contact`)
3. Envoie un email via Resend
4. Redirige vers `/contact/success` ou `?error=...`

### `app/actions/auth.ts` — `loginAdmin` / `logoutAdmin`
1. Compare l'email avec `ADMIN_EMAIL`
2. Vérifie le mot de passe avec `bcrypt.compare` et `ADMIN_PASSWORD_HASH`
3. Crée ou supprime le cookie de session
4. Redirige vers dashboard ou login

---

## `middleware.ts`

**Quoi :** intercepte les requêtes vers `/admin/*` **avant** le rendu des pages.  
**Pourquoi :** protéger le dashboard sans vérifier l'auth dans chaque page.

| Situation | Comportement |
|-----------|--------------|
| Non connecté + `/admin/dashboard` | → redirection `/admin` |
| Connecté + `/admin` | → redirection `/admin/dashboard` |
| Connecté + `/admin/dashboard` | accès autorisé |

Le `matcher` limite le middleware à `/admin/:path*` uniquement.

---

## `components/` — Composants réutilisables

### `Navbar.tsx` (`"use client"`)
Barre de navigation fixe avec menu burger mobile. Client Component car il gère l'état `open/closed` du menu.

### `Footer.tsx`
Pied de page : logo, liens de navigation, `SocialLinks`, copyright.

### `CtaButton.tsx`
Bouton-lien stylé (primary / secondary / outline). Utilisé pour les appels à l'action sur les pages.

### `SocialLinks.tsx`
Icônes Instagram et Facebook. Lit les URLs depuis `lib/config/socialLinks.ts`.

### `ArtistImage.tsx`
Affiche une image d'artiste : `next/image` si URL locale (`/...`), balise `<img>` si URL externe (Cloudinary, etc.).

### `RequestTypeSelect.tsx` (`"use client"`)
Liste déroulante custom pour le type de demande contact (infos / devis). Client Component car interactif ; envoie la valeur via `<input type="hidden" name="requestType">`.

---

## `lib/` — Logique métier

### `lib/auth/session.ts`
Gestion du cookie `admin_session` :
- `createSession()` — pose le cookie après login
- `getSession()` — vérifie si l'utilisateur est connecté (pages serveur)
- `deleteSession()` — supprime le cookie à la déconnexion
- `isValidSessionToken()` — compare le cookie au jeton HMAC-SHA256 dérivé de `SESSION_SECRET`

**Pourquoi un jeton et pas le mot de passe dans le cookie ?** Le cookie prouve seulement « session valide », sans exposer le mot de passe.

### `lib/utils/connectToDB.ts`
Connexion Mongoose à MongoDB. Réutilise la connexion existante en dev (hot reload) pour éviter trop de connexions simultanées.

### `lib/models/artists.ts`
Schéma Mongoose `Artists` : `name`, `description`, `image`, `slug`.  
Hook `pre("save")` : génère automatiquement le `slug` depuis le nom (avec gestion des doublons).

### `lib/models/contact.ts`
Schéma Mongoose `Contact` : messages du formulaire (`name`, `email`, `requestType`, `message`).

### `lib/data/artists.ts`
Couche d'accès aux données artistes :
- `getArtists()` — liste triée par nom
- `getArtistBySlug(slug)` — un artiste ou `null`

Transforme les documents MongoDB en `ArtistDTO` (objets simples sans méthodes Mongoose).

### `lib/types/artist.ts`
Types TypeScript partagés : `ArtistDTO` (utilisé), `ProductionDTO` (prévu pour les releases).

### `lib/config/socialLinks.ts`
URLs des réseaux sociaux du label. Un seul endroit à modifier si les liens changent.

### `lib/mail/sendContactEmail.ts`
Envoie l'email de notification via l'API Resend quand un contact est soumis.

---

## Flux de données

### Contact
```
Formulaire /contact
    → submitContact (Server Action)
        → connectToDB()
        → Contact.create()      (MongoDB)
        → sendContactEmail()  (Resend)
    → redirect /contact/success
```

### Auth admin
```
Formulaire /admin
    → loginAdmin (Server Action)
        → vérif email + bcrypt
        → createSession()     (cookie httpOnly)
    → redirect /admin/dashboard

Chaque requête /admin/*
    → middleware
        → isValidSessionToken()
    → accès ou redirection
```

### Artistes
```
/artistes
    → getArtists()
        → connectToDB() → Artists.find()

/artistes/[slug]
    → getArtistBySlug(slug)
        → connectToDB() → Artists.findOne({ slug })
```

---

## `public/`

Dossier des fichiers servis tels quels (images studio, etc.).  
Les URLs commencent par `/` : `/studios/studio_2.png`.

---

## Prochaines étapes prévues

1. CRUD admin pour les artistes (créer / modifier / supprimer)
2. Modèle `Production` + page `/release` dynamique
3. Brancher les productions de la home sur MongoDB
4. Domaine email vérifié chez Resend + variables Vercel en production

---

## Commandes utiles

```bash
# Développement
npm run dev

# Générer un hash bcrypt (une fois, en local)
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('VOTRE_MOT_DE_PASSE', 12).then(console.log)"

# Générer un SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
