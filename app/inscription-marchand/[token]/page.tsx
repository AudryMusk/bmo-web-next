import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import InscriptionClient from './InscriptionClient'

export default async function InscriptionMarchandPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const marchand = await prisma.marchand.findUnique({
    where: { token },
    select: { id: true, token: true, name: true, phone: true, email: true, city: true, department: true, country: true, lat: true, lng: true, photo: true },
  })
  if (!marchand) notFound()
  return <InscriptionClient marchand={marchand} />
}
