import {gql} from '@apollo/client';

export const RESTAURANT_FEAGMENT = gql`
	fragment RestaurantFragment on Restaurant {
		id
		name
		isPromoted
		address
		coverImg
		isOpen
		category {
			id
			name
		}
		coverImg
	}
`;
export const DISH_FEAGMENT = gql`
	fragment DishFragment on Dish {
		id
		name
		price
		description
		photo
		options {
			id
			name
			extra
		}
	}
`;
export const ORDER_FEAGMENT = gql`
	fragment OrderFragment on Order {
		id
		status
		totalPrice
		createdAt
	}
`;
