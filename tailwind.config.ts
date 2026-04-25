import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/types/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        'primary-dark': "var(--primary-dark)",
        'accent-green': "var(--accent-green)",
        'accent-gold': "var(--accent-gold)",
        'bg-parchment': "var(--bg-parchment)",
        'bg-sage': "var(--bg-sage)",
        'text-primary': "var(--text-primary)",
        'text-secondary': "var(--text-secondary)",
        'text-tertiary': "var(--text-tertiary)",
        'text-link': "var(--text-link)",
      },
      fontFamily: {
        'telugu-heading': ['Gurajada', 'sans-serif'],
        'telugu-body': ['Ramabhadra', 'sans-serif'],
        'english-heading': ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(26, 26, 26, 0.06)',
        'elevated': '0 8px 30px rgba(243, 112, 33, 0.15)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
