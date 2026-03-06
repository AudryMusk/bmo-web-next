import { NextResponse } from 'next/server'
import { APP_PERMISSIONS } from '@/lib/permissions'

/**
 * GET /api/permissions
 *
 * Endpoint public lu par le module user (api.module-user.bestcash.me) pour
 * connaître la liste des fonctionnalités disponibles dans cette application.
 * Le module user se charge ensuite d'attribuer ces permissions à ses utilisateurs.
 */
export async function GET() {
  return NextResponse.json({
    app: 'bmo-web-app',
    permissions: APP_PERMISSIONS,
  })
}
