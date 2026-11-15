import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
// VITE_BASE lets GitHub Pages serve the app under /<repo-name>/ while local
// dev keeps '/'. Set in .env.production by the Pages workflow, or manually.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: env.VITE_BASE || '/',
  }
})
