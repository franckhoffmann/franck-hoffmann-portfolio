/**
 * postbuild: copy dist/index.html into every route directory so GitHub Pages
 * serves each URL with HTTP 200 instead of falling back to 404.html.
 *
 * Without this, GitHub Pages returns HTTP 404 for any deep URL
 * (e.g. /what/art-and-commerce) even though the 404.html JS-redirect trick
 * makes it work in a browser — Google still sees the 404 status and refuses
 * to index the page.
 *
 * Each copy gets its own canonical URL, with the trailing slash GitHub Pages
 * redirects to (/who → /who/), so Google indexes every page on its own instead
 * of treating it as a duplicate of the homepage. Keep public/sitemap.xml in step.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = join(__dirname, '..', 'dist')

const routes = [
  'who',
  'how',
  'why',
  'leadership',
  'endorsements',
  'what/tekmetric-design-agent',
  'what/sailpoint-dashboard',
  'what/sailpoint-workflows',
  'what/tekmetric-marketing',
  'what/tekmetric',
  'what/uber',
  'what/orange-logic',
  'what/art-and-commerce',
]

// Routes that redirect elsewhere point Google at the page they land on
const canonicalRoute = {
  'what/tekmetric': 'what/tekmetric-marketing',
}

const canonicalTag = /<link rel="canonical" href="[^"]*" \/>/
const baseHtml = readFileSync(join(dist, 'index.html'), 'utf8')
if (!canonicalTag.test(baseHtml)) {
  console.error('✗ dist/index.html has no <link rel="canonical" href="…" /> tag to replace')
  process.exit(1)
}

for (const route of routes) {
  const dir = join(dist, route)
  mkdirSync(dir, { recursive: true })
  const canonical = `https://franckhoffmann.com/${canonicalRoute[route] ?? route}/`
  const html = baseHtml.replace(canonicalTag, `<link rel="canonical" href="${canonical}" />`)
  writeFileSync(join(dir, 'index.html'), html)
  console.log(`  written → dist/${route}/index.html (canonical: ${canonical})`)
}

console.log(`\n✓ ${routes.length} route index files written`)
