'use client'

import { useFormStatus } from 'react-dom'
import { useEffect } from 'react'
import { useLoading } from '@/context/LoadingContext'

/**
 * SubmitButton — bouton de soumission de formulaire React 18.
 * Utilise useFormStatus (doit être un enfant direct du <form>).
 * Props : loadingText, disabled (extra), className, ...rest
 * Déclenche automatiquement le BmoLoader global pendant la soumission.
 */
export default function SubmitButton({ children, loadingText, disabled, className, ...props }) {
  const { pending } = useFormStatus()
  const { show, hide } = useLoading()
  const isDisabled = pending || disabled

  // Synchronise le loader global avec l'état pending du formulaire
  useEffect(() => {
    if (pending) show()
    else hide()
  }, [pending])

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={className}
      {...props}
    >
      {pending ? (loadingText ?? 'Chargement…') : children}
    </button>
  )
}
