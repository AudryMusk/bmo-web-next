'use client'

import { useActionState } from 'react'
import { submitContactFormAction } from '@/actions/contact'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send, CheckCircle } from 'lucide-react'

export default function ContactFormClient() {
  const [state, action, pending] = useActionState(submitContactFormAction, null)

  if (state?.success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle className="w-14 h-14 text-green-500" />
        <h3 className="text-xl font-bold text-foreground">Message envoyé !</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Merci, nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
        </p>
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
          <Input name="lastname" placeholder="Dupont" className="bg-secondary/50 border-border focus:border-primary" />
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
