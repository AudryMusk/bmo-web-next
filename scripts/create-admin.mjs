import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    ?? 'admin@bmo.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'Admin@1234'
const ADMIN_NAME     = process.env.ADMIN_NAME     ?? 'Administrateur'

async function main() {
  console.log('Création de l\'administrateur...\n')

  // Vérifier si l'email existe déjà
  const existing = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  })

  if (existing) {
    console.log(`Un utilisateur avec l'email "${ADMIN_EMAIL}" existe déjà.`)
    console.log('   Aucune modification effectuée.')
    return
  }

  // Valider la longueur du mot de passe
  if (ADMIN_PASSWORD.length < 6) {
    console.error('Le mot de passe doit contenir au moins 6 caractères.')
    process.exit(1)
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12)

  // Créer l'utilisateur
  const user = await prisma.user.create({
    data: {
      email:    ADMIN_EMAIL,
      password: hashedPassword,
      name:     ADMIN_NAME,
    },
  })

  console.log('Administrateur créé avec succès !')
  console.log('─────────────────────────────────────')
  console.log(`   ID    : ${user.id}`)
  console.log(`   Nom   : ${user.name}`)
  console.log(`   Email : ${user.email}`)
  console.log('─────────────────────────────────────')
  console.log('\n Vous pouvez maintenant vous connecter sur /login')
}

main()
  .catch((err) => {
    console.error('Erreur lors de la création de l\'admin :', err.message)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
