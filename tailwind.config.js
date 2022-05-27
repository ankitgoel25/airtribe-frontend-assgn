const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.my-scrollbar': {
          '&::-webkit-scrollbar': {
            width: 8,
            height: 8
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#A9A9AC',
            borderRadius: '9999px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#A9A9ACb0'
          },
          '&::-webkit-scrollbar-corner': {
            display: 'none'
          }
        }
      })
    })
  ]
}
