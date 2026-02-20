# Backend Requirements — CMS BestCash

---

## Routes API

```
AUTH
  POST   /auth/login
  POST   /auth/logout
  GET    /auth/me

ARTICLES
  GET    /articles
  GET    /articles/:slug
  POST   /articles
  PUT    /articles/:id
  DELETE /articles/:id

CATÉGORIES
  GET    /categories
  POST   /categories
  PUT    /categories/:id
  DELETE /categories/:id

SERVICES
  GET    /services              // tous les services (particuliers + business)
  GET    /services?type=particuliers
  GET    /services?type=business
  POST   /services
  PUT    /services/:id
  DELETE /services/:id

TARIFS
  GET    /tarifs
  POST   /tarifs
  PUT    /tarifs/:id
  DELETE /tarifs/:id

RÉSEAU (agences)
  GET    /reseau
  POST   /reseau
  PUT    /reseau/:id
  DELETE /reseau/:id

UPLOAD (Images, Fichiers, etc...)
  POST   /upload

STATS (dashboard)
  GET    /stats

PUBLIC (non authentifié)
  GET    /public/articles/:slug
  GET    /public/articles
  POST   /newsletter/subscribe
```

---

## Fonctionnalités backend

- **Auth** — JWT + refresh token, hash bcrypt, route `/auth/me`
- **Articles** — statuts `brouillon / publié / planifié`, slug auto, `publishedAt`, champs SEO (`metaTitle`, `metaDescription`), contenu HTML (TipTap)
- **Upload** — stockage fichier (image bannière), retourne une URL publique
- **Filtres articles** — `?search=&status=&category=&page=&limit=` (géré côté backend)
- **Services** — deux types : `particuliers` et `business` (filtrable via `?type=`), chaque service a un titre, une description, une icône/image et un CTA
- **Tarifs** — grilles tarifaires pour les produits financiers (frais, taux, conditions)
- **Réseau** — liste des agences BMO : nom, adresse, ville, coordonnées GPS, horaires, contact
- **Stats** — le dashboard a besoin de deux endpoints :
  - `/stats` → compteurs globaux (total articles, publiés aujourd'hui, nb catégories)

---

## À faire côté frontend (quand backend prêt)

- [ ] Remplacer `mock.js` par des appels API dans chaque page
- [ ] Uploader la bannière avant soumission, inclure l'URL dans le payload
- [ ] Gérer refresh token (intercepteur axios sur 401)
- [ ] Implémenter les pages Services, Tarifs, Réseau dans le CMS
- [ ] Supprimer debug code dans `Dashboard.jsx` (lignes 91-93)
- [ ] Implémenter les pages Analytics et Paramètres
