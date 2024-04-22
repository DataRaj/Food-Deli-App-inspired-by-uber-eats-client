/* eslint-disable no-undef */
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			height: {
				128: '50rem',
			},
			minHeight: {
				'1/2': '50%',
				'1*2': '120%',
			},
			colors: {
				lime: colors.lime,
			},
			animation: {
				wiggle: 'wiggle 2s ease-in infinite',
			},
			keyframes: {
				wiggle: {
					'0%, 100%': {transform: 'scale(1)'},
					'50%': {transform: 'scale(1.1)'},
				},
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')],
};