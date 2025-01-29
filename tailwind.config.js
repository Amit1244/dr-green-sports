/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#D05D1A"
            },
            fontFamily: {
                montserrat: ["var(--font-montserrat)"],
                Cord: ["Cord", "sans-serif"],
                Glancyr: ["Glancyr", "sans-serif"],
                manrope: ['Manrope', 'sans-serif'],
            },
            keyframes: {
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
            },
            animation: {
                wiggle: "wiggle 4s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
