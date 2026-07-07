/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#08080F',
        foreground: '#F0F0FF',
        card: '#0E0E1A',
        'card-hover': '#141428',
        border: 'rgba(0, 212, 255, 0.08)',
        muted: 'rgba(240, 240, 255, 0.45)',
        accent: '#00D4FF',
        'accent-purple': '#7B2FFF',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, #00D4FF, #7B2FFF)',
      },
    },
  },
  plugins: [],
}
