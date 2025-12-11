/** @type {import('tailwindcss').Config} */
export default {
    content: ['./**/*.{html,tsx,ts}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
            },
            colors: {
                nexora: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    900: '#1e3a8a',
                    dark: '#0f172a',
                    card: '#1e293b',
                },
                n8n: {
                    red: '#ff6d5a',
                    node: '#ff6d5a'
                }
            }
        }
    },
    plugins: [],
}
