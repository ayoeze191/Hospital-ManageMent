module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx, html}","./static/**/*.{html, js}", 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'heroPattern': "url('/src/assets/iconLocation.svg')",
      }

    },
  },
  plugins: [],
}
