import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { getStoredTheme, THEMES } from '../composables/useTheme'

// Custom renderer for mermaid code blocks
const renderer = new marked.Renderer()
const originalCodeRenderer = renderer.code.bind(renderer)

let mermaidCounter = 0

renderer.code = function (code, ...rest) {
  // Handle both old and new marked API (code can be string or object)
  const text = typeof code === 'object' ? code.text : code
  const lang = typeof code === 'object' ? code.lang : rest[0]

  if (lang === 'mermaid') {
    const id = `mermaid-${mermaidCounter++}`
    return `<div class="mermaid-container"><pre class="mermaid" id="${id}">${text}</pre></div>`
  }
  return originalCodeRenderer(code, ...rest)
}

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true,
  renderer,
})

/**
 * Renders markdown to sanitized HTML
 * @param {string} markdown - Markdown content to render
 * @returns {string} Sanitized HTML string
 */
export function renderMarkdown(markdown) {
  if (!markdown) return ''
  mermaidCounter = 0 // Reset counter for each render
  const rawHtml = marked(markdown)
  // Allow mermaid-specific attributes
  return DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ['pre'],
    ADD_ATTR: ['class', 'id'],
  })
}

// Lazy-loaded mermaid instance
let mermaidInstance = null
// Store original diagram sources for re-rendering
const diagramSources = new Map()

/**
 * Get mermaid theme based on current app theme
 */
function getMermaidTheme() {
  return getStoredTheme() === THEMES.DARK ? 'dark' : 'default'
}

/**
 * Shared rendering logic for mermaid diagrams
 */
async function renderDiagrams() {
  mermaidInstance.initialize({
    startOnLoad: false,
    theme: getMermaidTheme(),
    securityLevel: 'strict',
    fontFamily: 'inherit',
  })

  await mermaidInstance.run({
    querySelector: '.mermaid',
  })
}

/**
 * Initialize mermaid diagrams in the DOM
 * Lazy-loads mermaid library for better initial page load
 * Call this after the markdown content is mounted
 */
export async function initMermaidDiagrams() {
  const diagrams = document.querySelectorAll('.mermaid')
  if (!diagrams.length) return

  try {
    // Lazy load mermaid only when needed
    if (!mermaidInstance) {
      const mermaidModule = await import('mermaid')
      mermaidInstance = mermaidModule.default
    }

    // Store original sources before first render
    diagrams.forEach((el) => {
      if (!diagramSources.has(el.id) && el.textContent.trim()) {
        diagramSources.set(el.id, el.textContent.trim())
      }
    })

    await renderDiagrams()
  } catch (error) {
    console.error('Mermaid rendering error:', error)
  }
}

/**
 * Re-render mermaid diagrams with current theme
 * Call this when theme changes
 */
export async function refreshMermaidTheme() {
  const diagrams = document.querySelectorAll('.mermaid')
  if (!diagrams.length || !mermaidInstance) return

  try {
    // Restore original sources and clear rendered SVGs
    diagrams.forEach((el) => {
      const source = diagramSources.get(el.id)
      if (source) {
        el.removeAttribute('data-processed')
        el.innerHTML = source
      }
    })

    await renderDiagrams()
  } catch (error) {
    console.error('Mermaid theme refresh error:', error)
  }
}
