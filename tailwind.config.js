/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary), 0.05)',
          100: 'rgb(var(--color-primary), 0.1)',
          200: 'rgb(var(--color-primary), 0.2)',
          300: 'rgb(var(--color-primary), 0.3)',
          400: 'rgb(var(--color-primary), 0.4)',
          500: 'rgb(var(--color-primary), 0.5)',
          600: 'rgb(var(--color-primary), 0.8)',
          700: 'rgb(var(--color-primary), 0.9)',
          800: 'rgb(var(--color-primary), 0.95)',
          900: 'rgb(var(--color-primary), 1)',
        },
        secondary: {
          50: 'rgb(var(--color-secondary), 0.05)',
          100: 'rgb(var(--color-secondary), 0.1)',
          200: 'rgb(var(--color-secondary), 0.2)',
          300: 'rgb(var(--color-secondary), 0.3)',
          400: 'rgb(var(--color-secondary), 0.4)',
          500: 'rgb(var(--color-secondary), 0.5)',
          600: 'rgb(var(--color-secondary), 0.8)',
          700: 'rgb(var(--color-secondary), 0.9)',
          800: 'rgb(var(--color-secondary), 0.95)',
          900: 'rgb(var(--color-secondary), 1)',
        },
        accent: {
          50: 'rgb(var(--color-accent), 0.05)',
          100: 'rgb(var(--color-accent), 0.1)',
          200: 'rgb(var(--color-accent), 0.2)',
          300: 'rgb(var(--color-accent), 0.3)',
          400: 'rgb(var(--color-accent), 0.4)',
          500: 'rgb(var(--color-accent), 0.5)',
          600: 'rgb(var(--color-accent), 0.8)',
          700: 'rgb(var(--color-accent), 0.9)',
          800: 'rgb(var(--color-accent), 0.95)',
          900: 'rgb(var(--color-accent), 1)',
        },
        neutral: {
          50: 'rgb(var(--color-neutral), 1)',
          100: 'rgb(var(--color-neutral), 0.95)',
          200: 'rgb(var(--color-neutral), 0.9)',
          300: 'rgb(var(--color-neutral), 0.8)',
          400: 'rgb(var(--color-neutral), 0.7)',
          500: 'rgb(var(--color-neutral), 0.6)',
          600: 'rgb(var(--color-neutral), 0.5)',
          700: 'rgb(var(--color-neutral), 0.4)',
          800: 'rgb(var(--color-neutral), 0.3)',
          900: 'rgb(var(--color-dark), 1)',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          700: '#15803d',
        },
        warning: {
          50: '#fefce8',
          100: '#fef9c3',
          500: '#eab308',
          700: '#a16207',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          700: '#b91c1c',
        }
      },
      fontFamily: {
        amiri: ['Amiri', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};