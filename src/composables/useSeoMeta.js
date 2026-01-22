import { useHead } from '@unhead/vue'
import { computed, unref } from 'vue'

const BASE_URL = 'https://gunarsk.com'
const SITE_NAME = 'Gunārs Kunakovs'
const DEFAULT_DESCRIPTION =
  'Full-stack developer specializing in Go, Vue.js, and cloud technologies.'
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`

/**
 * Composable for managing page SEO meta tags
 * @param {Object} options - SEO options (can be refs or plain values)
 * @param {string|Ref<string>} options.title - Page title
 * @param {string|Ref<string>} options.description - Page description
 * @param {string|Ref<string>} [options.image] - OG image URL
 * @param {string|Ref<string>} [options.path] - Current path for canonical URL
 * @param {string} [options.type='website'] - OG type
 */
export function useSeoMeta({ title, description, image, path, type = 'website' }) {
  useHead({
    title: computed(() => {
      const t = unref(title)
      return t ? `${t} | ${SITE_NAME}` : `${SITE_NAME} - Full-Stack Developer`
    }),
    meta: computed(() => {
      const t = unref(title) || SITE_NAME
      const d = unref(description) || DEFAULT_DESCRIPTION
      const img = unref(image) || DEFAULT_IMAGE
      const p = unref(path)
      const canonical = p ? `${BASE_URL}${p}` : BASE_URL

      return [
        { name: 'description', content: d },
        // Open Graph
        { property: 'og:title', content: t },
        { property: 'og:description', content: d },
        { property: 'og:image', content: img.startsWith('http') ? img : `${BASE_URL}${img}` },
        { property: 'og:url', content: canonical },
        { property: 'og:type', content: type },
        { property: 'og:site_name', content: SITE_NAME },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: t },
        { name: 'twitter:description', content: d },
        { name: 'twitter:image', content: img.startsWith('http') ? img : `${BASE_URL}${img}` },
      ]
    }),
    link: computed(() => {
      const p = unref(path)
      return p ? [{ rel: 'canonical', href: `${BASE_URL}${p}` }] : []
    }),
  })
}
