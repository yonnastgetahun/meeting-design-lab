import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
        'pulse-gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'ibm-plex': ['IBM Plex Sans', 'sans-serif'],
        'dm-serif': ['DM Serif Display', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'pulse-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #FF9F40 50%, #B5EAD7 100%)',
      },
    },
  },
  plugins: [],
};

export default config;