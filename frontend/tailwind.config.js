/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
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
        typing: 'typing 2s steps(8), blink 1s step-end infinite'
      },
      keyframes: {
        blink: {
          from: { "border-right-color": "transparent"},
          "50%": { "border-right-color": "orange"}
        },
        typing: {
          from: {width: "0%"},
          to: {width: "7ch"}
        }
      },
    },
  },
  plugins: [],
}
