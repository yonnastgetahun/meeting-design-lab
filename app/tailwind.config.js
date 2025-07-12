const config = {
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
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'ibm-plex': ['IBM Plex Sans', 'sans-serif'],
        'dm-serif': ['DM Serif Display', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config