import {gql} from '@apollo/client';
import {RESTAURANT_FEAGMENT} from './sharedQuery';

export const LOGIN_MUTATION = gql`
	mutation login($data: loginInput!) {
		login(data: $data) {
			ok
			message
			token
		}
	}
`;
export const SIGN_UP_MUTATION = gql`
	mutation createAccount($data: createAccountInput!) {
		createAccount(data: $data) {
			ok
			message
		}
	}
`;

export const VALIDATE_EMAIL = gql`
	mutation validateEmail($data: ValidateEmailInput!) {
		validateEmail(data: $data) {
			message
			ok
		}
	}
`;

export const EDIT_USER_PROFILE = gql`
	mutation EditUserProfile($data: UpdateUserInput!) {
		updateUser(data: $data) {
			ok
			message
		}
	}
`;

export const CREATE_CATEGORY = gql`
	mutation CreateCategory($data: CreateCategoryInput!) {
		createCategory(data: $data) {
			ok
			message
		}
	}
`;

export const CREATE_RESTAURANT = gql`
	mutation CreateRestaurant($data: CreateRestaurantInput!) {
		createRestaurant(data: $data) {
			ok
			message
		}
	}
`;
export const EDIT_RESTAURANT = gql`
	mutation editRestaurant($data: EditRestaurantInput!) {
		editRestaurant(data: $data) {
			ok
			message
		}
	}
`;
export const DELETE_RESTAURANT = gql`
	mutation DeleteRestaurant($data: DeleteRestaurantInput!) {
		deleteRestaurant(data: $data) {
			ok
			message
		}
	}
`;
export const CREATE_DISH = gql`
	mutation createDish($data: CreateDishInput!) {
		createDishe(data: $data) {
			ok
			message
		}
	}
`;
export const DELETE_DISH = gql`
	mutation DeleteDish($dishId: Float!) {
		deleteDish(dishId: $dishId) {
			ok
			message
		}
	}
`;
export const EDIT_DISH = gql`
	mutation editDish($data: EditDishInput!) {
		editDish(data: $data) {
			ok
			message
		}
	}
`;
export const CREATE_ORDER = gql`
	mutation createOrder($data: CreateOrderInput!) {
		createOrder(data: $data) {
			ok
			message
			orderId
		}
	}
`;

export const EDIT_ORDER = gql`
	mutation editOrder($data: EditOrderInput!) {
		editOrder(data: $data) {
			ok
			message
		}
	}
`;
export const TAKE_ORDER = gql`
	mutation TakeOrder($data: OrderInputType!) {
		takeOrder(data: $data) {
			ok
			message
			order {
				id
			}
		}
	}
`;
export const CREATE_PAYMENT = gql`
	mutation CreatePayment($data: CreatePaymentInputType!) {
		createPayment(data: $data) {
			ok
			message
			url
		}
	}
`;

export const VERIFY_PAYMENT = gql`
	mutation Mutation($data: VerifyPaymentInputType!) {
		verifyPayment(data: $data) {
			message
			ok
			orderId
		}
	}
`;
