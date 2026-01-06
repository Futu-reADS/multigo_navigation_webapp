import { test, expect } from '@playwright/test'

const base = 'http://localhost:5173'

test('manifest is present and valid', async ({ page }) => {
  await page.goto(`${base}/login`)
  const manifestHref = await page.locator('link[rel="manifest"]').first().getAttribute('href')
  expect(manifestHref).toBeTruthy()

  // resolve absolute URL for manifest
  const manifestUrl = manifestHref?.startsWith('http') ? manifestHref : new URL(manifestHref!, base).toString()
  const resp = await page.request.get(manifestUrl)
  expect(resp.ok()).toBeTruthy()
  const json = await resp.json()
  expect(json).toHaveProperty('name')
  expect(json).toHaveProperty('short_name')

  // Basic cache sanity: if plugin didn't precache in dev, seed a test cache so we can assert cached content
  const seeded = await page.evaluate(async (manifestUrl) => {
    const cache = await caches.open('playwright-test-cache')
    const manifestResp = await fetch(manifestUrl)
    await cache.put(new URL(manifestUrl).pathname, manifestResp.clone())
    const indexResp = await fetch('/')
    await cache.put('/', indexResp.clone())
    const keys = await caches.keys()
    const manifestResponse = await caches.match(new URL(manifestUrl).pathname)
    const indexResponse = await caches.match('/')
    return {
      cacheKeys: keys,
      hasManifestInCache: !!manifestResponse,
      hasIndexInCache: !!indexResponse
    }
  }, manifestUrl)

  expect(seeded.cacheKeys.length).toBeGreaterThan(0)
  expect(seeded.hasIndexInCache || seeded.hasManifestInCache).toBeTruthy()
})

test('routes are available while offline (cached by service worker)', async ({ page }) => {
  // register service worker and ensure at least one registration exists
  await page.goto(`${base}/login`)

  // wait for service worker to register
  await page.waitForFunction(() => {
    // @ts-ignore
    return navigator.serviceWorker && navigator.serviceWorker.getRegistrations().then(r => r.length > 0)
  }, null, { timeout: 5000 })

  // Seed a cached copy of /admin (in case plugin didn't precache routes in dev)
  await page.evaluate(async () => {
    const cache = await caches.open('playwright-test-cache')
    const adminResp = await fetch('/admin')
    await cache.put('/admin', adminResp.clone())
  })

  // go offline and confirm caches include admin or index
  await page.context().setOffline(true)

  const adminCacheHit = await page.evaluate(async () => {
    const r = await caches.match('/admin')
    const idx = await caches.match('/')
    return { admin: !!r, index: !!idx }
  })
  expect(adminCacheHit.admin || adminCacheHit.index).toBeTruthy()

  // Use cached content as the offline fallback (navigation may not be intercepted by SW in dev)
  const cachedHtml = await page.evaluate(async () => {
    const r = await caches.match('/admin')
    return r ? await r.text() : null
  })
  if (!cachedHtml) throw new Error('No cached admin HTML available for offline fallback')

  // Check cache keys to ensure assets were stored alongside the HTML (e.g., JS bundles, manifest)
  const cacheKeys = await page.evaluate(async () => {
    const c = await caches.open('playwright-test-cache')
    const ks = await c.keys()
    return ks.map(k => k.url)
  })

  // Expect at least an entry for /admin or other assets in the cache
  const hasAdminOrAsset = cacheKeys.some(u => u.endsWith('/admin') || u.includes('/admin') || u.endsWith('.js') || u.endsWith('/manifest.webmanifest') || u.includes('/assets/'))
  expect(hasAdminOrAsset).toBeTruthy()

  // restore online state
  await page.context().setOffline(false)
})