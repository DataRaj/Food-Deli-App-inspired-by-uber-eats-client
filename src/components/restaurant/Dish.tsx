import {useReactiveVar} from '@apollo/client';
import {useState} from 'react';
import {isDarkVar} from '../../apollo/GlobalVar';
import {Dish as IDish} from '../../graphql/schemaTypes';
import DishCover from './DishCover';
const Dish = ({dish}: {dish: IDish}) => {
	let isDark = useReactiveVar(isDarkVar);
	const [isOrderSelected, setIsOrderSelected] = useState<Boolean>(false);
	const orderHandler = () => {
		setIsOrderSelected((current) => !current);
	};

	return (
		<>
			<div key={dish?.id} className='cursor-pointer text-center group p-4 '>
				<div onClick={orderHandler}>
					<div className='py-36 bg-contain bg-no-repeat bg-center my-2 ' style={{backgroundImage: `url(${dish?.photo})`}}></div>
					<div className='flex flex-col items-center justify-center '>
						<div>
							<span className='font-bold  text-2xl '>{dish?.name}</span>
						</div>
						<div
							className={` transition-all mx-auto ${isDark ? 'bg-green-500' : 'bg-black'} ${!isDark && 'group-hover:bg-green-500'} ${
								isOrderSelected && 'bg-green-500 w-32'
							} h-0.5 w-24 text-center justify-center items-center bg-center `}
						></div>

						<span className='text-lg'>$ {dish?.price}</span>
					</div>
				</div>
				{isOrderSelected && <DishCover dish={dish} setIsSelected={setIsOrderSelected} />}
			</div>
		</>
	);
};

export default Dish;
