import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [
    {
      name: 'php-reload',
      handleHotUpdate({ file, server }) {
        // Reload halaman jika ada perubahan file PHP
        if (file.endsWith('.php')) {
          server.ws.send({ type: 'full-reload' });
        }
      },
    },
  ],
  build: {
    // Hasil build disimpan di folder public/build
    outDir: 'public/build',
    emptyOutDir: true,
    manifest: true, // Penting untuk PHP membaca file hasil build
    rollupOptions: {
      input: 'resources/js/main.js', // Entry point utama
    },
  },
  server: {
    // Konfigurasi server development
    strictPort: true,
    port: 5173,
    origin: 'http://localhost:5173'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources'),
    },
  },
});
