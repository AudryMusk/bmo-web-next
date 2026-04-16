import { z } from 'zod'

export function parseResult(result) {
  if (result.success) return null
  const fieldErrors = result.error.flatten().fieldErrors
  const firstError  = Object.values(fieldErrors).flat()[0]
  return { error: firstError ?? 'Données invalides.', fieldErrors }
}



export const loginSchema = z.object({
  email:    z.string().email('Email invalide.').max(255),
  password: z.string().min(1, 'Le mot de passe est requis.'),
})

export const registerSchema = z.object({
  email:           z.string().email('Email invalide.').max(255),
  name:            z.string().max(100).optional(),
  password:        z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères.'),
  confirmPassword: z.string(),
}).refine(d => d.password === d.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas.',
  path:    ['confirmPassword'],
})


export const categorySchema = z.object({
  name:        z.string().min(2, 'Le nom doit faire au moins 2 caractères.').max(100),
  description: z.string().max(500).optional(),
  color:       z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Couleur invalide.').default('#2563EB'),
})


const VALID_STATUSES = ['brouillon', 'publie', 'publié', 'planifie', 'planifié']

export const articleSchema = z.object({
  title:           z.string().min(20, 'Le titre doit faire au moins 20 caractères.').max(200),
  content:         z.string().min(1, 'Le contenu ne peut pas être vide.'),
  status:          z.enum(VALID_STATUSES).default('brouillon'),
  categoryId:      z.string().optional().nullable(),
  publishedAt:     z.string().optional().nullable(),
  metaTitle:       z.string().max(60).optional().nullable(),
  metaDescription: z.string().max(160).optional().nullable(),
})


export const serviceSchema = z.object({
  id:          z.string().min(1, 'ID requis.'),
  title:       z.string().min(2, 'Le titre doit faire au moins 2 caractères.').max(150),
  description: z.string().min(10, 'La description doit faire au moins 10 caractères.').max(1000),
  icon:        z.string().max(100).optional().nullable(),
  features:    z.string().optional(),
})

export const createServiceSchema = z.object({
  type:        z.enum(['particulier', 'business']),
  title:       z.string().min(2, 'Le titre doit faire au moins 2 caractères.').max(150),
  description: z.string().min(10, 'La description doit faire au moins 10 caractères.').max(1000),
  icon:        z.string().max(100).optional().nullable(),
  features:    z.string().optional(),
})


const optFloat = z.preprocess(
  v => (v === '' || v == null ? null : Number(v)),
  z.number().positive().nullable().optional()
)

export const tariffRowSchema = z.object({
  id:                 z.string().min(1),
  min:                z.preprocess(v => Number(v), z.number({ invalid_type_error: 'Montant minimum invalide.' }).nonnegative()),
  max:                optFloat,
  fraisRetrait:       optFloat,
  fraisEnvoi:         optFloat,
  minEnvoi:           optFloat,
  maxEnvoi:           optFloat,
  frais:              optFloat,
  fraisBmoVersAutres: optFloat,
  fraisAutresVersBmo: z.string().max(50).optional().nullable(),
})

export const tariffMetaSchema = z.object({
  id:    z.string().min(1),
  title: z.string().min(2, 'Le titre doit faire au moins 2 caractères.').max(150),
  note:  z.string().max(500).optional().nullable(),
})

export const createTariffMetaSchema = z.object({
  region: z.string().min(2, 'La région est requise.').max(50).regex(/^[a-z0-9_-]+$/, 'Identifiant invalide (minuscules, chiffres, tirets uniquement).'),
  title:  z.string().min(2, 'Le titre doit faire au moins 2 caractères.').max(150),
  note:   z.string().max(500).optional().nullable(),
})

export const createTariffRowSchema = z.object({
  tariffMetaId:       z.string().min(1, 'Grille tarifaire requise.'),
  min:                z.preprocess(v => Number(v), z.number({ invalid_type_error: 'Montant minimum invalide.' }).nonnegative()),
  max:                optFloat,
  fraisRetrait:       optFloat,
  fraisEnvoi:         optFloat,
  minEnvoi:           optFloat,
  maxEnvoi:           optFloat,
  frais:              optFloat,
  fraisBmoVersAutres: optFloat,
  fraisAutresVersBmo: z.string().max(50).optional().nullable(),
})


const optFloat2 = z.preprocess(
  v => (v === '' || v == null ? null : Number(v)),
  z.number().nullable().optional()
)

export const microfinanceSchema = z.object({
  name:     z.string().min(2, 'Le nom doit faire au moins 2 caractères.').max(150),
  agencies: z.preprocess(v => parseInt(String(v), 10), z.number({ invalid_type_error: "Nombre d'agences invalide." }).int().nonnegative()),
  lat:      optFloat2,
  lng:      optFloat2,
})

export const marchandSchema = z.object({
  name:       z.string().min(2, 'Le nom doit faire au moins 2 caractères.').max(150),
  phone:      z.string().max(30).optional().default(''),
  country:    z.string().max(100).optional().default('Bénin'),
  department: z.string().max(100).optional().nullable(),
  city:       z.string().max(100).optional().nullable(),
  lat:        optFloat2,
  lng:        optFloat2,
})

export const gabSchema = z.object({
  city:     z.string().min(2, 'La ville est requise.').max(100),
  location: z.string().min(2, 'La localisation est requise.').max(300),
  lat:      optFloat2,
  lng:      optFloat2,
})

export const partnerSchema = z.object({
  name:        z.string().min(2, 'Le nom doit faire au moins 2 caractères.').max(150),
  category:    z.string().max(100).optional().default(''),
  description: z.string().max(1000).optional().default(''),
  lat:         optFloat2,
  lng:         optFloat2,
})

export const internationalCountrySchema = z.object({
  id:   z.string().min(1, 'ID requis.'),
  name: z.string().min(1, 'Le nom du pays est requis.').max(100),
})

export const createInternationalCountrySchema = z.object({
  name: z.string().min(1, 'Le nom du pays est requis.').max(100),
})

export const contactFormSchema = z.object({
  firstname: z.string().min(3, 'Le prénom doit faire au moins 3 caracteres.').max(20),
  lastname: z.string().min(3, 'Le nom doit faire au moins 3 caracteres.').max(20),
  email: z.string().email('Adresse email invalide.'),
  telephone: z.string().max(13),
  subject: z.string().min(5, 'Le sujet doit faire au moins 5 caracteres.').max(100),
  message: z.string().min(10, 'Le message doit faire au moins 10 caracteres.').max(500),
})