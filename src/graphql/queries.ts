import {gql} from '@apollo/client';
import {DISH_FEAGMENT, ORDER_FEAGMENT, RESTAURANT_FEAGMENT} from './sharedQuery';

export const LOGGED_IN_USER = gql`
	query loggedInUser {
		loggedInUser {
			id
			email
			role
			verified
			address {
				id
				address
				apartment
				postalCode
				region
				city
			}
		}
	}
`;
export const ORDERS = gql`
	query GetOrders($data: OrdersInputFilter!) {
		getOrders(data: $data) {
			ok
			message
			orders {
				id
				totalPrice
				status
				driver {
					id
				}
				customer {
					id
					email
				}
				createdAt
				restaurant {
					id
					name
					coverImg
				}
			}
		}
	}
`;
export const GET_ORDER_BY_ID = gql`
	query GetOrderById($data: OrderInputType!) {
		getOrderById(data: $data) {
			ok
			message
			order {
				id
				createdAt
				status
				totalPrice
				options {
					id
					quantity
					name
					extra
					dishId
				}
				items {
					id
					quantity
					photo
					price
					name
					restaurantId
				}
				customer {
					id
					email
					role
				}
				driver {
					id
				}
				address {
					id
					address
					apartment
					postalCode
					region
					city
				}
				restaurant {
					...RestaurantFragment
				}
			}
		}
	}
	${RESTAURANT_FEAGMENT}
`;
export const RESTAURANTS = gql`
	query restaurants($data: RestaurantsInput!) {
		getRestaurants(data: $data) {
			ok
			message
			totalPages
			totalRestaurants
			restaurants {
				...RestaurantFragment
			}
		}
	}
	${RESTAURANT_FEAGMENT}
`;
export const RESTAURANTS_OWNER = gql`
	query restaurantsOwner($data: RestaurantsInput!) {
		getOwnerRestaurants(data: $data) {
			ok
			message
			totalPages
			totalRestaurants
			restaurants {
				...RestaurantFragment
			}
		}
	}
	${RESTAURANT_FEAGMENT}
`;
export const RESTAURANT = gql`
	query Restaurant($data: RestaurantInputType!) {
		getRestaurant(data: $data) {
			ok
			message
			restaurant {
				...RestaurantFragment
				menu {
					...DishFragment
				}
			}
		}
	}
	${RESTAURANT_FEAGMENT}
	${DISH_FEAGMENT}
`;

export const RESTAURANT_OWNER = gql`
	query restaurantOwner($data: RestaurantInputType!) {
		getOwnerRestaurant(data: $data) {
			ok
			message
			restaurant {
				...RestaurantFragment
				menu {
					...DishFragment
				}
				orders {
					...OrderFragment
				}
			}
		}
	}
	${RESTAURANT_FEAGMENT}
	${DISH_FEAGMENT}
	${ORDER_FEAGMENT}
`;

export const CATEGORIES = gql`
	query categories {
		getCategories {
			message
			ok
			categories {
				id
				name
				slug
				restaurantCount
				iconImg
			}
		}
	}
`;

export const SEARCH_RESTAURANT = gql`
	query SearchRestaurants($data: SearchRestaurantInput!) {
		searchRestaurants(data: $data) {
			ok
			message
			totalRestaurants
			totalPages
			restaurants {
				...RestaurantFragment
			}
		}
	}
	${RESTAURANT_FEAGMENT}
`;

export const USER_PROFILE = gql`
	query userProfile($userId: Float!) {
		userProfile(userId: $userId) {
			user {
				email
			}
			ok
			message
		}
	}
`;
export const USERS = gql`
	query Users {
		users {
			id
			email
			role
		}
	}
`;
export const CATEGORY = gql`
	query Category($data: CategoryInputType!) {
		getCategory(data: $data) {
			ok
			message
			totalPages
			category {
				name
				id
				iconImg
				restaurantCount
				slug
			}
			restaurants {
				...RestaurantFragment
			}
		}
	}
	${RESTAURANT_FEAGMENT}
`;
export const GET_DISH_BY_ID = gql`
	query getDish($dishId: Int!) {
		getDish(dishId: $dishId) {
			message
			ok
			totalPages
			dish {
				id
				name
				description
				price
				restaurant {
					id
				}
				options {
					id
					name
					extra
					quantity
				}
				photo
				createdAt
				updatedAt
			}
		}
	}
`;
export const PAYMENTS = gql`
	query Payments {
		Payments {
			ok
			message
			payments {
				payment_method
			}
		}
	}
`;
