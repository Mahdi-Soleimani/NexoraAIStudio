import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/py1/', // حیاتی: این خط باعث می‌شود سایت در ساب‌فولدر درست کار کند
  build: {
    outDir: 'dist',
  }
});