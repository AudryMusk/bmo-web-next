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
export default function SubmitButton({ children, loadingText, disabled, forceLoading, className, ...props }) {
  const { pending } = useFormStatus()
  const { show, hide } = useLoading()
  const isLoading = pending || forceLoading
  const isDisabled = isLoading || disabled

  useEffect(() => {
    if (isLoading) show()
    else hide()
  }, [isLoading])

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={className}
      {...props}
    >
      {isLoading ? (loadingText ?? 'Chargement…') : children}
    </button>
  )
}
