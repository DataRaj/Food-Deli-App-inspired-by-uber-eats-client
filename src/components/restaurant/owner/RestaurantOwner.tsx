import {useReactiveVar} from '@apollo/client';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {isDarkVar} from '../../../apollo/GlobalVar';
import {Restaurant} from '../../../graphql/schemaTypes';
import RestaurantSoon from '../client/RestaurantSoon';
import Dish from '../Dish';
const RestaurantOwner = ({restaurant}: {restaurant: Restaurant}) => {
	let isDark = useReactiveVar(isDarkVar);

	return (
		<>
			{restaurant?.menu?.length === 0 ? (
				<RestaurantSoon restaurant={restaurant} />
			) : (
				<div className='h-full mx-auto lg:max-w-screen-xl max-w-screen-sm items-center justify-center'>
					<div className=' bg-cover bg-center py-36 w-full  ' style={{backgroundImage: `url(${restaurant?.coverImg})`}}>
						<div className={`${isDark ? 'bg-black' : 'bg-white '} py-12 w-full bg-opacity-90 lg:w-1/2  flex flex-col`}>
							<div className='pl-14 '>
								<h1 className='font-bold mt-2 text-4xl '>{restaurant?.name}</h1>
								<div className={`text-xl mt-4 ${isDark ? 'text-white' : 'text-gray-700'} `}>{restaurant?.category?.name}</div>
								<div className={`text-xl mt-2 ${isDark ? 'text-white' : 'text-gray-700'} `}>{restaurant?.address}</div>
								<div className='mt-10 '>
									<Link to={'add-dish'} className='py-2 text-white bg-green-500 mr-4 px-10'>
										Add Dish
									</Link>

									<Link
										to={`/restaurant/${restaurant.id}/edit-restaurant`}
										className={`cursor-pointer py-2 ${isDark ? 'bg-zinc-700 text-white' : 'bg-black text-white'}  mr-4 px-4`}
									>
										<span className='mr-2'>Edit Restaurant </span>
										<FontAwesomeIcon icon={faEdit} />
									</Link>
								</div>
							</div>
						</div>
					</div>
					<>
						{restaurant?.menu?.length === 0 ? (
							<h1 className='bg-zinc-700  mt-10 text-white py-10 text-center text-2xl w-full px-4 span rounded-md'>No Dish Added !</h1>
						) : (
							<div className='grid mt-16 md:grid-cols-3  gap-x-5 gap-y-10 max-w-screen-md mx-auto md:max-w-screen-md lg:max-w-screen-xl mb-20'>
								{restaurant?.menu?.map((dish, i) => (
									<Dish key={i} dish={dish} />
								))}
							</div>
						)}
					</>
					{/* {restaurant?.menu.length > 0 && <DishChart orders={restaurant?.orders} />} */}
				</div>
			)}
		</>
	);
};

export default RestaurantOwner;
