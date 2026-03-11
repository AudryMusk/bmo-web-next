'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

interface BlogCarouselProps {
  images: string[]
}

export default function BlogCarousel({ images }: BlogCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: false,
  })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!images.length) return null

  return (
    <div className="not-prose my-10 w-full select-none overflow-hidden">
      {/* Compteur */}
      <div className="flex justify-between items-center px-4 mb-4 max-w-2xl mx-auto">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Galerie</span>
        <span className="text-sm font-semibold text-slate-400">
          <span className="text-slate-700 text-base">{String(current + 1).padStart(2, '0')}</span>
          <span className="mx-1">/</span>
          {String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* Track */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-3 px-[15%]">
            {images.map((src, i) => {
              const isActive = i === current
              return (
                <div
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  style={{
                    flex: '0 0 70%',
                    transition: 'transform 0.4s ease, opacity 0.4s ease',
                    transform: isActive ? 'scale(1)' : 'scale(0.88)',
                    opacity: isActive ? 1 : 0.5,
                    cursor: isActive ? 'default' : 'pointer',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    position: 'relative',
                    paddingBottom: '70%',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Photo ${i + 1}`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      margin: 0,
                      borderRadius: 0,
                      boxShadow: 'none',
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Gradient overlay — fades the hard clip on side slides into the page background */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, white 0, transparent 2rem, transparent calc(100% - 2rem), white 100%)',
          }}
        />
      </div>

      {/* Contrôles + dots */}
      <div className="flex items-center justify-center gap-6 mt-5">
        <button
          onClick={prev}
          aria-label="Image précédente"
          className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors border-0 cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-2 items-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Image ${i + 1}`}
              style={{
                width: i === current ? '1.5rem' : '0.375rem',
                height: '0.375rem',
                borderRadius: '9999px',
                background: i === current ? '#1e293b' : '#cbd5e1',
                border: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Image suivante"
          className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors border-0 cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
