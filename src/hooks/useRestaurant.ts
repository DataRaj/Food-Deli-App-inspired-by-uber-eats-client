import {useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {RESTAURANT} from '../graphql/queries';
import {RestaurantQuery, RestaurantQueryVariables} from '../graphql/schemaTypes';

const useRestaurant = () => {
	let {id} = useParams();

	const {data, error} = useQuery<RestaurantQuery, RestaurantQueryVariables>(RESTAURANT, {variables: {data: {restaurantId: Number(id)}}});

	if (id && !error) {
		return data?.getRestaurant.restaurant;
	} else {
		return null;
	}
};

export default useRestaurant;
