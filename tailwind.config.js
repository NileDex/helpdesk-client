/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        typingBounce: {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.55' },
          '30%': { transform: 'translateY(-6px)', opacity: '1' },
        },
      },
      animation: {
        typing: 'typingBounce 1.3s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
