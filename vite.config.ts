import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5094',
        changeOrigin: true,
      },
    },
  },
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname}}
})
