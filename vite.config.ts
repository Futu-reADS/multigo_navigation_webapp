import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    // PWA plugin configured to be usable in dev for E2E testing and to precache routes
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'icons/*'],
      devOptions: {
        enabled: true
      },
      strategies: 'generateSW',
      workbox: {
        // Pre-cache the SPA routes so they can be served while offline during E2E tests
        additionalManifestEntries: ['/login', '/admin', '/nurse', '/caregiver']
      },
      manifest: {
        name: 'Multigo Navigation Webapp',
        short_name: 'Multigo',
        start_url: '/login',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0b5fff',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ]
})
