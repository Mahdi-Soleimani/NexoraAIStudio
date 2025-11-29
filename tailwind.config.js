/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",           // فایل‌های اصلی در روت مثل App.tsx
    "./pages/**/*.{js,ts,jsx,tsx}",  // تمام فایل‌های داخل پوشه pages
    "./components/**/*.{js,ts,jsx,tsx}", // تمام فایل‌های داخل پوشه components
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617',
        surface: '#0f172a',
        primary: '#7c3aed',
        secondary: '#2dd4bf',
      },
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif'],
      }
    },
  },
  plugins: [],
}