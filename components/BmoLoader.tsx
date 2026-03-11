'use client'

import { useLoading } from '@/context/LoadingContext'

export default function BmoLoader() {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <>
      <div
        aria-busy="true"
        aria-label="Chargement en cours"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Anneau extérieur ping */}
          <span style={{
            position: 'absolute',
            width: '5.5rem', height: '5.5rem',
            borderRadius: '50%',
            background: 'rgba(249,115,22,0.15)',
            animation: 'bmo-ping 1.3s cubic-bezier(0,0,0.2,1) infinite',
          }} />
          {/* Anneau intermédiaire décalé */}
          <span style={{
            position: 'absolute',
            width: '4rem', height: '4rem',
            borderRadius: '50%',
            background: 'rgba(249,115,22,0.10)',
            animation: 'bmo-ping 1.3s cubic-bezier(0,0,0.2,1) infinite',
            animationDelay: '0.25s',
          }} />
          {/* Logo B-MO */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bmo-icon.png"
            alt="Chargement B-MO"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '3.75rem',
              height: '3.75rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 24px rgba(249,115,22,0.3)',
              animation: 'bmo-pulse 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes bmo-ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes bmo-pulse {
          0%, 100% { transform: scale(1);     opacity: 1;   }
          50%       { transform: scale(1.1);  opacity: 0.75; }
        }
      `}</style>
    </>
  )
}
