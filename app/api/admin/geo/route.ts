import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const GEO_PATH = path.join(process.cwd(), 'data/benin-geo.json')

export async function POST(req: NextRequest) {
  const { department, city, quartier } = await req.json()

  if (!department || !city || !quartier?.trim()) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }

  const raw  = await fs.readFile(GEO_PATH, 'utf-8')
  const data = JSON.parse(raw)

  if (!data[department]?.[city]) {
    return NextResponse.json({ error: 'Département ou ville introuvable' }, { status: 404 })
  }

  const trimmed = quartier.trim().toUpperCase()

  if (!data[department][city].includes(trimmed)) {
    data[department][city].push(trimmed)
    data[department][city].sort()
    await fs.writeFile(GEO_PATH, JSON.stringify(data, null, 2), 'utf-8')
  }

  return NextResponse.json({ ok: true, quartier: trimmed })
}
