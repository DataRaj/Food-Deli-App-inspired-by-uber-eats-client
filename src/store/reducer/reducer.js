import basketReducer from './basket/basketReducer';
import restaurantReducer from './restaurant/restaurantReducer';

export const initialState = {
	restaurant: {restaurants: []},
	basket: {items: [], message: '', dishQuantity: {}, dishOptionQuantity: {}, restaurantId: ''},
};

export const reducer = (state = initialState, action) => {
	return {
		basket: basketReducer(state.basket, action),
		restaurant: restaurantReducer(state.restaurant, action),
	};
};
