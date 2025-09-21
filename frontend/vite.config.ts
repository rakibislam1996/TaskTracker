import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-relay', { artifactDirectory: './src/__generated__' }]]
      }
    })
  ]
});
