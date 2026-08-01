import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { render } from '../dist-ssr/entry-server.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(projectRoot, 'dist')
const templatePath = path.join(distDir, 'index.html')
const defaultTitle = 'Veteran Support in Bristol, TN | VETS4VETS26'
const defaultDescription = 'VETS4VETS26 provides practical support for veterans in Bristol, Tennessee, including help with bills, housing, food, recovery resources, and more.'
const defaultCanonical = 'https://vets-4-vets.com/'
const routes = {
  '/': {
    title: defaultTitle,
    description: defaultDescription,
  },
  '/mission': {
    title: 'Our Mission for Veterans | VETS4VETS26 Bristol, TN',
    description: 'Learn how VETS4VETS26 helps veterans in Bristol, Tennessee overcome life challenges with respectful, practical support and community connections.',
  },
  '/services': {
    title: 'Veteran Assistance Services | VETS4VETS26 Bristol, TN',
    description: 'Explore VETS4VETS26 assistance for veterans, including help with bills, housing, food, addiction recovery resources, and other urgent needs.',
  },
  '/contact': {
    title: 'Contact VETS4VETS26 | Veteran Help in Bristol, TN',
    description: 'Contact VETS4VETS26 in Bristol, Tennessee for veteran assistance. Call 423-526-1254, email us, or submit a confidential support request.',
  },
}

let template = await readFile(templatePath, 'utf8')
const stylesheetTag = template.match(
  /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/,
)

if (!stylesheetTag) throw new Error('Could not find the production stylesheet')

const stylesheetPath = path.join(distDir, stylesheetTag[1].replace(/^\//, ''))
const stylesheet = (await readFile(stylesheetPath, 'utf8')).replaceAll(
  '</style',
  '<\\/style',
)

template = template.replace(stylesheetTag[0], `<style>${stylesheet}</style>`)

const moduleScript = template.match(
  /<script type="module" crossorigin src="[^"]+"><\/script>/,
)

if (!moduleScript) throw new Error('Could not find the production module script')

const deferredModuleScript = moduleScript[0].replace(
  'crossorigin',
  'crossorigin fetchpriority="low"',
)

template = template
  .replace(moduleScript[0], '')
  .replace('</body>', `${deferredModuleScript}\n  </body>`)

for (const [route, metadata] of Object.entries(routes)) {
  const markup = render(route).replace(
    /<link rel="preload" as="image"[^>]+\/>/g,
    '',
  )
  const canonical = route === '/' ? defaultCanonical : `${defaultCanonical}${route.slice(1)}/`
  const html = template
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replaceAll(defaultTitle, metadata.title)
    .replaceAll(defaultDescription, metadata.description)
    .replace(
      `<link rel="canonical" href="${defaultCanonical}" />`,
      `<link rel="canonical" href="${canonical}" />`,
    )
    .replace(
      `<meta property="og:url" content="${defaultCanonical}" />`,
      `<meta property="og:url" content="${canonical}" />`,
    )
  const outputDir = route === '/' ? distDir : path.join(distDir, route.slice(1))

  await mkdir(outputDir, { recursive: true })
  await writeFile(path.join(outputDir, 'index.html'), html)
}
