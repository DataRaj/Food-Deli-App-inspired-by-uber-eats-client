import {actions} from '../../actions';

// restaurant: {restaurants:[]}

const reducer = (restaurantState, action) => {
	let result = restaurantState;
	switch (action.type) {
		case actions.RESTAURANTS:
			result = {...restaurantState, restaurants: action.payload.restaurants};
			break;
		default:
			result = restaurantState;
			break;
	}
	return result;
};

export default reducer;
