import {useParams} from 'react-router-dom';
import {RESTAURANT_OWNER} from '../../graphql/queries';
import {RestaurantOwnerQuery, RestaurantOwnerQueryVariables} from '../../graphql/schemaTypes';
import {useQuery} from '@apollo/client';
import Loading from '../../components/loading/Loading';
import ErrorPage from '../../components/custom/ErrorPage';
import RestaurantOwner from '../../components/restaurant/owner/RestaurantOwner';
import Footer from '../../components/footer/Footer';

const SingleRestaurant = () => {
	let {id} = useParams();

	const {data, loading, error} = useQuery<RestaurantOwnerQuery, RestaurantOwnerQueryVariables>(RESTAURANT_OWNER, {variables: {data: {restaurantId: Number(id)}}});
	return (
		<>
			{!loading && data?.getOwnerRestaurant.ok && data?.getOwnerRestaurant?.restaurant && (
				<>
					{/* @ts-ignore */}
					<RestaurantOwner restaurant={data?.getOwnerRestaurant?.restaurant} />
					<Footer />
				</>
			)}
			{loading && <Loading />}
			{error && <ErrorPage message={error.message} />}
		</>
	);
};

export default SingleRestaurant;
