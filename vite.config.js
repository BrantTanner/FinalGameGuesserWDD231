import { defineConfig } from 'vite'

export default defineConfig({
  root: './teamFinal',
  server: {
    port: 5173,
    open: true
  },
  preview: {
    port: 4173,
    open: true
  }
})
