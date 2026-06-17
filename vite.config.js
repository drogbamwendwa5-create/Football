import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: "./",
    plugins: [
      react(),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'https://api.football-data.org/v4',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('X-Auth-Token', env.VITE_FOOTBALL_API_KEY || '485aafd43cb2409695838c24d67d59a6')
            })
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log('PROXY STATUS:', proxyRes.statusCode, req.url)
            })
          }
        }
      }
    }
  }
})