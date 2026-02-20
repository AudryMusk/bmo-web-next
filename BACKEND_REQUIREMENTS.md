# Backend Requirements — Blog CMS BestCash

> Audit complet des besoins backend à partir du code frontend existant.
> Toutes les données sont actuellement mockées dans `src/data/mock.js`.

---

## 1. Authentification

### Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/auth/login` | Connexion — retourne un token JWT |
| `POST` | `/auth/register` | Inscription — retourne un token JWT |
| `POST` | `/auth/logout` | Invalider le token côté serveur |
| `GET` | `/auth/me` | Retourner le profil de l'utilisateur connecté |

### Contrat actuel (reqres.in)
```json
// POST /login - body
{ "email": "eve.holt@reqres.in", "password": "cityslicka" }

// POST /login - response
{ "token": "QpwL5tpe83ilfN2..." }
```

### Ce qu'il faudra en prod
- Token JWT avec expiration (`exp`)
- Refresh token (stockage sécurisé, pas `localStorage`)
- Route `/auth/me` pour hydrater le store au refresh de page
- Hash du mot de passe (bcrypt côté serveur)

### Fichiers concernés
- [src/auth/AuthStore.js](src/auth/AuthStore.js) — store Zustand avec persist
- [src/api/axios.js](src/api/axios.js) — intercepteur qui injecte le Bearer token
- [src/pages/Login.jsx](src/pages/Login.jsx)
- [src/pages/Register.jsx](src/pages/Register.jsx)
- [src/components/ProtectedRoutes.jsx](src/components/ProtectedRoutes.jsx)

---

## 2. Articles

### Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/articles` | Liste paginée avec filtres |
| `GET` | `/articles/:slug` | Article unique (vue publique) |
| `POST` | `/articles` | Créer un article |
| `PUT` | `/articles/:id` | Modifier un article |
| `DELETE` | `/articles/:id` | Supprimer un article |

### Paramètres de filtre — `GET /articles`
```
?search=mot-clé        // filtre titre + auteur
&status=publié         // publié | brouillon | planifié
&category=ingenierie   // slug de catégorie
&blog=1                // id de blog
&page=1
&limit=20
```

### Schéma d'un article
```json
{
  "id": 1,
  "title": "Construire des APIs scalables avec NestJS",
  "slug": "apis-scalables-nestjs",
  "excerpt": "...",
  "content": [
    { "type": "heading", "text": "Titre de section" },
    { "type": "paragraph", "text": "Corps du texte..." }
  ],
  "image": "https://...",
  "status": "publié",
  "category": "Ingénierie",
  "blog": "Blog Bestcash",
  "author": "Audry",
  "authorAvatar": "https://...",
  "readTime": 8,
  "date": "18 FEV, 2025"
}
```

### Logique métier côté serveur
- Générer le `slug` automatiquement à partir du `title` (unique)
- Calculer `readTime` (nb de mots / 200)
- Champ `publishedAt` à setter quand `status` passe à `"publié"`
- Mettre à jour `articlesCount` sur la catégorie associée

### Upload d'image (bannière)
Le formulaire [NewArticle.jsx](src/pages/NewArticle.jsx) accepte un champ `banner` (JPEG/PNG/WebP, max 5 MB).

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/upload` | Upload d'un fichier, retourne une URL |

```json
// Response
{ "url": "https://cdn.bestcash.io/images/mon-image.webp" }
```

### Fichiers concernés
- [src/pages/Articles.jsx](src/pages/Articles.jsx) — liste admin
- [src/pages/NewArticle.jsx](src/pages/NewArticle.jsx) — création (form zod)
- [src/pages/PublicView.jsx](src/pages/PublicView.jsx) — lecture publique
- [src/App.jsx](src/App.jsx) — `addArticle()`, state global

---

## 3. Catégories

### Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/categories` | Toutes les catégories |
| `POST` | `/categories` | Créer une catégorie |
| `PUT` | `/categories/:id` | Modifier (nom, description, couleur) |
| `DELETE` | `/categories/:id` | Supprimer |

### Schéma
```json
{
  "id": 1,
  "name": "Ingénierie",
  "slug": "ingenierie",
  "description": "Techniques avancées, backend et architecture logicielle.",
  "color": "#2563EB",
  "articlesCount": 12
}
```

