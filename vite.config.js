import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CATALOGO_PATH = path.resolve(__dirname, 'public/catalogo.json')

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'catalogo-api',
      configureServer(server) {
        server.middlewares.use('/api/catalogo', (req, res) => {
          res.setHeader('Content-Type', 'application/json')

          if (req.method === 'GET') {
            const content = fs.readFileSync(CATALOGO_PATH, 'utf-8')
            res.end(content)
            return
          }

          if (req.method === 'PUT') {
            let body = ''
            req.on('data', chunk => { body += chunk })
            req.on('end', () => {
              fs.writeFileSync(CATALOGO_PATH, body, 'utf-8')
              res.end(JSON.stringify({ ok: true }))
            })
            return
          }

          res.statusCode = 405
          res.end()
        })
      },
    },
  ],
  base: '/registrar/',
})
