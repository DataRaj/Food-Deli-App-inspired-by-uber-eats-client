import {useParams} from 'react-router-dom';
import {SEARCH_RESTAURANT} from '../../graphql/queries';
import {SearchRestaurantsQuery, SearchRestaurantsQueryVariables} from '../../graphql/schemaTypes';
import {useLazyQuery} from '@apollo/client';
import RestaurantCover from '../../components/restaurant/client/RestaurantCover';
import Loading from '../../components/loading/Loading';
import Header from '../../components/header/Header';
import ErrorPage from '../../components/custom/ErrorPage';
import {useEffect} from 'react';

const RestaurantFind = () => {
	let {query} = useParams();
	const [dispatch, {data, loading, error}] = useLazyQuery<SearchRestaurantsQuery, SearchRestaurantsQueryVariables>(SEARCH_RESTAURANT);
	useEffect(() => {
		if (query) {
			dispatch({
				variables: {
					data: {query},
				},
			});
		}
	}, [dispatch, query]);

	return (
		<>
			{!loading && (
				<>
					{!data?.searchRestaurants.ok && <div className='w-full flex flex-col h-screen items-center justify-center font-bold text-lg space-y-10 text-black text-center py-2 my-4'>{data?.searchRestaurants?.message ? <ErrorPage message={data?.searchRestaurants?.message} /> : <ErrorPage message={'SomeThing Goes Wrong!'} />}</div>}
					{data?.searchRestaurants.ok && (
						<div className='min-h-screen'>
							<div className='grid md:grid-cols-3 mt-20  gap-x-5 gap-y-10 max-w-screen-md mx-auto'>
								{data?.searchRestaurants?.restaurants?.map((restaurant) => (
									<RestaurantCover key={restaurant.id} restaurant={restaurant} />
								))}
							</div>
						</div>
					)}
				</>
			)}
			{loading && <Loading />}
			{error && <ErrorPage message={error.message} />}
		</>
	);
};

export default RestaurantFind;
