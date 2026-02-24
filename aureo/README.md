# Aureo — Assistant Financier Personnel Intelligent

> Centralisez, analysez et comprenez vos finances personnelles — sans jargon, sans complexité.

---

## Présentation

**Aureo** est une application web de gestion des finances personnelles qui centralise vos comptes, catégorise vos transactions automatiquement et vous fournit des recommandations actionnables en langage naturel.

Projet développé dans un cadre personnel / portfolio, avec une ambition de publication publique.

---

## Stack Technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Langage | TypeScript (strict) |
| Base de données | MongoDB Atlas |
| ORM | Prisma 6 |
| Auth & Sessions | JWT signé (next-auth/jwt) + HttpOnly Cookie |
| Validation | Zod 4 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Notifications | Sonner |
| État client | Zustand |

---

## Fonctionnalités Implémentées

- **Authentification** — Inscription / Connexion Email + Password (bcrypt, Zod)
- **Sessions sécurisées** — JWT HTTP-only cookie (7 jours)
- **Protection des routes** — `proxy.ts` (Next.js 16)
- **Rate limiting** — 5 tentatives / 15 min par IP
- **Verrouillage de compte** — blocage 15 min après 5 échecs consécutifs
- **Headers HTTP** — CSP, HSTS, X-Frame-Options, Referrer-Policy…
- **Toasts** — feedback utilisateur après chaque action
- **Landing page** — page d'accueil publique
- **Pages auth** — `/login`, `/register`, 404 custom

---

## Installation

### Prérequis

- Node.js 20+
- Un cluster MongoDB Atlas (gratuit)

### 1. Cloner le dépôt

```bash
git clone https://github.com/prodigelec/aureo.git
cd aureo
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
DATABASE_URL="mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/aureo"
NEXTAUTH_SECRET="une-clé-secrète-forte-en-production"
NEXTAUTH_URL="http://localhost:3000"
```

> Générer un secret fort : `openssl rand -base64 32`

### 4. Générer le client Prisma et pousser le schéma

```bash
npm run prisma:generate
npm run prisma:push
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Scripts Disponibles

```bash
npm run dev            # Serveur de développement (Turbopack)
npm run build          # Build de production
npm run start          # Démarrer en production
npm run lint           # ESLint
npm run lint:fix       # ESLint avec correction automatique
npm run format         # Prettier
npm run format:check   # Vérification Prettier
npm run prisma:generate  # Régénérer le client Prisma
npm run prisma:push      # Synchroniser le schéma avec la base de données
npm run prisma:studio    # Interface graphique Prisma Studio
```

---

## Structure du Projet

```
aureo/
├── app/
│   ├── (private)/dashboard/   # Dashboard (protégé)
│   ├── auth/actions.ts         # Server Actions : register, login, logout
│   ├── login/                  # Page de connexion
│   ├── register/               # Page d'inscription
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/
│   ├── home/                   # Composants landing page
│   └── ToastHandler.tsx        # Gestionnaire de toasts URL-based
├── lib/
│   ├── auth.ts                 # Logique register/login + lockout
│   ├── session.ts              # Gestion JWT session (cookie)
│   ├── rate-limit.ts           # Rate limiting IP
│   └── prisma.ts               # Client Prisma singleton
├── proxy.ts                    # Protection des routes privées
├── next.config.ts              # Headers HTTP de sécurité
└── prisma/schema.prisma        # Schéma base de données
```

---

## Roadmap

| Phase | Périmètre | Statut |
|---|---|---|
| Phase 1 — Fondations & Auth | Socle technique, auth, sécurité | ✅ Terminé |
| Phase 2 — Comptes & Dashboard | Gestion des comptes, vue consolidée | 🟢 En cours |
| Phase 3 — Transactions | Saisie, filtres, catégorisation auto | 🟡 Planifié |
| Phase 4 — Budgets & Alertes | Limites par catégorie, notifications | 🔴 À venir |
| Phase 5 — Rapports | Rapports mensuels, export CSV/PDF | 🔴 À venir |

---

## Licence

Projet personnel — tous droits réservés.
