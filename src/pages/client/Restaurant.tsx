import {useParams} from 'react-router-dom';
import {RESTAURANT} from '../../graphql/queries';
import {RestaurantQuery, RestaurantQueryVariables} from '../../graphql/schemaTypes';
import {useQuery} from '@apollo/client';
import Loading from '../../components/loading/Loading';
import Restaurant from '../../components/restaurant/client/Restaurant';
import ErrorPage from '../../components/custom/ErrorPage';
import Footer from '../../components/footer/Footer';

const SingleRestaurant = () => {
	let {id} = useParams();
	const {data, loading, error} = useQuery<RestaurantQuery, RestaurantQueryVariables>(RESTAURANT, {variables: {data: {restaurantId: Number(id)}}});
	return (
		<>
			{!loading && data?.getRestaurant.ok && data?.getRestaurant?.restaurant && (
				<>
					<Restaurant restaurant={data?.getRestaurant?.restaurant} />
					<Footer />
				</>
			)}
			{loading && <Loading />}
			{error && <ErrorPage message={error.message} />}
		</>
	);
};

export default SingleRestaurant;
