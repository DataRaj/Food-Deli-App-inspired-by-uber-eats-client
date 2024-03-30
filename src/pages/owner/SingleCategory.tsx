import {useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import ErrorPage from '../../components/custom/ErrorPage';
import Loading from '../../components/loading/Loading';
import RestaurantCover from '../../components/restaurant/client/RestaurantCover';
import {CATEGORY} from '../../graphql/queries';
import {CategoryQuery, CategoryQueryVariables} from '../../graphql/schemaTypes';

const SingleCategory = () => {
	let params = useParams();

	const {data, loading, error} = useQuery<CategoryQuery>(CATEGORY, {variables: {data: {slug: params?.slug}}});
	return (
		<>
			{!loading && data?.getCategory.ok && (
				<>
					<div className='mt-10 h-screen w-full mx-auto'>
						<section className='md:h-128 px-10'>
							<div className='grid md:grid-cols-3 md:gap-y-10  gap-x-5 max-w-screen-md mx-auto md:max-w-screen-md lg:max-w-screen-lg'>{data?.getCategory?.restaurants && data?.getCategory?.restaurants.map((restaurant) => <RestaurantCover key={restaurant.id} restaurant={restaurant} />)}</div>
						</section>
					</div>
				</>
			)}
			{loading && <Loading />}
			{error && <ErrorPage message={error.message} />}
		</>
	);
};

export default SingleCategory;
