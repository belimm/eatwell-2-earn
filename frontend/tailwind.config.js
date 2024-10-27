/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         colors: {
            'ultra-light-green': '#dcfddb',
            'light-blue': '#94b9ff',
            'dark-blue': '#1A243D',

            'light-green': '#c4fdc4',
            'light-purple': '#654DB0',

            'custom-red': '#0A141D',
            'weird-yellow': '#EECE00',
         },
         animation: {
            bounce1: 'bounce 2s infinite ease-in-out',
            bounce2: 'bounce 2s infinite ease-in-out -1s',
         },
         keyframes: {
            bounce: {
               '0%, 100%': { transform: 'scale(0)' },
               '50%': { transform: 'scale(1)' },
            },
         },
      },
   },
   plugins: [],
};
