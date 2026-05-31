/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#000000',
        'bg-secondary': '#111111',
        'accent': '#C3FF33',
        'accent-dim': 'rgba(195,255,51,0.35)',
        'text-primary': '#FFFFFF',
        'text-muted': '#A0A0A0',
        'border-subtle': 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        'display': ['"Bebas Neue"', 'sans-serif'],
        'body': ['"DM Sans"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(195,255,51,0.35)',
        'glow-lg': '0 0 60px rgba(195,255,51,0.25)',
        'glow-sm': '0 0 10px rgba(195,255,51,0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(195,255,51,0.3)' },
          '50%': { boxShadow: '0 0 50px rgba(195,255,51,0.6)' },
        },
      },
    },
  },
  plugins: [],
}
