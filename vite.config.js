import { defineConfig } from 'vite'
import { dirname, resolve } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: './teamFinal',
  server: {
    port: 5173,
    open: true
  },
  preview: {
    port: 4173,
    open: true
  },

  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "teamFinal/homepage/index.html"),
        characterGuesser: resolve(__dirname, "teamFinal/characterGuesser/characterGuesser.html"),
        contactUs: resolve(__dirname, "teamFinal/contactUs/contactUs.html"),
        credits: resolve(__dirname, "teamFinal/creditsPage/credits.html"),
        rules: resolve(__dirname, "teamFinal/rules.html")
      }
    }
  }
})
