/**
 * postbuild: copy dist/index.html into every route directory so GitHub Pages
 * serves each URL with HTTP 200 instead of falling back to 404.html.
 *
 * Without this, GitHub Pages returns HTTP 404 for any deep URL
 * (e.g. /what/art-and-commerce) even though the 404.html JS-redirect trick
 * makes it work in a browser — Google still sees the 404 status and refuses
 * to index the page.
 */

import { cpSync, mkdirSync } from 'fs'
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
  'what/sailpoint-dashboard',
  'what/sailpoint-workflows',
  'what/tekmetric',
  'what/uber',
  'what/orange-logic',
  'what/art-and-commerce',
]

for (const route of routes) {
  const dir = join(dist, route)
  mkdirSync(dir, { recursive: true })
  cpSync(join(dist, 'index.html'), join(dir, 'index.html'))
  console.log(`  copied → dist/${route}/index.html`)
}

console.log(`\n✓ ${routes.length} route index files written`)
