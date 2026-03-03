'use client'

import { useFormStatus } from 'react-dom'

/**
 * SubmitButton — bouton de soumission de formulaire React 18.
 * Utilise useFormStatus (doit être un enfant direct du <form>).
 * Props : loadingText, disabled (extra), className, ...rest
 */
export default function SubmitButton({ children, loadingText, disabled, className, ...props }) {
  const { pending } = useFormStatus()
  const isDisabled = pending || disabled
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
