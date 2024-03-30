import {useReactiveVar} from '@apollo/client';
import {Link} from 'react-router-dom';
import {isDarkVar} from '../../../apollo/GlobalVar';

const RestaurantOwnerCover = ({restaurant}) => {
	const isDark = useReactiveVar(isDarkVar);

	return (
		<div key={restaurant?.id} className='cursor-pointer text-center group '>
			<Link to={`/restaurant/owner/${restaurant.id}`}>
				<div className='py-24  bg-cover bg-no-repeat bg-center mb-2' style={{backgroundImage: `url(${restaurant?.coverImg})`}}></div>
				<h3 className='font-bold'>{restaurant?.name}</h3>
				<div
					className={` mx-auto ${isDark ? 'bg-green-500' : 'bg-black'} ${
						!isDark && 'group-hover:bg-green-500'
					} h-0.5 w-20 text-center justify-center items-center bg-center `}
				></div>
				<span className='text-sm uppercase'>{restaurant?.category?.name}</span>
			</Link>
		</div>
	);
};

export default RestaurantOwnerCover;
