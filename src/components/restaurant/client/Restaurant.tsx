import {useReactiveVar} from '@apollo/client';
import {isDarkVar} from '../../../apollo/GlobalVar';
import {useStateValue} from '../../../store/context/ContextManager';
import Notification from '../../Notification/Notification';
import Dish from '../Dish';
import RestaurantSoon from './RestaurantSoon';

const Restaurant = ({restaurant}) => {
	let isDark = useReactiveVar(isDarkVar);
	const [state] = useStateValue();
	const showNotificationBasket = () => {
		return (
			<div className='absolute z-50 bg-red-500'>
				<Notification message={state.basket.message} />
			</div>
		);
	};

	return (
		<>
			{restaurant?.menu?.length === 0 ? (
				<RestaurantSoon restaurant={restaurant} />
			) : (
				<div className='h-full mx-auto lg:max-w-screen-2xl max-w-screen-sm items-center justify-center'>
					{state.basket.message && showNotificationBasket()}
					<div className='justify-center items-center flex'>
						<div
							className=' bg-cover bg-center py-36 w-full '
							style={{backgroundImage: `url(${restaurant?.coverImg})`}}
						>
							<div
								className={`${
									isDark ? 'bg-black/80' : 'bg-white bg-opacity-90'
								} h-52 w-full lg:w-1/2  flex flex-col`}
							>
								<div className='pl-14 py-2 '>
									<h1 className='font-bold mt-2 text-4xl '>{restaurant?.name}</h1>
									<div className='text-2xl mt-4'>
										{restaurant?.category?.name}
									</div>
									<div className='text-2xl '>{restaurant?.address}</div>
								</div>
							</div>
						</div>
					</div>

					<div className='grid mt-16 md:grid-cols-3  gap-x-5 gap-y-10 max-w-screen-md mx-auto md:max-w-screen-md lg:max-w-screen-xl mb-20'>
						{restaurant?.menu?.map((dish, i) => (
							<Dish key={i} dish={dish} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Restaurant;
