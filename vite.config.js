import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/lal/',
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['firebase/auth','firebase/firestore','react-firebase-hooks/auth','firebase/app']
    }
  }
});
