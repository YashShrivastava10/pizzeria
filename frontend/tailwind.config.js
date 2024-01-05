/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        typing: 'typing 2s steps(8), blink 1s step-end infinite',
        slideRight: 'slideRight 0.5s ease forwards',
        slideLeft: 'slideLeft 0.5s ease forwards'
      },
      keyframes: {
        blink: {
          from: { "border-right-color": "transparent"},
          "50%": { "border-right-color": "orange"}
        },
        typing: {
          from: {width: "0%"},
          to: {width: "7ch"}
        },
        slideLeft: {
          from: {transform: "translateX(100%)"},
          to: {transform: "translateX(0%)"}
        },
        slideRight: {
          from: {transform: "translateX(0%)"},
          to: {transform: "translateX(100%)"}
        }
      },
    },
  },
  plugins: [],
}
