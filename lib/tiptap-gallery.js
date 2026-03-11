import { Node, mergeAttributes } from '@tiptap/core'

/**
 * Extension Tiptap "Gallery"
 * Stocke un tableau d'URLs dans l'attribut `data-gallery` (JSON).
 * Rendu HTML : <div data-gallery="[...]" class="tiptap-gallery"></div>
 */
export const Gallery = Node.create({
  name: 'gallery',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      images: {
        default: [],
        parseHTML: (el) => {
          try { return JSON.parse(el.getAttribute('data-gallery') ?? '[]') }
          catch { return [] }
        },
        renderHTML: (attrs) => ({ 'data-gallery': JSON.stringify(attrs.images) }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-gallery]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ class: 'tiptap-gallery' }, HTMLAttributes)]
  },

  addCommands() {
    return {
      insertGallery: (images) => ({ commands }) => {
        return commands.insertContent({ type: 'gallery', attrs: { images } })
      },
      updateGallery: (images) => ({ commands, state }) => {
        // Met à jour le nœud gallery sélectionné ou le premier trouvé
        const { tr } = state
        let updated = false
        state.doc.descendants((node, pos) => {
          if (node.type.name === 'gallery' && !updated) {
            tr.setNodeMarkup(pos, undefined, { images })
            updated = true
          }
        })
        if (updated) {
          commands.setMeta('updated', true)
          return true
        }
        return false
      },
    }
  },
})
