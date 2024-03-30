import {useQuery, useReactiveVar} from '@apollo/client';
import {useState} from 'react';
import ErrorSpan from '../../components/custom/ErrorSpan';
import Loading from '../../components/loading/Loading';
import {CATEGORIES, RESTAURANTS} from '../../graphql/queries';
import {
	CategoriesQuery,
	CategoriesQueryVariables,
	RestaurantsQuery,
	RestaurantsQueryVariables,
} from '../../graphql/schemaTypes';
import Category from '../../components/restaurant/Category';
import RestaurantCover from '../../components/restaurant/client/RestaurantCover';
import RestaurantsSearch from '../../components/restaurant/RestaurantsSearch';
import Pagination from '../../components/pagination/Pagination';
import {isDarkVar} from '../../apollo/GlobalVar';
import {useStateValue} from '../../store/context/ContextManager';
import {actions} from '../../store/actions';
import ErrorPage from '../../components/custom/ErrorPage';
import {faLock, faSadCry, faWarning} from '@fortawesome/free-solid-svg-icons';

const Restaurants = () => {
	const [state, dispatch] = useStateValue();
	const isDark = useReactiveVar(isDarkVar);
	const [errorMessage, setErrorMessage] = useState('');
	const [page, setPage] = useState(1);
	const [slug, setSlug] = useState<any>('all');
	const [categories, setCategories] = useState<any>([]);
	const onCompletedRestaurants = (data: RestaurantsQuery) => {
		const {ok, message, restaurants} = data?.getRestaurants;

		if (!ok && message) {
			setErrorMessage(message);
		}
		if (ok && restaurants) {
			dispatch({
				type: actions.RESTAURANTS,
				payload: {restaurants},
			});
		}
	};
	const onCompletedCategories = (data: CategoriesQuery) => {
		const {ok, message, categories} = data?.getCategories;
		if (!ok && message) {
			setErrorMessage(message);
		}
		if (ok && categories) {
			setCategories(categories);
		}
	};

	const {loading, error, data} = useQuery<RestaurantsQuery, RestaurantsQueryVariables>(
		RESTAURANTS,
		{onCompleted: onCompletedRestaurants, variables: {data: {page, slug}}},
	);
	const {loading: categoriesLoading, error: categoriesError} = useQuery<
		CategoriesQuery,
		CategoriesQueryVariables
	>(CATEGORIES, {onCompleted: onCompletedCategories});
	const restaurantsHandler = () => {
		if (state.restaurant.restaurants) {
			return state.restaurant.restaurants.map((restaurant) => (
				<RestaurantCover key={restaurant.id} restaurant={restaurant} />
			));
		}
	};
	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					{/* {categoriesLoading && <Loading />} */}
					{/* {categoriesError && <ErrorSpan message={errorMessage} />} */}
					{error || categoriesError ? (
						<ErrorPage title={error ? error.message : null} icon={faWarning} />
					) : (
						<>
							<RestaurantsSearch />
							<div className='max-h-full '>
								<div>
									<div className='lg:flex lg:flex-row grid grid-cols-4 gap-y-8  justify-between max-w-screen-sm md:max-w-screen-md lg:max-w-screen-xl  mx-auto mb-8 mt-5 px-5 '>
										{categories &&
											categories.map((category) => (
												<Category
													key={category.id}
													category={category}
													slug={slug}
													setSlug={setSlug}
												/>
											))}
									</div>
								</div>
								{!loading && (
									<div
										className={`h-0.5 ${!isDark ? 'bg-black' : 'bg-green-100'}`}
									></div>
								)}

								<section className=' lg:h-128 px-10 mt-12'>
									{!errorMessage || !loading ? (
										<div className=' grid md:grid-cols-3 gap-y-10  gap-x-5 max-w-screen-md mx-auto md:max-w-screen-md lg:max-w-screen-xl'>
											{restaurantsHandler()}
										</div>
									) : (
										<div
											role={'alert'}
											className='bg-zinc-700  mt-10 text-white py-10 text-center text-2xl w-full px-4 span rounded-md'
										>
											{errorMessage}
										</div>
									)}
								</section>
								<div className='h-24 '></div>
								{!loading ? (
									<Pagination
										totalPages={data?.getRestaurants.totalPages}
										currentPage={page}
										setCurrentPage={setPage}
									/>
								) : (
									<div className='text-center justify-center'>
										<div className='flex flex-row justify-center items-center mb-20 '>
											<button>
												<div
													className={`  hover:bg-green-500 transition-all duration-500 bg-gray-400 flex mx-2 px-2 rounded-full  text-center items-center justify-center  text-white`}
												>
													{page}
												</div>
											</button>
										</div>
									</div>
								)}
							</div>
						</>
					)}
				</>
			)}
		</>
	);
};

export default Restaurants;
