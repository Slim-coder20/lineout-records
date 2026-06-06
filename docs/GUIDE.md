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
Visiteur → Pages publiques (/, /about, /artistes, /release, /contact…)
Admin    → lien « Admin » (navbar/footer) ou /admin → login → cookie → espace protégé
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
│   ├── release/            # Liste publique des productions (MongoDB)
│   ├── admin/              # Login + espace protégé (route group)
│   │   ├── page.tsx        # Connexion (/admin)
│   │   └── (protected)/    # NavbarAdmin + CRUD
│   └── actions/            # Server Actions (logique serveur)
├── components/             # Composants React réutilisables
│   ├── Navbar.tsx          # Navigation publique (+ lien Admin)
│   ├── NavbarAdmin.tsx     # Navigation admin + déconnexion
│   └── SiteChrome.tsx      # Masque navbar/footer sur /admin/*
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
**Pourquoi :** charge la police Poppins et `globals.css`. Délègue l'affichage navbar/footer à `SiteChrome`.

### `components/SiteChrome.tsx`
**Quoi :** enveloppe conditionnelle autour du contenu public.  
**Pourquoi :** sur `/admin` et `/admin/*`, masque la navbar et le footer publics pour laisser place à `NavbarAdmin` (layout `(protected)`).

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
**Quoi :** page productions publique (`/release`).  
**Pourquoi :** affiche la discographie depuis MongoDB via `getProductions()`.  
**Données :** `ProductionDTO` avec `artistName` et `artistSlug` pour le lien vers la fiche artiste.

### `app/admin/page.tsx`
**Quoi :** page de connexion admin (`/admin`).  
**Pourquoi :** formulaire email/mot de passe branché sur `loginAdmin`. Accessible via le lien « Admin » dans la navbar et le footer (desktop et mobile).

### `app/admin/(protected)/layout.tsx`
**Quoi :** layout commun aux pages admin protégées.  
**Pourquoi :** affiche `NavbarAdmin` une seule fois pour dashboard, artistes et productions.

### `app/admin/(protected)/dashboard/page.tsx`
**Quoi :** tableau de bord admin (`/admin/dashboard`).  
**Pourquoi :** vue d'ensemble — compteurs, liste des artistes et des releases avec liens vers le site public et les pages CRUD.

### `app/admin/(protected)/artistes/page.tsx`
**Quoi :** CRUD artistes (`/admin/artistes`).  
**Pourquoi :** créer, modifier et supprimer les artistes du roster via `app/actions/artists.ts`.

### `app/admin/(protected)/productions/page.tsx`
**Quoi :** CRUD productions (`/admin/productions`).  
**Pourquoi :** créer, modifier et supprimer les releases via `app/actions/productions.ts`.

---

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

### `app/actions/artists.ts` — `createArtist` / `updateArtist` / `deleteArtist`
1. Valide les champs (name, description, image)
2. Écrit en base via Mongoose (`Artists`)
3. `revalidatePath` sur `/artistes` et `/admin/artistes`
4. Redirige avec `?success=` ou `?error=`

### `app/actions/productions.ts` — `createProduction` / `updateProduction` / `deleteProduction`
1. Valide les champs et le type (`single`, `ep`, `album`…)
2. Lie la production à un artiste existant (`ObjectId`)
3. `revalidatePath` sur `/release` et `/admin/productions`
4. Redirige avec `?success=` ou `?error=`

---

## `middleware.ts`

**Quoi :** intercepte les requêtes vers `/admin/*` **avant** le rendu des pages.  
**Pourquoi :** protéger le dashboard sans vérifier l'auth dans chaque page.

| Situation | Comportement |
|-----------|--------------|
| Non connecté + `/admin/dashboard` (ou artistes, productions) | → redirection `/admin` |
| Connecté + `/admin` | → redirection `/admin/dashboard` |
| Connecté + routes `(protected)` | accès autorisé |

Le `matcher` limite le middleware à `/admin/:path*` uniquement.

---

## `components/` — Composants réutilisables

### `Navbar.tsx` (`"use client"`)
Barre de navigation publique avec menu burger mobile. Inclut un lien **Admin** (`/admin`) visible en desktop et dans le menu mobile pour accéder à l'espace d'administration sans taper l'URL.

### `NavbarAdmin.tsx` (`"use client"`)
Barre de navigation de l'espace admin : Tableau de bord, Artistes, Productions.  
**Déconnexion :** bouton `logoutAdmin` dans la barre (desktop) et en bas du menu burger (mobile), via un composant `LogoutButton` avec styles différents selon `mobile ? … : …`.

### `Footer.tsx`
Pied de page : logo, liens de navigation (dont **Admin**), `SocialLinks`, copyright.

### `SiteChrome.tsx` (`"use client"`)
Masque navbar et footer publics sur les routes `/admin/*` pour éviter une double navigation.

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

### `lib/models/productions.ts`
Schéma Mongoose `Productions` : `title`, `artist` (ref Artists), `description`, `type`, `releaseDate`, `genre`, `image`.

### `lib/data/artists.ts`
Couche d'accès aux données artistes :
- `getArtists()` — liste triée par nom
- `getArtistBySlug(slug)` — un artiste ou `null`

Transforme les documents MongoDB en `ArtistDTO` (objets simples sans méthodes Mongoose).

### `lib/data/productions.ts`
Couche d'accès aux productions :
- `getProductions()` — liste triée par date de sortie (`.populate("artist", "name slug")`)

Retourne des `ProductionDTO` avec `artistName` et `artistSlug` pour l'affichage public (`/release`).

### `lib/types/artist.ts`
Types TypeScript : `ArtistDTO`.

### `lib/types/production.ts`
Types TypeScript : `ProductionDTO`, `ProductionType`, constante `PRODUCTION_TYPES`.

### `lib/config/productionTypes.ts`
Libellés affichables des types de release (Single, EP, Album…).

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

/release
    → getProductions()
        → connectToDB() → Productions.find().populate("artist")
```

### Productions (admin → site public)
```
Formulaire /admin/productions
    → createProduction / updateProduction / deleteProduction
        → connectToDB() → Productions
    → revalidatePath("/release")
    → visible sur /release après création
```

---

## `public/`

Dossier des fichiers servis tels quels (images studio, etc.).  
Les URLs commencent par `/` : `/studios/studio_2.png`.

---

## Prochaines étapes prévues

1. Brancher les productions de la home sur MongoDB (au lieu des données statiques)
2. Upload d'images (Cloudinary ou stockage local) depuis l'admin
3. Confirmation avant suppression en admin
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