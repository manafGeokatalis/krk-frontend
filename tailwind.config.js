/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gblue': { DEFAULT: '#4B96CC', 50: '#DAE9F5', 100: '#CAE0F0', 200: '#AACEE7', 300: '#8BBBDE', 400: '#6BA9D5', 500: '#4B96CC', 600: '#317AAE', 700: '#255B82', 800: '#183C56', 900: '#0C1E2B', 950: '#060E15' },
        'ggreen': { DEFAULT: '#33B679', 50: '#B6EBD2', 100: '#A6E6C8', 200: '#86DDB5', 300: '#66D4A1', 400: '#47CB8D', 500: '#33B679', 600: '#278A5C', 700: '#1A5E3F', 800: '#0E3322', 900: '#020704', 950: '#000000' },
        'gyellow': { DEFAULT: '#FFCD4E', 50: '#FFFFFF', 100: '#FFFBF1', 200: '#FFF0C8', 300: '#FFE4A0', 400: '#FFD977', 500: '#FFCD4E', 600: '#FFBD16', 700: '#DD9E00', 800: '#A57600', 900: '#6D4E00', 950: '#513A00' },
        'gred': { DEFAULT: '#F15F5F', 50: '#FFFFFF', 100: '#FEF5F5', 200: '#FBD0D0', 300: '#F8AAAA', 400: '#F48585', 500: '#F15F5F', 600: '#EC2B2B', 700: '#CE1212', 800: '#9A0D0D', 900: '#670909', 950: '#4D0707' },
        'ggray': { DEFAULT: '#666666', 50: '#C2C2C2', 100: '#B8B8B8', 200: '#A3A3A3', 300: '#8F8F8F', 400: '#7A7A7A', 500: '#666666', 600: '#4A4A4A', 700: '#2E2E2E', 800: '#121212', 900: '#000000', 950: '#000000' },
        'gdarkgray': { DEFAULT: '#4D4D4D', 50: '#A9A9A9', 100: '#9F9F9F', 200: '#8A8A8A', 300: '#767676', 400: '#616161', 500: '#4D4D4D', 600: '#313131', 700: '#151515', 800: '#000000', 900: '#000000', 950: '#000000' },
      },
      fontFamily: {
        quicksand: 'Quicksand, san-serif',
        heebo: 'Heebo, san-serif'
      }
    },
  },
  plugins: [],
}

