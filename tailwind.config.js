/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e', // Primary red
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        dark: {
          100: '#18181b',
          200: '#111113',
          300: '#0a0a0b',
        }
      },

      boxShadow: {
        glow: '0 0 20px rgba(244, 63, 94, 0.35)',
        soft: '0 10px 30px rgba(0,0,0,0.35)',
      },

      borderRadius: {
        xl2: '1rem',
        xl3: '1.5rem',
      },

      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeIn: 'fadeIn 0.6s ease-out forwards',
      },

      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
