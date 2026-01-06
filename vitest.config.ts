import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['tests/unit/**/*.spec.*'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/unit/setup.ts']
  }
})
