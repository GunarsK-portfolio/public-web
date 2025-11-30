import { marked } from 'marked'
import DOMPurify from 'dompurify'
import mermaid from 'mermaid'

// Initialize mermaid with theme that works in light/dark mode
mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'strict',
  fontFamily: 'inherit',
})

// Custom renderer for mermaid code blocks
const renderer = new marked.Renderer()
const originalCodeRenderer = renderer.code.bind(renderer)

let mermaidCounter = 0

renderer.code = function (code) {
  // Handle both old and new marked API (code can be string or object)
  const text = typeof code === 'object' ? code.text : code
  const lang = typeof code === 'object' ? code.lang : arguments[1]

  if (lang === 'mermaid') {
    const id = `mermaid-${mermaidCounter++}`
    return `<div class="mermaid-container"><pre class="mermaid" id="${id}">${text}</pre></div>`
  }
  return originalCodeRenderer(code)
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

/**
 * Initialize mermaid diagrams in the DOM
 * Call this after the markdown content is mounted
 */
export async function initMermaidDiagrams() {
  try {
    await mermaid.run({
      querySelector: '.mermaid',
    })
  } catch (error) {
    console.error('Mermaid rendering error:', error)
  }
}
