/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#050505',
        'bg-card': '#0F172A',
        'bg-card-hover': '#1a2540',
        'accent-pink': '#FF007A',
        'accent-pink-hover': '#FF4DB2',
        'accent-purple': '#9B00FF',
        'accent-blue': '#3A00FF',
        'text-primary': '#FFFFFF',
        'text-secondary': '#9CA3AF',
        'border-subtle': '#1E293B',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #FF007A, #9B00FF, #3A00FF)',
        'gradient-cta': 'linear-gradient(90deg, #FF007A, #FF3DAA)',
        'gradient-hero': 'radial-gradient(ellipse at 50% 0%, rgba(155,0,255,0.15) 0%, transparent 60%)',
        'gradient-glow': 'radial-gradient(ellipse at center, rgba(255,0,122,0.2) 0%, transparent 70%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'scroll-left': 'scrollLeft 30s linear infinite',
        'scroll-right': 'scrollRight 30s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scrollRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,0,122,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255,0,122,0.6)' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(255,0,122,0.2)',
        'glow-pink': '0 0 30px rgba(255,0,122,0.4)',
        'glow-purple': '0 0 30px rgba(155,0,255,0.4)',
      },
    },
  },
  plugins: [],
}
