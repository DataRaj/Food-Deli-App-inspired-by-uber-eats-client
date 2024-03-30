import {useReactiveVar} from '@apollo/client';
import {Link} from 'react-router-dom';
import {isDarkVar} from '../../../apollo/GlobalVar';

const RestaurantSoon = ({restaurant}) => {
	let isDark = useReactiveVar(isDarkVar);
	return (
		<>
			<div className='relative flex items-center justify-center mt-20 h-screen'>
				<img
					className='bg-center bg-cover  blur-md bg-no-repeat  items-center  justify-center  text-center w-full  h-1/2 '
					src={restaurant?.coverImg}
					alt={restaurant?.name}
				/>

				<div className={`absolute text-center flex justify-center items-center  text-5xl font-semibold ${isDark ? 'bg-black' : 'bg-white'} bg-opacity-50   py-10 px-20 `}>
					<div>
						<h1 className='font-bold mt-2 mb-10 text-3xl md:text-7xl'>Coming Soon</h1>
						<h2 className='font-bold mt-2 md:text-4xl text-2xl text-left mb-5'>{restaurant?.name}</h2>
						<div className='md:text-2xl text-lg mt-4 text-left uppercase mb-5'>{restaurant?.category?.name}</div>
						<div className='md:text-2xl text-lg text-left '>{restaurant?.address}</div>
						<div className=' mt-10 mx-auto'>
							<Link to={`/`} className='text-lg font-medium  hover:text-green-500 '>
								<span aria-hidden='true'> &larr;</span> Go Back
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default RestaurantSoon;
