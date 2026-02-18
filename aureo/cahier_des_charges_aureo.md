# Cahier des Charges — Aureo

![Logo Aureo](public/logo_aureo.png)

### Assistant Financier Personnel Intelligent

> **Version** `2.0.0` · **Statut** `En développement` · **Contexte** `Projet personnel / Portfolio` · **Dernière mise à jour** `Février 2026`

---

## Table des Matières

1. [Présentation du Projet](#1-présentation-du-projet)
2. [Analyse du Marché & Positionnement](#2-analyse-du-marché--positionnement)
3. [Personas Utilisateurs](#3-personas-utilisateurs)
4. [User Stories & Cas d'Usage](#4-user-stories--cas-dusage)
5. [Fonctionnalités & Roadmap](#5-fonctionnalités--roadmap)
6. [Architecture Technique](#6-architecture-technique)
7. [Design & Expérience Utilisateur](#7-design--expérience-utilisateur)
8. [Modèle Économique & Monétisation](#8-modèle-économique--monétisation)
9. [Exigences Non-Fonctionnelles](#9-exigences-non-fonctionnelles)
10. [Itération Courante — Phase 1](#10-itération-courante--phase-1)
11. [Glossaire](#11-glossaire)

---

## 1. Présentation du Projet

### 1.1 Contexte & Genèse

La gestion des finances personnelles reste un sujet sous-outillé pour la majorité des particuliers français. Les solutions existantes sont soit trop complexes (outils professionnels), soit trop superficielles (simples agrégateurs bancaires sans analyse). Aureo naît de ce constat : il n'existe pas d'outil simple, intelligent et respectueux de la vie privée qui aide concrètement à prendre de meilleures décisions financières au quotidien.

Ce projet est développé dans un cadre personnel et portfolio, avec une ambition de publication publique à terme.

### 1.2 Vision

> Donner à chacun la clarté et la sérénité nécessaires pour piloter ses finances personnelles — sans avoir besoin d'être expert en comptabilité.

### 1.3 Mission

Aureo centralise, analyse et explique les finances d'un utilisateur en langage naturel. Chaque donnée présentée est accompagnée d'un contexte et d'une recommandation actionnable.

### 1.4 Proposition de Valeur Unique

| Problème utilisateur                       | Solution Aureo                                             |
| ------------------------------------------ | ---------------------------------------------------------- |
| Finances éparpillées sur plusieurs banques | Agrégation multi-comptes en un seul tableau de bord        |
| Catégorisation manuelle fastidieuse        | Moteur de catégorisation automatique et apprenant          |
| Graphiques sans explication                | Chaque insight est accompagné d'une recommandation claire  |
| Méfiance vis-à-vis des données bancaires   | Architecture Zero Trust, données chiffrées, aucune revente |

### 1.5 Périmètre du Projet

**Inclus dans le périmètre :**

- Application web responsive (desktop-first, mobile-ready)
- Authentification sécurisée (Email/Password + OAuth Google)
- Agrégation manuelle de comptes bancaires
- Suivi des transactions et catégorisation automatique
- Dashboard synthétique et rapports mensuels
- Système de budgets par catégorie

**Hors périmètre (v1) :**

- Application mobile native (iOS/Android)
- Intégration Open Banking / DSP2 (agrégation automatique)
- Conseiller financier humain intégré
- Gestion de portefeuilles d'investissement

---

## 2. Analyse du Marché & Positionnement

### 2.1 Paysage Concurrentiel

| Outil              | Points Forts                   | Points Faibles                           | Différence Aureo                     |
| ------------------ | ------------------------------ | ---------------------------------------- | ------------------------------------ |
| **Bankin'**        | Agrégation bancaire DSP2       | UX datée, monétisation agressive         | Insights expliqués, UI moderne       |
| **Linxo**          | Fiable, bien établi            | Peu d'analyse, interface froide          | Recommandations actionnables         |
| **Finary**         | Belle UI, investissements      | Orienté patrimoine, pas budget quotidien | Focus budget & dépenses courantes    |
| **YNAB**           | Méthodologie budgétaire solide | Complexe, en anglais, payant             | Simplicité, français natif, freemium |
| **Excel / Notion** | Flexibilité totale             | Aucune automatisation                    | Zéro saisie manuelle                 |

### 2.2 Positionnement Cible

Aureo se positionne sur le segment **"assistant financier simple et intelligent"** — entre l'agrégateur passif (Linxo) et le gestionnaire de patrimoine (Finary). La cible est le particulier qui veut comprendre et maîtriser ses dépenses quotidiennes sans formation préalable.

---

## 3. Personas Utilisateurs

### Persona 1 — Lucas, 27 ans · Le Jeune Actif Débordé

```
Profession   : Développeur web en CDI (Paris)
Revenus      : 2 800 € net/mois
Situation    : Locataire, célibataire
Appareils    : MacBook Pro, iPhone
Tech level   : Élevé
```

**Frustrations :**

- Il a 3 comptes bancaires différents (compte courant, livret A, néobanque) et aucune vision globale
- Il dépense trop en restaurants et abonnements sans s'en rendre compte
- Il a essayé des spreadsheets mais abandonne après 2 semaines

**Objectifs :**

- Savoir exactement où part son argent chaque mois
- Mettre de côté 300 €/mois sans effort conscient
- Recevoir une alerte avant d'être à découvert

**Citation typique :** _"Je gagne bien ma vie mais je ne sais jamais combien il me reste à la fin du mois."_

**Usage attendu d'Aureo :** Quotidien, sur desktop au bureau et mobile en mobilité. Veut des notifications push et un résumé hebdomadaire.

---

### Persona 2 — Sophie, 34 ans · La Mère de Famille Organisée

```
Profession   : Responsable marketing (Lyon)
Revenus      : 3 400 € net/mois (foyer : 5 800 €)
Situation    : Propriétaire, mariée, 2 enfants
Appareils    : PC Windows, Samsung Galaxy
Tech level   : Intermédiaire
```

**Frustrations :**

- Les finances du foyer sont gérées par son mari, elle veut plus de transparence
- Les dépenses des enfants (école, activités, vêtements) sont difficiles à anticiper
- Elle ne comprend pas les rapports de sa banque

**Objectifs :**

- Avoir une vision claire des dépenses du foyer par catégorie
- Planifier les grosses dépenses annuelles (vacances, rentrée scolaire)
- Expliquer simplement la situation financière à son conjoint

**Citation typique :** _"J'ai l'impression qu'on dépense beaucoup mais je ne sais pas exactement où."_

**Usage attendu d'Aureo :** Hebdomadaire, sur desktop. Veut des rapports clairs à partager, pas de jargon financier.

---

### Persona 3 — Mehdi, 23 ans · L'Étudiant en Fin de Mois

```
Profession   : Étudiant en master (Bordeaux)
Revenus      : 900 € (alternance)
Situation    : Locataire en colocation
Appareils    : PC portable, Android
Tech level   : Élevé
```

**Frustrations :**

- Son budget est très serré et la moindre dépense imprévue déséquilibre tout
- Il oublie les prélèvements automatiques (abonnements, assurances)
- Il n'a pas de solution gratuite vraiment utile

**Objectifs :**

- Savoir en temps réel combien il peut encore dépenser cette semaine
- Anticiper les prélèvements du mois
- Économiser pour un projet voyage

**Citation typique :** _"J'ai besoin de savoir si je peux me permettre de sortir ce soir."_

**Usage attendu d'Aureo :** Quotidien, principalement mobile. Très sensible à la gratuité de l'offre.

---

## 4. User Stories & Cas d'Usage

> Format : **En tant que** [persona], **je veux** [action], **afin de** [bénéfice].  
> Priorité : 🔴 Critique · 🟡 Important · 🟢 Nice-to-have

### 4.1 Authentification & Onboarding

| #     | User Story                                                                                                                                                                            | Persona | Priorité |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| US-01 | En tant que nouvel utilisateur, je veux créer un compte avec mon email et un mot de passe, afin d'accéder à l'application de façon sécurisée.                                         | Tous    | 🔴       |
| US-02 | En tant que nouvel utilisateur, je veux me connecter via mon compte Google, afin de ne pas avoir à mémoriser un mot de passe supplémentaire.                                          | Lucas   | 🔴       |
| US-03 | En tant qu'utilisateur, je veux être guidé par un onboarding en 3 étapes (ajout de compte, première transaction, premier budget), afin de comprendre rapidement la valeur de l'outil. | Sophie  | 🟡       |
| US-04 | En tant qu'utilisateur, je veux pouvoir réinitialiser mon mot de passe par email, afin de ne pas être bloqué si je l'oublie.                                                          | Tous    | 🔴       |

### 4.2 Gestion des Comptes Bancaires

| #     | User Story                                                                                                                                             | Persona       | Priorité |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- | -------- |
| US-05 | En tant qu'utilisateur, je veux ajouter un compte bancaire manuellement (nom, type, solde), afin d'avoir une base de départ même sans synchronisation. | Tous          | 🔴       |
| US-06 | En tant qu'utilisateur, je veux voir le solde consolidé de tous mes comptes sur une seule page, afin d'avoir une vision globale instantanée.           | Lucas, Sophie | 🔴       |
| US-07 | En tant qu'utilisateur, je veux archiver un compte que je n'utilise plus, afin de garder mon dashboard propre sans perdre l'historique.                | Sophie        | 🟡       |

### 4.3 Transactions & Catégorisation

| #     | User Story                                                                                                                                             | Persona | Priorité |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | -------- |
| US-08 | En tant qu'utilisateur, je veux ajouter une transaction manuellement (montant, date, description, compte), afin de saisir mes dépenses en temps réel.  | Mehdi   | 🔴       |
| US-09 | En tant qu'utilisateur, je veux que mes transactions soient automatiquement catégorisées (alimentation, transport, loisirs…), afin de gagner du temps. | Lucas   | 🔴       |
| US-10 | En tant qu'utilisateur, je veux corriger la catégorie d'une transaction, afin d'améliorer la précision de l'analyse.                                   | Sophie  | 🔴       |
| US-11 | En tant qu'utilisateur, je veux filtrer mes transactions par période, catégorie et compte, afin de trouver rapidement une dépense précise.             | Sophie  | 🟡       |
| US-12 | En tant qu'utilisateur, je veux rechercher une transaction par mot-clé, afin de retrouver un achat spécifique.                                         | Lucas   | 🟡       |

### 4.4 Budget & Alertes

| #     | User Story                                                                                                                                                  | Persona       | Priorité |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| US-13 | En tant qu'utilisateur, je veux définir un budget mensuel par catégorie, afin de fixer des limites de dépenses claires.                                     | Sophie, Mehdi | 🔴       |
| US-14 | En tant qu'utilisateur, je veux recevoir une alerte quand j'atteins 80% de mon budget sur une catégorie, afin d'anticiper le dépassement.                   | Mehdi         | 🔴       |
| US-15 | En tant qu'utilisateur, je veux voir en temps réel le budget restant pour chaque catégorie ce mois-ci, afin de décider si je peux me permettre une dépense. | Mehdi         | 🔴       |

### 4.5 Analyse & Rapports

| #     | User Story                                                                                                                                             | Persona | Priorité |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | -------- |
| US-16 | En tant qu'utilisateur, je veux voir un rapport mensuel résumant mes revenus, dépenses et épargne, afin de comprendre ma situation financière globale. | Sophie  | 🟡       |
| US-17 | En tant qu'utilisateur, je veux comparer mes dépenses par catégorie entre deux mois, afin d'identifier des tendances.                                  | Lucas   | 🟡       |
| US-18 | En tant qu'utilisateur, je veux voir une prévision de mon solde en fin de mois basée sur mes habitudes, afin d'anticiper les tensions de trésorerie.   | Mehdi   | 🟢       |

---

## 5. Fonctionnalités & Roadmap

### 5.1 Vue d'Ensemble

| Statut          | Phase                                   | Périmètre                                     | Délai estimé |
| --------------- | --------------------------------------- | --------------------------------------------- | ------------ |
| 🟢 **En cours** | Phase 1 — Fondations & Auth             | Socle technique, authentification, schéma BDD | 2 semaines   |
| 🟡 **Planifié** | Phase 2 — Comptes & Dashboard           | Gestion des comptes, vue consolidée           | 2 semaines   |
| 🔴 **À venir**  | Phase 3 — Transactions & Catégorisation | Saisie, filtres, moteur de catégorisation     | 3 semaines   |
| 🔴 **À venir**  | Phase 4 — Budgets & Alertes             | Limites par catégorie, notifications          | 2 semaines   |
| 🔴 **À venir**  | Phase 5 — Analyse & Rapports            | Rapports mensuels, comparaisons, export       | 3 semaines   |

---

### Phase 1 — Fondations & Authentification

#### 1.1 Initialisation du Projet

- Configuration Next.js 16, TypeScript Strict, Tailwind CSS 4, ESLint + Prettier
- Configuration Prisma avec connecteur MongoDB
- Mise en place des variables d'environnement (`.env.local`)
- Clean start : suppression des fichiers de démo Next.js

#### 1.2 Système d'Authentification

- Inscription avec Email & Password (hashage bcrypt, validation Zod)
- Connexion via OAuth Google (Auth.js v5)
- Session sécurisée via **HttpOnly Cookies** (JWT)
- Middleware de protection des routes privées (`/dashboard/**`)
- Page de réinitialisation du mot de passe par email

#### 1.3 Schéma de Base de Données Initial

- `User` : `id`, `email`, `password`, `name`, `image`, `createdAt`, `updatedAt`
- `Account` (OAuth) : conformité Auth.js, relation vers `User`
- `Session`, `VerificationToken` : requis par Auth.js

---

### Phase 2 — Agrégation Bancaire & Dashboard

#### 2.1 Gestion des Comptes

- Création d'un compte : nom, type (courant, épargne, livret…), devise, solde initial
- Édition et archivage d'un compte
- Calcul du solde total consolidé

#### 2.2 Dashboard Synthétique

- Carte de solde total (tous comptes confondus)
- Liste des comptes avec solde individuel
- Bloc "Dernières transactions" (5 entrées)
- Bloc "Dépenses du mois en cours" (total + répartition rapide)

---

### Phase 3 — Transactions & Catégorisation

#### 3.1 Flux de Transactions

- Ajout manuel : montant, type (débit/crédit), date, description, compte, catégorie
- Liste paginée (20 items/page)
- Filtres : période, compte, catégorie, type
- Recherche plein texte sur la description
- Édition et suppression d'une transaction

#### 3.2 Moteur de Catégorisation

- Catégories prédéfinies : Alimentation, Transport, Logement, Santé, Loisirs, Shopping, Abonnements, Revenus, Épargne, Autres
- Algorithme de suggestion basé sur les mots-clés de la description
- Apprentissage : si l'utilisateur recatégorise une transaction, le système mémorise la règle
- Règles personnalisées : l'utilisateur peut créer ses propres règles ("si description contient X → catégorie Y")

---

### Phase 4 — Budgets & Alertes

#### 4.1 Budgets Mensuels

- Définition d'un budget par catégorie pour chaque mois
- Vue "Enveloppes" : budget alloué vs. dépensé vs. restant
- Reconduite automatique du budget du mois précédent (optionnel)

#### 4.2 Système d'Alertes

- Alerte à 80% du budget atteint (notification in-app)
- Alerte à 100% du budget atteint
- Résumé hebdomadaire de la situation budgétaire (email optionnel)

---

### Phase 5 — Analyse & Rapports

#### 5.1 Rapports Mensuels

- Revenus vs. dépenses vs. épargne du mois
- Répartition des dépenses par catégorie (avec explication textuelle)
- Comparaison avec le mois précédent (variation en % et en valeur)

#### 5.2 Indicateurs Clés

- Taux d'épargne mensuel
- Catégorie de dépense la plus importante
- Transaction la plus élevée du mois

#### 5.3 Export

- Export CSV des transactions (avec filtres appliqués)
- Export PDF du rapport mensuel

---

## 6. Architecture Technique

### 6.1 Stack Technologique

| Couche               | Technologie  | Version | Justification                                          |
| -------------------- | ------------ | ------- | ------------------------------------------------------ |
| **Framework**        | Next.js      | 16.x    | App Router, Server Actions, streaming SSR via Suspense |
| **Langage**          | TypeScript   | Strict  | Type-safety de bout en bout, erreurs à la compilation  |
| **Base de données**  | MongoDB      | 7.x     | Flexibilité du schéma NoSQL pour données financières   |
| **ORM**              | Prisma       | 7.x     | Requêtes type-safe, migrations, client auto-généré     |
| **Authentification** | Auth.js      | 4.x     | Sessions HttpOnly, OAuth providers, JWT sécurisé       |
| **Validation**       | Zod          | 4.x     | Schémas partagés frontend/backend, parsing sécurisé    |
| **Styling**          | Tailwind CSS | 4.x     | Utility-first, design system cohérent                  |
| **Composants**       | Shadcn/ui    | Latest  | Headless, accessible (ARIA), personnalisable           |
| **État client**      | Zustand      | 5.x     | Léger, minimal, pour état global UI uniquement         |
| **Icônes**           | Lucide React | Latest  | Cohérence visuelle, tree-shakable                      |

### 6.2 Structure du Projet

```
aureo/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Page de connexion
│   │   ├── register/       # Page d'inscription
│   │   └── reset-password/ # Réinitialisation mot de passe
│   ├── (dashboard)/
│   │   ├── layout.tsx      # Layout protégé (auth requise)
│   │   ├── page.tsx        # Dashboard principal
│   │   ├── accounts/       # Gestion des comptes
│   │   ├── transactions/   # Liste et saisie des transactions
│   │   ├── budgets/        # Gestion des budgets
│   │   └── reports/        # Rapports et analyses
│   ├── api/
│   │   └── auth/           # Endpoints Auth.js
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page publique
├── components/
│   ├── ui/                 # Composants Shadcn/ui (générés)
│   ├── layout/             # Header, Sidebar, Footer
│   ├── dashboard/          # Composants spécifiques au dashboard
│   ├── transactions/       # Composants transactions
│   └── charts/             # Composants de visualisation
├── lib/
│   ├── prisma.ts           # Client Prisma (singleton)
│   ├── auth.ts             # Configuration Auth.js
│   ├── utils.ts            # Utilitaires généraux (cn, formatters…)
│   └── constants.ts        # Catégories, constantes métier
├── actions/
│   ├── auth.ts             # Server Actions : login, register
│   ├── accounts.ts         # Server Actions : CRUD comptes
│   ├── transactions.ts     # Server Actions : CRUD transactions
│   └── budgets.ts          # Server Actions : CRUD budgets
├── services/
│   ├── categorization.ts   # Moteur de catégorisation
│   ├── analytics.ts        # Calculs et agrégations
│   └── reports.ts          # Génération des rapports
├── hooks/                  # Custom hooks React
├── types/                  # Types TypeScript globaux
├── schemas/                # Schémas Zod partagés
├── prisma/
│   └── schema.prisma       # Schéma de base de données
└── public/                 # Assets statiques
```

### 6.3 Schéma de Base de Données Complet

```prisma
model User {
  id            String    @id @default(auto()) @map("_id") @db.ObjectId
  email         String    @unique
  password      String?
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  bankAccounts  BankAccount[]
  budgets       Budget[]
  categRules    CategorizationRule[]
}

model BankAccount {
  id          String        @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  type        AccountType
  balance     Float
  currency    String        @default("EUR")
  isArchived  Boolean       @default(false)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  userId       String       @db.ObjectId
  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions Transaction[]
}

model Transaction {
  id            String          @id @default(auto()) @map("_id") @db.ObjectId
  amount        Float
  type          TransactionType
  description   String
  date          DateTime
  category      Category        @default(OTHER)
  isRecurring   Boolean         @default(false)
  createdAt     DateTime        @default(now())

  bankAccountId String          @db.ObjectId
  bankAccount   BankAccount     @relation(fields: [bankAccountId], references: [id], onDelete: Cascade)
}

model Budget {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  category  Category
  amount    Float
  month     Int
  year      Int
  createdAt DateTime @default(now())

  userId    String   @db.ObjectId
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, category, month, year])
}

model CategorizationRule {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  keyword   String
  category  Category
  createdAt DateTime @default(now())

  userId    String   @db.ObjectId
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum AccountType {
  CHECKING
  SAVINGS
  LIVRET
  INVESTMENT
  OTHER
}

enum TransactionType {
  DEBIT
  CREDIT
}

enum Category {
  FOOD
  TRANSPORT
  HOUSING
  HEALTH
  LEISURE
  SHOPPING
  SUBSCRIPTIONS
  INCOME
  SAVINGS
  OTHER
}

// Modèles Auth.js (obligatoires)
model Account { ... }
model Session { ... }
model VerificationToken { ... }
```

### 6.4 Flux de Données

```
Client (Browser)
    │
    ├─ Server Component ──→ Prisma ──→ MongoDB
    │       (lecture directe, pas d'API REST)
    │
    └─ Server Action ──→ Zod (validation) ──→ Prisma ──→ MongoDB
            (mutation, appelée depuis un formulaire ou un bouton)
```

---

## 7. Design & Expérience Utilisateur

### 7.1 Principes de Design

- **Clarté avant tout :** chaque donnée est accompagnée de son contexte. Jamais un chiffre seul.
- **Progressive Disclosure :** montrer l'essentiel d'abord, les détails à la demande.
- **Feedback immédiat :** chaque action utilisateur retourne un état visuel (loading, succès, erreur).
- **Mobile-ready :** responsive par défaut, même si l'expérience principale est desktop.

### 7.2 Système de Design

```
Palette de couleurs
├── Primaire    : #C9A84C (or — confiance, valeur)
├── Sombre      : #1A1A2E (marine foncé — sérieux, sécurité)
├── Succès      : #059669 (vert — positif, en bonne santé)
├── Alerte      : #D97706 (ambre — attention)
├── Danger      : #DC2626 (rouge — dépassement, erreur)
├── Neutre      : #6B7280 (gris — texte secondaire)
└── Fond        : #F8F6F0 (blanc cassé — douceur, lisibilité)

Typographie
├── Police      : Inter (variable)
├── Titre H1    : 32px, Bold, #1A1A2E
├── Titre H2    : 24px, SemiBold, #1A1A2E
├── Corps       : 16px, Regular, #374151
└── Caption     : 14px, Regular, #6B7280

Espacements : base 4px, échelle × 2 (4, 8, 16, 24, 32, 48, 64)
Border-radius : 8px (cards), 6px (boutons), 4px (inputs), 999px (badges)
```

### 7.3 Identité Visuelle & Logo

- Le logo Aureo est utilisé en version couleur principale sur fond clair (`#F8F6F0` ou blanc).
- Une zone de respiration minimale équivalente à la hauteur de la lettre "A" est conservée autour du logo.
- Le logo ne doit jamais être étiré, compressé ou pivoté (ratio d'aspect inchangé).
- Sur fond sombre (`#1A1A2E`), une variante inversée ou en monochrome clair est utilisée pour assurer le contraste.
- Le logo ne doit pas être placé dans un bloc contenant trop d'informations concurrentes (priorité de lecture élevée).
- Taille minimale recommandée : 24 px de hauteur en interface web (desktop et mobile).

**Variantes officielles du logo :**

- Logo complet : symbole + mot-symbole "Aureo", usage principal (header, landing, documents).
- Icône seule : symbole sans texte, usage pour favicon, avatar, pictogramme compact.
- Version monochrome sombre : à utiliser sur fonds très clairs ou en impression N&B.
- Version monochrome claire : à utiliser sur fonds sombres (`#1A1A2E` ou équivalents).
- Aucune recolorisation arbitraire : seules les variantes définies ci-dessus sont autorisées.

**Tableau d’usage recommandé :**

| Contexte                                     | Variante de logo           |
| -------------------------------------------- | -------------------------- |
| Header de l’application / landing page       | Logo complet couleur       |
| Écran de connexion / onboarding              | Logo complet couleur       |
| Favicon, avatar utilisateur, icône compacte  | Icône seule couleur        |
| Sections sur fond très clair ou documents    | Logo complet monochrome sombre |
| Sections sur fond sombre (`#1A1A2E` ou ton)  | Logo complet monochrome clair  |
| Impression noir et blanc                     | Logo complet monochrome sombre |

### 7.4 Wireframes — Description des Écrans Clés

#### Écran 1 — Page de Connexion (`/login`)

```
┌─────────────────────────────────────────┐
│                                         │
│          ✦ AUREO                        │
│   Assistant Financier Personnel         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Connexion                        │  │
│  │                                   │  │
│  │  [Email ________________________] │  │
│  │  [Mot de passe __________________]│  │
│  │                                   │  │
│  │  [      Se connecter           ]  │  │
│  │                                   │  │
│  │  ─────────── ou ───────────────   │  │
│  │                                   │  │
│  │  [  G  Continuer avec Google   ]  │  │
│  │                                   │  │
│  │  Pas encore de compte ? S'inscrire│  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

**Comportements :**

- Validation en temps réel des champs (email valide, mot de passe ≥ 8 caractères)
- Message d'erreur inline en cas d'identifiants incorrects
- Redirection vers `/dashboard` après connexion réussie
- Redirection vers `/dashboard` si déjà authentifié

---

#### Écran 2 — Dashboard Principal (`/dashboard`)

```
┌──────────┬────────────────────────────────────────────────┐
│          │  🔔  Lucas Dubois                      ⚙      │
│  AUREO   ├────────────────────────────────────────────────┤
│          │                                                │
│ Dashboard│  Bonjour Lucas 👋  Voici votre situation      │
│ Comptes  │                                                │
│ Transact.│  ┌──────────────────────────────────────────┐ │
│ Budgets  │  │  SOLDE TOTAL                             │ │
│ Rapports │  │  € 4 280,50          ↑ +2.3% ce mois    │ │
│          │  └──────────────────────────────────────────┘ │
│          │                                                │
│          │  Mes Comptes                    + Ajouter      │
│          │  ┌─────────────┐ ┌─────────────┐             │
│          │  │ BNP Courant │ │ Livret A    │             │
│          │  │ € 1 250,50  │ │ € 3 030,00  │             │
│          │  └─────────────┘ └─────────────┘             │
│          │                                                │
│          │  Dépenses du mois        Dernières transact.  │
│          │  ┌──────────────┐  ┌───────────────────────┐ │
│          │  │ 📊 € 1 420   │  │ 🍕 Pizza Hut   -18 €  │ │
│          │  │ / 1 800 €    │  │ 🚇 RATP        -85 €  │ │
│          │  │ budget       │  │ 🛒 Carrefour   -67 €  │ │
│          │  │ ▓▓▓▓▓▓▓░░░  │  │ 💰 Salaire  +2800 €   │ │
│          │  └──────────────┘  └───────────────────────┘ │
└──────────┴────────────────────────────────────────────────┘
```

**Comportements :**

- Le solde total est cliquable et ouvre le détail des comptes
- Le bloc "Dépenses du mois" affiche une barre de progression colorée (vert → ambre → rouge selon le % du budget)
- Les dernières transactions montrent un emoji de catégorie + description tronquée + montant coloré (rouge=débit, vert=crédit)
- Chargement progressif via `Suspense` : squelette affiché pendant le fetch

---

#### Écran 3 — Transactions (`/dashboard/transactions`)

```
┌──────────┬────────────────────────────────────────────────┐
│  AUREO   │  Transactions                    + Ajouter     │
│          ├────────────────────────────────────────────────┤
│ Dashboard│  [🔍 Rechercher...]  [Période ▼] [Compte ▼]   │
│ Comptes  │  [Catégorie ▼]  [Type ▼]          Filtres actifs: 0│
│ Transact.│ ─────────────────────────────────────────────  │
│ Budgets  │  Février 2026                                  │
│ Rapports │                                                │
│          │  ┌──────────────────────────────────────────┐ │
│          │  │ 🍕 Alimentation                          │ │
│          │  │ Pizza Hut · 14 fév        - 18,00 €      │ │
│          │  │ Catégorie : Alimentation          ✏️ 🗑️   │ │
│          │  ├──────────────────────────────────────────┤ │
│          │  │ 🚇 Transport                             │ │
│          │  │ Pass Navigo · 13 fév      - 85,00 €      │ │
│          │  │ Catégorie : Transport             ✏️ 🗑️   │ │
│          │  ├──────────────────────────────────────────┤ │
│          │  │ 💰 Revenus                               │ │
│          │  │ Virement salaire · 5 fév + 2 800,00 €    │ │
│          │  │ Catégorie : Revenus               ✏️ 🗑️   │ │
│          │  └──────────────────────────────────────────┘ │
│          │                                                │
│          │  ← Précédent   Page 1 / 4   Suivant →        │
└──────────┴────────────────────────────────────────────────┘
```

---

#### Écran 4 — Budgets (`/dashboard/budgets`)

```
┌──────────┬────────────────────────────────────────────────┐
│  AUREO   │  Budgets — Février 2026         ← Jan  Fév →  │
│          ├────────────────────────────────────────────────┤
│ Dashboard│  Résumé du mois                               │
│ Comptes  │  Dépensé : 1 420 €   Budget : 1 800 €  Reste : 380 €│
│ Transact.│ ─────────────────────────────────────────────  │
│ Budgets  │                                                │
│ Rapports │  Alimentation    350 / 400 €   ▓▓▓▓▓▓▓▓▓░  ⚠️ │
│          │  Transport        85 / 100 €   ▓▓▓▓▓▓▓▓░░     │
│          │  Loisirs         280 / 200 €   ▓▓▓▓▓▓▓▓▓▓  🔴 │
│          │  Abonnements      95 / 100 €   ▓▓▓▓▓▓▓▓▓░  ⚠️ │
│          │  Shopping        610 / 1000 €  ▓▓▓▓▓▓░░░░     │
│          │                                                │
│          │  💡 Vous avez dépassé votre budget Loisirs de │
│          │  80 €. Pensez à ajuster le mois prochain.     │
│          │                                  [Ajuster]    │
└──────────┴────────────────────────────────────────────────┘
```

**Comportements :**

- Barre de progression : verte < 70%, ambre 70–99%, rouge ≥ 100%
- Icône ⚠️ à 80%, 🔴 à 100% et au-delà
- Bloc insight affiché si au moins un budget est dépassé, avec recommandation textuelle
- Navigation entre les mois via les flèches

---

## 8. Modèle Économique & Monétisation

> Dans le cadre d'un projet portfolio, la monétisation est pensée comme une évolution future. Elle ne bloque pas le développement de la v1, mais guide les choix d'architecture (multitenancy, plans, quotas).

### 8.1 Stratégie — Freemium

Le modèle retenu est le **freemium** : une offre gratuite généreuse pour l'acquisition, une offre payante pour la rétention et la monétisation.

### 8.2 Plans Tarifaires (cibles v2)

| Fonctionnalité              | Gratuit | Pro (4,99 €/mois) |
| --------------------------- | ------- | ----------------- |
| Nombre de comptes           | 2       | Illimité          |
| Historique des transactions | 3 mois  | Illimité          |
| Budgets par catégorie       | 3       | Illimité          |
| Rapports mensuels           | ✗       | ✓                 |
| Export CSV/PDF              | ✗       | ✓                 |
| Alertes email               | ✗       | ✓                 |
| Règles de catégorisation    | 3       | Illimité          |
| Support prioritaire         | ✗       | ✓                 |

### 8.3 Métriques de Succès Produit

| Métrique                        | Cible 6 mois | Cible 12 mois |
| ------------------------------- | ------------ | ------------- |
| Utilisateurs inscrits           | 200          | 1 000         |
| Utilisateurs actifs hebdo (WAU) | 40           | 200           |
| Taux de conversion Free → Pro   | —            | 5%            |
| Taux de rétention à 30 jours    | 40%          | 60%           |
| MRR (Monthly Recurring Revenue) | —            | 250 €         |

### 8.4 Positionnement Tarifaire

À 4,99 €/mois, Aureo se positionne en dessous de YNAB (~14 $/mois) et Finary (~9,99 €/mois), tout en offrant une expérience supérieure aux outils gratuits limités.

---

## 9. Exigences Non-Fonctionnelles

### 9.1 Sécurité

> **Principe Zero Trust :** toute entrée utilisateur est considérée non fiable jusqu'à validation explicite.

| Domaine           | Exigence                                                      |
| ----------------- | ------------------------------------------------------------- |
| **Validation**    | Schémas Zod sur chaque Server Action, sans exception          |
| **Mots de passe** | Hashage bcrypt (cost factor ≥ 12)                             |
| **Sessions**      | HttpOnly Cookies, SameSite=Strict, expiration 30 jours        |
| **Headers HTTP**  | CSP, X-Frame-Options: DENY, HSTS, X-Content-Type-Options      |
| **Données**       | Chiffrement AES-256 des données financières sensibles en base |
| **Tokens**        | Rotation des refresh tokens, invalidation sur déconnexion     |
| **Logs**          | Journalisation des tentatives de connexion échouées           |

### 9.2 Performance

| Métrique                       | Cible           |
| ------------------------------ | --------------- |
| LCP (Largest Contentful Paint) | < 2.5s          |
| FID (First Input Delay)        | < 100ms         |
| CLS (Cumulative Layout Shift)  | < 0.1           |
| TTFB (Time to First Byte)      | < 800ms         |
| Taille du bundle JS initial    | < 200 kB (gzip) |

**Stratégies d'optimisation :**

- Streaming SSR via `Suspense` pour les composants à chargement lent
- `next/image` avec lazy loading et format WebP automatique
- Code splitting automatique par route (App Router)
- Mise en cache des requêtes Prisma via `unstable_cache` de Next.js

### 9.3 Accessibilité

- Conformité **WCAG 2.1 niveau AA**
- Tous les composants Shadcn/ui sont accessibles (ARIA natif)
- Navigation clavier complète
- Contraste minimum 4.5:1 pour le texte
- Textes alternatifs sur tous les éléments visuels

### 9.4 Qualité & Maintenabilité

| Pratique              | Détail                                                              |
| --------------------- | ------------------------------------------------------------------- |
| **TypeScript Strict** | Aucun `any` implicite, types explicites sur les fonctions publiques |
| **Tests unitaires**   | Jest sur `/services` — couverture cible : 80%                       |
| **Tests E2E**         | Playwright sur les flux critiques (auth, ajout transaction, budget) |
| **Linting**           | ESLint (config Next.js) + Prettier, bloquant en CI                  |
| **Git**               | Conventional Commits, branches feature/, fix/, chore/               |
| **CI/CD**             | GitHub Actions : lint → tests → build → deploy (Vercel)             |

### 9.5 Compatibilité Navigateurs

| Navigateur               | Support                |
| ------------------------ | ---------------------- |
| Chrome / Edge (Chromium) | ✓ Dernières 2 versions |
| Firefox                  | ✓ Dernières 2 versions |
| Safari                   | ✓ Dernières 2 versions |
| Mobile Chrome / Safari   | ✓ iOS 15+, Android 10+ |
| Internet Explorer        | ✗ Non supporté         |

---

## 10. Itération Courante — Phase 1

### 10.1 Checklist de Démarrage

- [ ] Créer le dépôt GitHub (`aureo`) avec `.gitignore` Node
- [ ] Initialiser Next.js 15 : `npx create-next-app@latest aureo --typescript --tailwind --eslint --app --src-dir no`
- [ ] Installer les dépendances :
  ```bash
  npm install prisma @prisma/client @auth/prisma-adapter next-auth@beta zod bcryptjs
  npm install -D @types/bcryptjs prettier eslint-config-prettier
  ```
- [ ] Configurer Prettier (`.prettierrc`)
- [ ] Configurer les variables d'environnement (`.env.local`) :
  ```env
  DATABASE_URL="mongodb+srv://..."
  NEXTAUTH_SECRET="..."
  NEXTAUTH_URL="http://localhost:3000"
  GOOGLE_CLIENT_ID="..."
  GOOGLE_CLIENT_SECRET="..."
  ```
- [ ] Initialiser Prisma : `npx prisma init --datasource-provider mongodb`
- [ ] Créer le schéma Prisma initial (`User`, `Account`, `Session`, `VerificationToken`)
- [ ] Créer le client Prisma singleton (`lib/prisma.ts`)
- [ ] Configurer Auth.js v5 (`lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`)
- [ ] Créer les pages `/login` et `/register` avec validation Zod
- [ ] Implémenter les Server Actions d'authentification (`actions/auth.ts`)
- [ ] Configurer le middleware de protection des routes (`middleware.ts`)
- [ ] Tester : inscription, connexion email, connexion Google, protection routes
- [ ] Déployer sur Vercel (preview)

### 10.2 Critères d'Acceptance — Phase 1

| Scénario                             | Résultat attendu                                   |
| ------------------------------------ | -------------------------------------------------- |
| Inscription avec email valide        | Compte créé, redirection vers `/dashboard`         |
| Inscription avec email déjà utilisé  | Message d'erreur "Email déjà utilisé"              |
| Connexion avec identifiants corrects | Session créée, redirection vers `/dashboard`       |
| Connexion avec mauvais mot de passe  | Message d'erreur générique (pas de fuite d'info)   |
| Connexion Google                     | Compte créé/associé, redirection vers `/dashboard` |
| Accès à `/dashboard` sans session    | Redirection vers `/login`                          |
| Accès à `/login` avec session active | Redirection vers `/dashboard`                      |

---

## 11. Glossaire

| Terme                | Définition                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| **App Router**       | Système de routing de Next.js 15 basé sur le répertoire `/app`, avec Server Components par défaut |
| **Server Action**    | Fonction serveur appelée directement depuis un composant client, sans API REST intermédiaire      |
| **Server Component** | Composant React rendu exclusivement côté serveur, sans JavaScript côté client                     |
| **Zero Trust**       | Principe de sécurité où aucune entrée n'est considérée fiable sans validation explicite           |
| **HttpOnly Cookie**  | Cookie inaccessible depuis JavaScript, protégeant contre les attaques XSS                         |
| **Prisma ORM**       | Outil de mapping objet-relationnel permettant d'interagir avec la base de données via TypeScript  |
| **Zod**              | Bibliothèque de validation de schémas TypeScript-first                                            |
| **DSP2**             | Directive européenne sur les services de paiement, permettant l'Open Banking                      |
| **LCP / FID / CLS**  | Métriques Core Web Vitals de Google mesurant la performance perçue d'une page web                 |
| **bcrypt**           | Algorithme de hashage de mots de passe, résistant aux attaques par force brute                    |
| **JWT**              | JSON Web Token — format de token d'authentification signé et vérifiable                           |
| **Freemium**         | Modèle économique avec une offre gratuite et une offre payante premium                            |
| **WAU**              | Weekly Active Users — utilisateurs actifs sur une semaine glissante                               |
| **MRR**              | Monthly Recurring Revenue — revenu mensuel récurrent                                              |

---

_Ce document constitue la référence technique et fonctionnelle du projet Aureo. Il est mis à jour à la fin de chaque phase, avant le démarrage de la suivante._

_Version 2.0.0 — Février 2026 — Usage interne / Portfolio_
