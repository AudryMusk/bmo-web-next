'use client'

import BlogCarousel from '@/components/BlogCarousel'

interface ArticleContentProps {
  html: string
  className?: string
}

/**
 * Remplace les blocs <div data-gallery="[...]"> par des BlogCarousel React.
 * Le reste du HTML est rendu normalement via dangerouslySetInnerHTML.
 */
export default function ArticleContent({ html, className }: ArticleContentProps) {
  // Regex pour extraire les blocs galerie
  const galleryRegex = /<div[^>]+data-gallery="([^"]*)"[^>]*><\/div>/g

  const parts: Array<{ type: 'html' | 'gallery'; content: string }> = []
  let last = 0
  let match: RegExpExecArray | null

  while ((match = galleryRegex.exec(html)) !== null) {
    // Texte HTML avant ce bloc galerie
    if (match.index > last) {
      parts.push({ type: 'html', content: html.slice(last, match.index) })
    }
    // Données de la galerie (JSON échappé dans l'attribut HTML)
    parts.push({ type: 'gallery', content: match[1] })
    last = match.index + match[0].length
  }

  // HTML restant après le dernier bloc galerie
  if (last < html.length) {
    parts.push({ type: 'html', content: html.slice(last) })
  }

  // Cas simple : aucun bloc galerie
  if (parts.length === 0 || (parts.length === 1 && parts[0].type === 'html')) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <div className={className}>
      {parts.map((part, i) => {
        if (part.type === 'gallery') {
          let images: string[] = []
          try {
            // L'attribut HTML échappe &quot; → on doit le décoder
            const decoded = part.content
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/&amp;/g, '&')
            images = JSON.parse(decoded)
          } catch {
            images = []
          }
          return <BlogCarousel key={i} images={images} />
        }
        return (
          <div
            key={i}
            dangerouslySetInnerHTML={{ __html: part.content }}
          />
        )
      })}
    </div>
  )
}
