import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE_URL = 'https://gunarsk.com'

// API URL from environment variable
const API_URL = process.env.VITE_API_URL

if (!API_URL) {
  console.warn('Warning: VITE_API_URL not set, skipping sitemap generation')
  process.exit(0)
}

async function fetchFromApi(endpoint, timeoutMs = 30000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      signal: controller.signal,
    })
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }
    return response.json()
  } finally {
    clearTimeout(timeoutId)
  }
}

async function fetchData() {
  console.log(`Fetching data from API: ${API_URL}`)

  const [projects, themes] = await Promise.all([
    fetchFromApi('/projects'),
    fetchFromApi('/miniatures/themes'),
  ])

  // Fetch each theme to get its miniatures
  const themesWithMiniatures = await Promise.all(
    themes.map((theme) => fetchFromApi(`/miniatures/themes/${theme.id}`))
  )

  // Collect all unique miniatures from all themes
  const miniatureMap = new Map()
  for (const theme of themesWithMiniatures) {
    if (theme.miniatures) {
      for (const mini of theme.miniatures) {
        miniatureMap.set(mini.id, mini)
      }
    }
  }
  const miniatures = Array.from(miniatureMap.values())

  return { projects, miniatures, themes }
}

async function main() {
  const { projects, miniatures, themes } = await fetchData()

  // Static routes with their priorities
  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'monthly' },
    { path: '/projects', priority: '0.8', changefreq: 'weekly' },
    { path: '/miniatures', priority: '0.8', changefreq: 'weekly' },
    { path: '/contact', priority: '0.5', changefreq: 'yearly' },
  ]

  // Build dynamic routes
  const dynamicRoutes = [
    ...projects.map((p) => ({
      path: `/projects/${p.id}`,
      priority: p.featured ? '0.8' : '0.6',
      changefreq: 'monthly',
    })),
    ...themes.map((t) => ({
      path: `/miniatures/themes/${t.id}`,
      priority: '0.7',
      changefreq: 'monthly',
    })),
    ...miniatures.map((m) => ({
      path: `/miniatures/projects/${m.id}`,
      priority: '0.6',
      changefreq: 'monthly',
    })),
  ]

  const allRoutes = [...staticRoutes, ...dynamicRoutes]
  const today = new Date().toISOString().split('T')[0]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

  const outputPath = path.resolve(__dirname, '../public/sitemap.xml')
  fs.writeFileSync(outputPath, sitemap)

  console.log(`Sitemap generated with ${allRoutes.length} URLs at ${outputPath}`)
  console.log(`  - Static routes: ${staticRoutes.length}`)
  console.log(`  - Projects: ${projects.length}`)
  console.log(`  - Themes: ${themes.length}`)
  console.log(`  - Miniatures: ${miniatures.length}`)
}

main().catch((error) => {
  console.warn('Warning: Failed to generate sitemap:', error.message)
  console.warn('Sitemap can be regenerated via the sitemap workflow')
  process.exit(0)
})