### Logique métier
- Le `slug` est généré depuis le `name` (normalize NFD → minuscules → tirets)
- `articlesCount` = comptage des articles liés (ne pas supprimer les articles à la suppression d'une catégorie — juste délier)
- Empêcher la suppression si `articlesCount > 0` **ou** nullifier la catégorie sur les articles liés (selon règle métier à définir)

### Fichiers concernés
- [src/pages/Categories.jsx](src/pages/Categories.jsx) — CRUD complet (Dialog + AlertDialog)
- [src/App.jsx](src/App.jsx) — `addCategory()`, `updateCategory()`, `deleteCategory()`

---

## 4. Blogs

### Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/blogs` | Liste des blogs |
| `POST` | `/blogs` | Créer un blog |
| `PUT` | `/blogs/:id` | Modifier |
| `DELETE` | `/blogs/:id` | Supprimer |

### Schéma
```json
{
  "id": 1,
  "name": "Bestcash Officiel",
  "domain": "blog.bestcash.io",
  "status": "actif",
  "articlesCount": 24,
  "subscribers": "2400"
}
```

### Fichiers concernés
- [src/pages/Blogs.jsx](src/pages/Blogs.jsx) — page non encore développée
- [src/data/mock.js](src/data/mock.js) — `blogs` array à remplacer

---

## 5. Dashboard — Statistiques

### Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/stats` | Compteurs globaux |
| `GET` | `/stats/chart` | Articles publiés par mois (6 derniers mois) |

### Réponse `/stats`
```json
{
  "totalArticles": 48,
  "publishedToday": 3,
  "categoriesCount": 4,
  "activeBlogsCount": 2
}
```

### Réponse `/stats/chart`
```json
[
  { "month": "Sep", "articles": 4 },
  { "month": "Oct", "articles": 7 },
  { "month": "Nov", "articles": 5 },
  { "month": "Déc", "articles": 9 },
  { "month": "Jan", "articles": 6 },
  { "month": "Fév", "articles": 12 }
]
```

### Fichiers concernés
- [src/pages/Dashboard.jsx](src/pages/Dashboard.jsx) — consomme `stats` et `categories` depuis mock

---

## 6. Vue publique

### Endpoints (non authentifiés)

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/public/articles/:slug` | Article public |
| `GET` | `/public/articles` | Articles similaires (même catégorie, excl. slug courant) |
| `POST` | `/newsletter/subscribe` | Inscription newsletter |

### Logique "Articles similaires"
```
GET /public/articles?category=ingenierie&exclude=apis-scalables-nestjs&limit=3
```

### Newsletter
```json
// POST /newsletter/subscribe - body
{ "email": "user@example.com" }
```

### Fichiers concernés
- [src/pages/PublicView.jsx](src/pages/PublicView.jsx) — affiche l'article + sidebar CTA + articles similaires

---

## 7. Récapitulatif des routes

```
AUTH
  POST   /auth/login
  POST   /auth/register
  POST   /auth/logout
  GET    /auth/me

ARTICLES (privé)
  GET    /articles
  GET    /articles/:slug
  POST   /articles
  PUT    /articles/:id
  DELETE /articles/:id

UPLOAD
  POST   /upload

CATÉGORIES (privé)
  GET    /categories
  POST   /categories
  PUT    /categories/:id
  DELETE /categories/:id

BLOGS (privé)
  GET    /blogs
  POST   /blogs
  PUT    /blogs/:id
  DELETE /blogs/:id

STATS (privé)
  GET    /stats
  GET    /stats/chart

PUBLIC (non authentifié)
  GET    /public/articles/:slug
  GET    /public/articles
  POST   /newsletter/subscribe
```

---

## 8. À faire côté frontend pour brancher le vrai backend

- [ ] Remplacer `src/data/mock.js` par des appels `api.get(...)` dans chaque page
- [ ] Ajouter `useEffect` + `useState` (loading / error) dans Articles, Categories, Blogs, Dashboard
- [ ] Implémenter les filtres Articles via query params (`?search=&status=&category=&blog=`)
- [ ] Gérer le refresh token (intercepteur axios sur 401 → refresh → retry)
- [ ] Uploader la bannière avant soumission du formulaire NewArticle, puis envoyer l'URL retournée
- [ ] Brancher le bouton "Brouillon" dans NewArticle sur `POST /articles` avec `status: "brouillon"`
- [ ] Supprimer le debug code dans Dashboard.jsx (lignes 91-93 : `xss` + `console.log`)
- [ ] Implémenter les pages Analytics et Paramètres (ou les retirer de la sidebar)
