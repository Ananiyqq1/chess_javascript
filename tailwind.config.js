/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'neon-blue': 'neonBlue 1.5s ease-in-out infinite alternate',
        'neon-green': 'neonGreen 1.5s ease-in-out infinite alternate',
        'shake': 'shake 0.1s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        neonBlue: {
          '0%': {
            textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #228dff, 0 0 70px #228dff, 0 0 80px #228dff, 0 0 100px #228dff, 0 0 150px #228dff',
          },
          '100%': {
            textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #228dff, 0 0 35px #228dff, 0 0 40px #228dff, 0 0 50px #228dff, 0 0 75px #228dff',
          },
        },
        neonGreen: {
          '0%': {
            textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #b6ff00, 0 0 70px #b6ff00, 0 0 80px #b6ff00, 0 0 100px #b6ff00, 0 0 150px #b6ff00',
          },
          '100%': {
            textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #b6ff00, 0 0 35px #b6ff00, 0 0 40px #b6ff00, 0 0 50px #b6ff00, 0 0 75px #b6ff00',
          },
        },
        shake: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '10%': { transform: 'translate(-1px, -1px) rotate(-0.5deg)' },
          '20%': { transform: 'translate(1px, -1px) rotate(0.5deg)' },
          '30%': { transform: 'translate(-1px, 1px) rotate(-0.5deg)' },
          '40%': { transform: 'translate(1px, 1px) rotate(0.5deg)' },
          '50%': { transform: 'translate(-1px, -1px) rotate(-0.5deg)' },
          '60%': { transform: 'translate(1px, -1px) rotate(0.5deg)' },
          '70%': { transform: 'translate(-1px, 1px) rotate(-0.5deg)' },
          '80%': { transform: 'translate(1px, 1px) rotate(0.5deg)' },
          '90%': { transform: 'translate(-1px, -1px) rotate(-0.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(34, 141, 255, 0.5), 0 0 10px rgba(34, 141, 255, 0.3), 0 0 15px rgba(34, 141, 255, 0.2)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(34, 141, 255, 0.8), 0 0 30px rgba(34, 141, 255, 0.6), 0 0 40px rgba(34, 141, 255, 0.4)',
            transform: 'scale(1.02)'
          },
        },
      },
    },
  },
  plugins: [],
}