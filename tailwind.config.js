const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'reforma-light': ['Reforma2018-Blanca', ...defaultTheme.fontFamily.sans],
        'reforma': ['Reforma2018-Gris', ...defaultTheme.fontFamily.sans],
        'reforma-bold': ['Reforma2018-Negra', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#c69545',
        secondary: '#212b49',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [ addVariablesForColors,],
}
