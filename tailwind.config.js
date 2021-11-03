module.exports = {  
  purge: [],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
