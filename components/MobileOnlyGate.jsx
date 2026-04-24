'use client'

import { useState, useEffect } from 'react'
import { Smartphone } from 'lucide-react'

export default function MobileOnlyGate() {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] bg-white hidden md:flex flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10">
        <Smartphone size={40} className="text-primary" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">Ouvrez cette page sur votre téléphone</h1>
        <p className="text-slate-500 max-w-sm leading-relaxed">
          Cette page est conçue pour être utilisée sur mobile.
        </p>
      </div>
    </div>
  )
}
