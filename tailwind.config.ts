import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pulse-coral': '#FF6B6B',
        'pulse-navy': '#1A1C33',
        'pulse-mint': '#B5EAD7',
        'pulse-cream': '#FAF3E0',
        'pulse-orange': '#FF9F40',
        'pulse-purple': '#6C5CE7',
        'pulse-teal': '#4ECDC4',
        'pulse-yellow': '#FFE66D',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-coral': 'linear-gradient(135deg, #FF6B6B 0%, #FF9F40 100%)',
        'gradient-navy': 'linear-gradient(135deg, #1A1C33 0%, #6C5CE7 100%)',
        'gradient-mint': 'linear-gradient(135deg, #B5EAD7 0%, #E8F5F0 100%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 107, 107, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config