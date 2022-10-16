/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"background-color": "#0E0B16",
				"primary-color": "#A239CA",
				"secondary-color": "#4717F6",
				"light-color": "#E7DFDD",
			},
		},
	},
	plugins: [],
};
