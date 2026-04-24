import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const lat    = parseFloat(searchParams.get('latitude')  ?? '')
  const lng    = parseFloat(searchParams.get('longitude') ?? '')
  const limit  = parseInt(searchParams.get('limit')  ?? '20')
  const radius = parseFloat(searchParams.get('radius') ?? '')

  try {
    const marchands = await prisma.marchand.findMany({
      where: { active: true },
      select: {
        name: true, phone: true, email: true,
        city: true, quartier: true, department: true, country: true,
        lat: true, lng: true, address: true, photo: true, logo: true,
      },
    })

    const withDistance = marchands
      .map(m => ({
        ...m,
        distance:
          !isNaN(lat) && !isNaN(lng) && m.lat && m.lng
            ? haversineKm(lat, lng, m.lat, m.lng)
            : null,
      }))
      .filter(m => isNaN(radius) || m.distance === null || m.distance <= radius)
      .sort((a, b) => {
        if (a.distance === null) return 1
        if (b.distance === null) return -1
        return a.distance - b.distance
      })
      .slice(0, limit)

    return NextResponse.json({ stores: withDistance })
  } catch (err) {
    console.error('[api/marchands]', err)
    return NextResponse.json(
      { error: 'Erreur serveur', detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    )
  }
}
