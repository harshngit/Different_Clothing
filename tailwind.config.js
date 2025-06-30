/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['PlayfairDisplay', 'serif'],
        alike: ['Alike'],
      },
      screens: {
        xxl: '1500px',
        lg: '1440px'
      },
      keyframes: {
        // Continuous horizontal marquee
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // scroll half of full (duplicated) content
        },
        // Reverse (right to left)
        marqueeTop: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
        marqueeTop: 'marqueeTop 10s linear infinite',
      },
      backgroundImage: {
        banner: "url('/asset/Home/bannerhome.png')",
      },
      colors: {
        primary: "#565449",
        secondary: "#11120D",
      },
      perspective: {
        '1500': '1500px',
      },
    },
  },
  plugins: [],
});
