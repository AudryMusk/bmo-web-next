'use client'

import { useActionState } from 'react'
import { submitContactFormAction } from '@/actions/contact'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send, CheckCircle, Mail, Phone, MessageCircle } from 'lucide-react'
import Link from 'next/link'

type FormState = {
  success?: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
} | null

export default function ContactFormClient() {
  const [state, action, pending] = useActionState(submitContactFormAction, null) as [FormState, typeof submitContactFormAction, boolean]

  if (state?.success) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-10 text-center">
        {/* Icône animée */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full bg-green-100 animate-ping opacity-30" />
          <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        {/* Texte principal */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">Message envoyé !</h3>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
            Merci pour votre message. Notre équipe vous répondra dans les meilleurs délais.
            Un email de confirmation vous a été envoyé.
          </p>
        </div>

        {/* Séparateur */}
        <div className="w-12 h-px bg-border" />

        {/* Actions rapides */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <Link
            href="tel:+22901606087888"
            className="flex items-center justify-center gap-2 flex-1 border border-border rounded-xl px-4 py-3 text-sm font-medium hover:bg-secondary/50 transition-colors"
          >
            <Phone className="w-4 h-4 text-primary" />
            Nous appeler
          </Link>
          <Link
            href="/blog"
            className="flex items-center justify-center gap-2 flex-1 gradient-primary text-white rounded-xl px-4 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-4 h-4" />
            Voir nos articles
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-6">
      {state?.error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {state.error}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Prénom</label>
          <Input name="firstname" placeholder="Jean" className="bg-secondary/50 border-border focus:border-primary" />
          {state?.fieldErrors?.firstname && (
            <p className="text-xs text-red-500 mt-1">{state.fieldErrors.firstname[0]}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Nom</label>
          <Input name="lastname" placeholder="Assogba" className="bg-secondary/50 border-border focus:border-primary" />
          {state?.fieldErrors?.lastname && (
            <p className="text-xs text-red-500 mt-1">{state.fieldErrors.lastname[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Email</label>
        <Input name="email" type="email" placeholder="votre@email.com" className="bg-secondary/50 border-border focus:border-primary" />
        {state?.fieldErrors?.email && (
          <p className="text-xs text-red-500 mt-1">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Téléphone</label>
        <Input name="telephone" type="tel" placeholder="+229 XX XX XX XX" className="bg-secondary/50 border-border focus:border-primary" />
        {state?.fieldErrors?.telephone && (
          <p className="text-xs text-red-500 mt-1">{state.fieldErrors.telephone[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Sujet</label>
        <Input name="subject" placeholder="Objet de votre message" className="bg-secondary/50 border-border focus:border-primary" />
        {state?.fieldErrors?.subject && (
          <p className="text-xs text-red-500 mt-1">{state.fieldErrors.subject[0]}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Message</label>
        <Textarea name="message" placeholder="Comment pouvons-nous vous aider ?" rows={5} className="bg-secondary/50 border-border focus:border-primary resize-none" />
        {state?.fieldErrors?.message && (
          <p className="text-xs text-red-500 mt-1">{state.fieldErrors.message[0]}</p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={pending} className="w-full gradient-primary text-primary-foreground hover:opacity-90">
        {pending ? 'Envoi en cours...' : 'Envoyer le message'}
        <Send className="ml-2 w-4 h-4" />
      </Button>
    </form>
  )
}
