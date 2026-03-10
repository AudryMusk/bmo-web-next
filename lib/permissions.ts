// ─── Liste des permissions exposées au module user ───────────────────────────
// Le module user lit GET /api/permissions pour connaître les fonctionnalités
// disponibles dans cette app, puis les attribue librement à ses utilisateurs.

export interface Permission {
  slug: string
  label: string
  description: string
}

export const APP_PERMISSIONS: Permission[] = [
  // Dashboard
  { slug: 'dashboard:view',              description: 'Accéder au tableau de bord et consulter les statistiques générales de l\'application.',                         label: 'Voir le tableau de bord' },

  // Articles
  { slug: 'articles:view',               description: 'Consulter la liste des articles publiés et leurs détails.',                                                      label: 'Voir les articles' },
  { slug: 'articles:create',             description: 'Rédiger et publier de nouveaux articles sur le site.',                                                           label: 'Créer un article' },
  { slug: 'articles:edit',               description: 'Modifier le contenu, le titre ou les métadonnées d\'un article existant.',                                       label: 'Modifier un article' },
  { slug: 'articles:delete',             description: 'Supprimer définitivement un article du site.',                                                                   label: 'Supprimer un article' },

  // Catégories
  { slug: 'categories:view',             description: 'Consulter la liste des catégories utilisées pour classer les articles.',                                         label: 'Voir les catégories' },
  { slug: 'categories:create',           description: 'Créer une nouvelle catégorie pour organiser les articles.',                                                      label: 'Créer une catégorie' },
  { slug: 'categories:edit',             description: 'Renommer ou modifier une catégorie existante.',                                                                  label: 'Modifier une catégorie' },
  { slug: 'categories:delete',           description: 'Supprimer une catégorie existante.',                                                                             label: 'Supprimer une catégorie' },

  // Services
  { slug: 'services:view',               description: 'Consulter les services proposés par l\'organisation et leur configuration.',                                     label: 'Voir les services' },
  { slug: 'services:edit',               description: 'Modifier la description, le statut ou les paramètres d\'un service existant.',                                   label: 'Modifier les services' },

  // Tarifs
  { slug: 'tarifs:view',                 description: 'Consulter la grille tarifaire des produits et services.',                                                        label: 'Voir les tarifs' },
  { slug: 'tarifs:edit',                 description: 'Mettre à jour les prix et conditions tarifaires des produits et services.',                                      label: 'Modifier les tarifs' },

  // Réseau
  { slug: 'reseau:view',                 description: 'Consulter l\'ensemble du réseau : microfinances, distributeurs, GAB/ATM et partenaires.',                        label: 'Voir le réseau' },
  { slug: 'reseau:microfinances:create', description: 'Ajouter un nouvel établissement de microfinance au réseau.',                                                     label: 'Ajouter une microfinance' },
  { slug: 'reseau:microfinances:edit',   description: 'Modifier les informations d\'un établissement de microfinance existant.',                                        label: 'Modifier une microfinance' },
  { slug: 'reseau:microfinances:delete', description: 'Retirer un établissement de microfinance du réseau.',                                                            label: 'Supprimer une microfinance' },
  { slug: 'reseau:distributeurs:create', description: 'Ajouter un nouveau point de distribution au réseau.',                                                            label: 'Ajouter un distributeur' },
  { slug: 'reseau:distributeurs:edit',   description: 'Modifier les informations d\'un distributeur existant.',                                                         label: 'Modifier un distributeur' },
  { slug: 'reseau:distributeurs:delete', description: 'Retirer un distributeur du réseau.',                                                                             label: 'Supprimer un distributeur' },
  { slug: 'reseau:gab:create',           description: 'Enregistrer un nouveau GAB/ATM dans le réseau.',                                                                 label: 'Ajouter un GAB/ATM' },
  { slug: 'reseau:gab:edit',             description: 'Mettre à jour les informations d\'un GAB/ATM existant (localisation, statut, etc.).',                            label: 'Modifier un GAB/ATM' },
  { slug: 'reseau:gab:delete',           description: 'Retirer un GAB/ATM du réseau.',                                                                                  label: 'Supprimer un GAB/ATM' },
  { slug: 'reseau:partenaires:create',   description: 'Ajouter un nouveau partenaire au réseau.',                                                                       label: 'Ajouter un partenaire' },
  { slug: 'reseau:partenaires:edit',     description: 'Modifier les informations d\'un partenaire existant.',                                                           label: 'Modifier un partenaire' },
  { slug: 'reseau:partenaires:delete',   description: 'Retirer un partenaire du réseau.',                                                                               label: 'Supprimer un partenaire' },
]

// ─── Mapping route admin → permission requise ─────────────────────────────────
// Chaque route /admin/* nécessite une permission précise.
// Le guard dans middleware.ts utilise ce mapping pour décider d'autoriser ou non.

export const ROUTE_PERMISSION_MAP: Record<string, string> = {
  '/admin/dashboard':                    'dashboard:view',

  '/admin/articles':                     'articles:view',
  '/admin/articles/new':                 'articles:create',
  '/admin/edit':                         'articles:edit',      // /admin/edit/[id]

  '/admin/categories':                   'categories:view',

  '/admin/services':                     'services:view',

  '/admin/tarifs':                       'tarifs:view',

  '/admin/reseau':                       'reseau:view',
  '/admin/reseau/microfinances':         'reseau:view',
  '/admin/reseau/distributeurs':         'reseau:view',
  '/admin/reseau/gab':                   'reseau:view',
  '/admin/reseau/partenaires':           'reseau:view',
}

/**
 * Retourne la permission requise pour accéder à un pathname admin.
 * Ex: getRequiredPermission('/admin/edit/clxxx') → 'articles:edit'
 */
export function getRequiredPermission(pathname: string): string | null {
  // Correspondance exacte d'abord
  if (ROUTE_PERMISSION_MAP[pathname]) return ROUTE_PERMISSION_MAP[pathname]

  // Correspondance par préfixe (pour les routes dynamiques ex: /admin/edit/[id])
  for (const [route, perm] of Object.entries(ROUTE_PERMISSION_MAP)) {
    if (pathname.startsWith(route + '/')) return perm
  }

  // Route admin non mappée → on exige juste dashboard:view par défaut
  return 'dashboard:view'
}
