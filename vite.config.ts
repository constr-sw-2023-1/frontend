import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, "./src/assets"),
      '@components': path.resolve(__dirname, "./src/components"),
      '@contexts': path.resolve(__dirname, "./src/contexts"),
      '@hooks': path.resolve(__dirname, "./src/hooks"),
      '@services': path.resolve(__dirname, "./src/services"),
      '@utils': path.resolve(__dirname, "./src/utils"),
      '@theme': path.resolve(__dirname, "./src/theme"),
      '@shared': path.resolve(__dirname, "./src/shared"),
      '@routes': path.resolve(__dirname, "./src/routes"),
      '@pages': path.resolve(__dirname, "./src/pages"),
    }
  }
})