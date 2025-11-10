import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD60A',
        secondary: '#1f2937',
        dark: '#0f172a',
        accent: '#FCA311',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#e5e7eb',
            a: {
              color: '#FFD60A',
              '&:hover': {
                color: '#FCA311',
              },
            },
          },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FFD60A 0%, #FCA311 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1f2937 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
