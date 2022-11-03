import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    port: 3000,
  },
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
  },
  plugins: [vue()],
  build: { target: 'es2020' },
  optimizeDeps: {
    esbuildOptions: { target: 'es2020', supported: { bigint: true } },
  },
})
