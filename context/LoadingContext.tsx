'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'

interface LoadingContextValue {
  show: () => void
  hide: () => void
  isLoading: boolean
}

const LoadingContext = createContext<LoadingContextValue>({
  show: () => {},
  hide: () => {},
  isLoading: false,
})

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  // Compteur de requêtes en vol — évite les hide() prématurés si deux actions tournent en parallèle
  const count = useRef(0)

  const show = useCallback(() => {
    count.current += 1
    setIsLoading(true)
  }, [])

  const hide = useCallback(() => {
    count.current = Math.max(0, count.current - 1)
    if (count.current === 0) setIsLoading(false)
  }, [])

  return (
    <LoadingContext.Provider value={{ show, hide, isLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  return useContext(LoadingContext)
}

/**
 * Wrapper utilitaire : entoure n'importe quelle server action
 * pour afficher/masquer le loader automatiquement.
 *
 * Usage :
 *   const { withLoading } = useLoading()
 *   await withLoading(() => myAction(formData))
 */
export function useWithLoading() {
  const { show, hide } = useLoading()

  const withLoading = useCallback(
    async <T,>(fn: () => Promise<T>): Promise<T> => {
      show()
      try {
        return await fn()
      } finally {
        hide()
      }
    },
    [show, hide],
  )

  return { withLoading }
}
