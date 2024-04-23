import colors from 'tailwindcss/colors';
export default  {
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
	plugins: ['@tailwindcss/aspect-ratio', '@tailwindcss/forms'],
};