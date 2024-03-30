import {useReactiveVar} from '@apollo/client';
import {isDarkVar} from '../../apollo/GlobalVar';

export const dishOptionsItem: any = [];

const OrderItems = ({items, options}) => {
	const isDark = useReactiveVar(isDarkVar);

	return (
		<>
			<div className={`mt-8 py-6 px-4 sm:px-6 w-full border-2 border-gray-200 ${isDark ? 'bg-black ' : 'bg-white '}`}>
				<div className=''>
					<p className='mt-4 text-lg border-b-2'>Items</p>

					<ul className='mt-6  grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 '>
						{items?.map((dish, i) => (
							<li key={dish.id} className='col-span-1 flex shadow-sm rounded-md  '>
								<div className=' flex-1 flex items-center justify-between  shadow-md border-l-8   border-green-500  rounded-r-md truncate pr-10'>
									<img src={dish?.photo} alt={dish?.name} className='h-24 w-24 object-cover object-center rounded-l-md' />
									<div className='flex flex-col px-5'>
										<h3>{String(dish?.name).toUpperCase()}</h3>
										{
											<p className={`${isDark ? 'text-white ' : 'text-gray-600 '} mt-2`}>
												${dish.price} X {dish.quantity}
											</p>
										}
									</div>

									{options && (
										<div className='flex flex-1  items-end justify-between text-sm '>
											<div className='ml-4 mt-2 '>
												{options.map(
													(dishOption) =>
														dishOption.dishId === dish.id && (
															<div key={dishOption.id} className={`${isDark ? 'text-white ' : 'text-gray-600 '} flex justify-around `}>
																<span className='px-4 flex-1'>{dishOption?.name}</span>
																<span>
																	${dishOption?.extra} X {dishOption?.quantity}
																</span>
															</div>
														),
												)}
											</div>
										</div>
									)}
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default OrderItems;
