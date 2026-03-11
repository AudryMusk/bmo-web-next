'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function TopProgressBar() {
  const pathname = usePathname()
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)
  const interval = useRef<ReturnType<typeof setInterval> | null>(null)
  const finishing = useRef(false)

  // ── Helpers ──────────────────────────────────────────────────────────────
  const start = () => {
    if (finishing.current) return
    finishing.current = false
    setWidth(0)
    setVisible(true)

    let w = 0
    if (interval.current) clearInterval(interval.current)
    interval.current = setInterval(() => {
      // Ralentit exponentiellement → jamais 100% avant la fin réelle
      w += (90 - w) * 0.08
      setWidth(Math.min(w, 90))
    }, 80)
  }

  const finish = () => {
    if (interval.current) clearInterval(interval.current)
    finishing.current = true
    setWidth(100)
    setTimeout(() => {
      setVisible(false)
      setWidth(0)
      finishing.current = false
    }, 400)
  }

  // ── Déclenche start au clic sur <Link> ou <a> interne ────────────────────
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      // Ignore liens externes, ancres, mailto, tel
      if (!href || href.startsWith('http') || href.startsWith('#') ||
          href.startsWith('mailto') || href.startsWith('tel')) return
      // Ignore si même page
      if (href === pathname) return
      start()
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [pathname])

  // ── Termine quand la route change effectivement ───────────────────────────
  const prevPath = useRef(pathname)
  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname
      finish()
    }
  }, [pathname])

  if (!visible) return null

  return (
    <>
      {/* Barre fine en haut */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          height: '3px',
          width: `${width}%`,
          transition: width === 100
            ? 'width 0.15s ease, opacity 0.35s ease 0.15s'
            : 'width 0.08s linear',
          opacity: width === 100 ? 0 : 1,
          background: 'linear-gradient(90deg, #f97316, #f59e0b)',
          borderRadius: '0 2px 2px 0',
          boxShadow: '0 0 8px 2px rgba(249,115,22,0.45)',
        }}
      />

      {/* Logo BMO centré en overlay semi-transparent */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: width === 100 ? 0 : 1,
          transition: 'opacity 0.35s ease',
          pointerEvents: 'none',
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Ping extérieur */}
          <span style={{
            position: 'absolute',
            width: '5rem', height: '5rem',
            borderRadius: '50%',
            background: 'rgba(249,115,22,0.15)',
            animation: 'ping 1.2s cubic-bezier(0,0,0.2,1) infinite',
          }} />
          {/* Ping intermédiaire décalé */}
          <span style={{
            position: 'absolute',
            width: '3.5rem', height: '3.5rem',
            borderRadius: '50%',
            background: 'rgba(249,115,22,0.1)',
            animation: 'ping 1.2s cubic-bezier(0,0,0.2,1) infinite',
            animationDelay: '0.2s',
          }} />
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bmo-icon.png"
            alt="Chargement B-MO"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '3.5rem',
              height: '3.5rem',
              borderRadius: '0.875rem',
              boxShadow: '0 4px 20px rgba(249,115,22,0.25)',
              animation: 'bmo-pulse 1.4s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes bmo-pulse {
          0%, 100% { transform: scale(1);    opacity: 1; }
          50%       { transform: scale(1.08); opacity: 0.8; }
        }
      `}</style>
    </>
  )
}

