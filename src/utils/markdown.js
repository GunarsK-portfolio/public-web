import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true,
})

/**
 * Renders markdown to sanitized HTML
 * @param {string} markdown - Markdown content to render
 * @returns {string} Sanitized HTML string
 */
export function renderMarkdown(markdown) {
  if (!markdown) return ''
  const rawHtml = marked(markdown)
  return DOMPurify.sanitize(rawHtml)
}
