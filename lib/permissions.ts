// ─── Liste des permissions exposées au module user ───────────────────────────
// Le module user lit GET /api/permissions pour connaître les fonctionnalités
// disponibles dans cette app, puis les attribue librement à ses utilisateurs.

export interface Permission {
  key: string
  label: string
  group: string
}

export const APP_PERMISSIONS: Permission[] = [
  // Dashboard
  { key: 'dashboard:view',              group: 'Dashboard',     label: 'Voir le tableau de bord' },

  // Articles
  { key: 'articles:view',               group: 'Articles',      label: 'Voir les articles' },
  { key: 'articles:create',             group: 'Articles',      label: 'Créer un article' },
  { key: 'articles:edit',               group: 'Articles',      label: 'Modifier un article' },
  { key: 'articles:delete',             group: 'Articles',      label: 'Supprimer un article' },

  // Catégories
  { key: 'categories:view',             group: 'Catégories',    label: 'Voir les catégories' },
  { key: 'categories:create',           group: 'Catégories',    label: 'Créer une catégorie' },
  { key: 'categories:edit',             group: 'Catégories',    label: 'Modifier une catégorie' },
  { key: 'categories:delete',           group: 'Catégories',    label: 'Supprimer une catégorie' },

  // Services
  { key: 'services:view',               group: 'Services',      label: 'Voir les services' },
  { key: 'services:edit',               group: 'Services',      label: 'Modifier les services' },

  // Tarifs
  { key: 'tarifs:view',                 group: 'Tarifs',        label: 'Voir les tarifs' },
  { key: 'tarifs:edit',                 group: 'Tarifs',        label: 'Modifier les tarifs' },

  // Réseau
  { key: 'reseau:view',                 group: 'Réseau',        label: 'Voir le réseau' },
  { key: 'reseau:microfinances:create', group: 'Réseau',        label: 'Ajouter une microfinance' },
  { key: 'reseau:microfinances:edit',   group: 'Réseau',        label: 'Modifier une microfinance' },
  { key: 'reseau:microfinances:delete', group: 'Réseau',        label: 'Supprimer une microfinance' },
  { key: 'reseau:distributeurs:create', group: 'Réseau',        label: 'Ajouter un distributeur' },
  { key: 'reseau:distributeurs:edit',   group: 'Réseau',        label: 'Modifier un distributeur' },
  { key: 'reseau:distributeurs:delete', group: 'Réseau',        label: 'Supprimer un distributeur' },
  { key: 'reseau:gab:create',           group: 'Réseau',        label: 'Ajouter un GAB/ATM' },
  { key: 'reseau:gab:edit',             group: 'Réseau',        label: 'Modifier un GAB/ATM' },
  { key: 'reseau:gab:delete',           group: 'Réseau',        label: 'Supprimer un GAB/ATM' },
  { key: 'reseau:partenaires:create',   group: 'Réseau',        label: 'Ajouter un partenaire' },
  { key: 'reseau:partenaires:edit',     group: 'Réseau',        label: 'Modifier un partenaire' },
  { key: 'reseau:partenaires:delete',   group: 'Réseau',        label: 'Supprimer un partenaire' },
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
