const fakeState = {
	items: [
		{
			id: 33,
			name: 'Italy big',
			price: 10,
			description: 'capacunio regrido',
			photo: 'https://cdn.filestackcontent.com/JGbiXAbwSA6QO97opjPT',
			options: [
				{
					__typename: 'DishOption',
					id: 9,
					name: 'roled',
					extra: 1,
				},
			],
		},
		{
			id: 34,
			name: 'TACO',
			price: 10,
			description: 'capacunio regrido',
			photo: 'https://cdn.filestackcontent.com/JGbiXAbwSA6QO97opjPT',
			options: [
				{
					__typename: 'DishOption',
					id: 10,
					name: 'moreSpicy',
					extra: 1,
				},
				{
					__typename: 'DishOption',
					id: 11,
					name: 'mediumrare',
					extra: 2,
				},
			],
		},
	],
	message: 'Added to basket',
	dishQuantity: {
		33: 1,
		34: 2,
	},
	dishOptionQuantity: {
		9: 1,
		10: 3,
		11: 1,
	},
	restaurantId: 53,
	status: true,
};
