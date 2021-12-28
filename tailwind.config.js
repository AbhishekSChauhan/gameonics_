module.exports = {  
  purge: [],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
      display: ["group-hover"],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
