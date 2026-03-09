# B-MO Web App

Official website and content management system (CMS) for **B-MO** — a digital payment and mobile banking solution operating in Benin (BCEAO-licensed).

Built with **Next.js 14**, **Prisma**, **MySQL**, and **Tailwind CSS**.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Creating the First Admin](#creating-the-first-admin)
- [Available Scripts](#available-scripts)
- [Public Routes](#public-routes)
- [Admin CMS Routes](#admin-cms-routes)
- [Data Models](#data-models)
- [Key Conventions](#key-conventions)

---

## Overview

This project is a **full-stack Next.js application** that serves two purposes:

1. **Public website** — landing page, blog, services, pricing, network map, contact
2. **Admin CMS** — a password-protected back-office to manage all website content

Authentication is handled via **JWT stored in an HTTP-only cookie** (no third-party auth provider). All forms are validated server-side using **Zod schemas**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript + JavaScript (mixed) |
| Database | MySQL via Prisma ORM |
| Styling | Tailwind CSS + shadcn/ui components |
| Rich Text | Tiptap editor |
| Validation | Zod (server-side, centralized in `lib/schemas.js`) |
| Auth | JWT (`jose`) stored in HTTP-only cookies |
| Maps | Google Maps JS API |
| Icons | Lucide React |

---

## Project Structure

```
├── actions/          # Next.js Server Actions (auth, articles, categories, services, tarifs, reseau)
├── app/
│   ├── (auth)/       # Login & Register pages
│   ├── admin/        # CMS back-office (protected)
│   ├── blog/         # Public blog
│   ├── services/     # Public services pages (particuliers / business)
│   ├── tarifs/       # Public pricing page
│   ├── reseau/       # Public network map page
│   ├── contact/      # Contact page
│   └── a-propos/     # About page
├── components/
│   ├── admin/        # All CMS UI components
│   └── ui/           # shadcn/ui base components
├── lib/
│   ├── schemas.js    # All Zod validation schemas (centralized)
│   ├── prisma.ts     # Prisma client singleton
│   ├── session.js    # JWT session management
│   └── utils.ts      # Shared utilities
├── prisma/
│   └── schema.prisma # Database schema
├── scripts/
│   └── create-admin.mjs  # CLI script to seed the first admin user
└── public/
    └── uploads/      # User-uploaded images (logos, article banners)
```

---

## Prerequisites

- **Node.js** >= 18
- **MySQL** >= 8 running locally or remotely
- A **Google Maps API key** (for the network map)

---

## Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/BestCash-Dev-Team/bmo-web-app.git
cd bmo-web-app
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**
```bash
cp .env.example .env.local
# Then edit .env.local with your actual values
```

**4. Set up the database**
```bash
npx prisma migrate dev --name init
# or if the database already exists:
npx prisma db push
```

**5. Seed the first admin user**
```bash
npm run create-admin
```

**6. Start the development server**
```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).
The CMS is accessible at [http://localhost:3000/login](http://localhost:3000/login).

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```env
# Database
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"

# Authentication — generate with: openssl rand -base64 32
JWT_SECRET="your_jwt_secret_key"

# Google Maps
GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your_google_maps_api_key"

# Admin seed (used by scripts/create-admin.mjs)
ADMIN_EMAIL="admin@bmo.com"
ADMIN_PASSWORD="Admin@1234"
ADMIN_NAME="Administrateur"
```

> ⚠️ Never commit `.env.local` — it is already in `.gitignore`.

To generate a secure `JWT_SECRET`:
```bash
openssl rand -base64 32
```

---

## Database

This project uses **Prisma** with MySQL. The schema is defined in `prisma/schema.prisma`.

```bash
# Apply schema changes to the database
npx prisma migrate dev --name <migration-name>

# Push schema without migration history (useful for fast iteration)
npx prisma db push

# Open Prisma Studio (visual DB browser)
npx prisma studio

# Regenerate the Prisma client after schema changes
npx prisma generate
```

---

## Creating the First Admin

There is no public registration flow in production. Use the seed script:

```bash
# With default credentials (admin@bmo.com / Admin@1234)
npm run create-admin

# With custom credentials
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=MyPassword ADMIN_NAME="Your Name" npm run create-admin
```

The script will:
- Check if the email already exists (no duplicate)
- Hash the password with bcrypt (salt 12)
- Create the user in the database
- Print the created user's ID, name, and email

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run create-admin` | Seed the first admin user |

---

## Public Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/blog` | Article list |
| `/blog/[slug]` | Article detail |
| `/services/particuliers` | Individual services |
| `/services/business` | Business services |
| `/tarifs` | Pricing tables |
| `/reseau` | Network map (microfinances, distributors, ATMs, partners) |
| `/contact` | Contact page |
| `/a-propos` | About page |

---

## Admin CMS Routes

All routes under `/admin/*` require authentication. Unauthenticated users are redirected to `/login`.

| Route | Description |
|---|---|
| `/login` | Login page |
| `/register` | Register page |
| `/admin/dashboard` | Stats overview |
| `/admin/articles` | Article list & bulk actions |
| `/admin/articles/new` | Create article (Tiptap editor) |
| `/admin/edit/[id]` | Edit article |
| `/admin/categories` | Manage blog categories |
| `/admin/services` | Edit services (particuliers & business) |
| `/admin/tarifs` | Edit pricing tables |
| `/admin/reseau/microfinances` | Manage microfinance locations |
| `/admin/reseau/distributeurs` | Manage distributors |
| `/admin/reseau/gab` | Manage ATMs |
| `/admin/reseau/partenaires` | Manage partners |

---

## Data Models

| Model | Description |
|---|---|
| `User` | Admin users (email + bcrypt password) |
| `Article` | Blog posts with status (`brouillon`, `publie`, `planifie`) |
| `Category` | Blog categories with color and slug |
| `Service` | B-MO services (type: `particulier` or `business`) |
| `TariffMeta` | Pricing table headers per region |
| `TariffRow` | Pricing table rows with fee columns |
| `Microfinance` | Microfinance partner locations |
| `Distributor` | B-MO distributor locations |
| `GabAtm` | UBA ATM locations |
| `Partner` | B-MO partner organizations |

---

## Key Conventions

**Server Actions** — All mutations go through Next.js Server Actions in the `actions/` folder. No separate API routes.

**Zod validation** — All schemas are centralized in `lib/schemas.js`. Every Server Action validates input with `safeParse` before touching the database. Errors are returned as `{ error, fieldErrors }` for per-field display in the UI.

**File uploads** — Images (article banners, logos) are saved to `public/uploads/` on the server. The path is stored in the database. In production, consider replacing this with a cloud storage provider (S3, Cloudinary, etc.).

**Reverse geocoding** — When GPS coordinates are provided for network entities, the Google Maps Geocoding API is called server-side to auto-fill the human-readable address.

**Authentication flow**:
1. User submits login form → Server Action validates credentials
2. On success, a signed JWT is created with `jose` and stored in an HTTP-only cookie
3. `middleware.ts` verifies the cookie on every request to `/admin/*`
4. Session expires after **7 days**
# gci-website
