import {Fragment} from 'react';
import {Popover, Transition} from '@headlessui/react';
import {ChevronUpIcon} from '@heroicons/react/solid';
import {Link} from 'react-router-dom';
import {totaldishPrice, totalAllDishPrice} from './Basket';
import {v4 as uuidv4} from 'uuid';
import {useReactiveVar} from '@apollo/client';
import {isDarkVar} from '../../apollo/GlobalVar';
const OrderSummary = () => {
	const dishOptionsItem: any = [];
	const basketItem: any = JSON.parse(sessionStorage.getItem('basket') || '{}');
	const isDark = useReactiveVar(isDarkVar);

	const totaldishOptionsPrice = (dishOptions) => {
		const dishQuantity: any = [];
		dishOptions?.map((option) => {
			if (option.quantity) {
				for (let i = 0; i < option.quantity; i++) {
					dishQuantity.push(option.price);
				}
			}
		});

		const totalPrice = dishQuantity.reduce((total: number, price) => {
			if (price) {
				return total + price;
			} else {
				return undefined;
			}
		}, 0);
		return totalPrice;
	};

	return (
		<section aria-labelledby='summary-heading' className=' pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2'>
			<div className='max-w-lg mx-auto lg:max-w-none'>
				<h2 id='summary-heading' className={`text-center text-center9 text-lg font-medium  ${isDark ? 'text-white' : 'text-gray-900'}`}>
					Order summary
				</h2>

				<div className='mt-8 py-6 px-4 sm:px-6'>
					<div className='flow-root'>
						<ul key={uuidv4()} className='-my-6 divide-y divide-gray-200'>
							{basketItem?.items
								?.filter((dish, i) => basketItem?.items.indexOf(dish) === i)
								?.map((dish, i) => {
									const dishOptions = dish?.options?.map((option) => {
										const quantity = basketItem?.dishOptionQuantity[option.id];
										const newOption = {name: option.name, quantity, price: option.extra};
										dishOptionsItem.push(newOption);
										return newOption;
									});
									const quantity = basketItem?.dishQuantity[dish.id];

									return (
										<li key={dish.id} className='flex py-6'>
											<div className='h-24 w-24 flex-shrink-0 overflow-hidden '>
												<img src={dish?.photo} alt={dish?.name} className='h-full w-full object-cover object-center' />
											</div>

											<div className='ml-4 flex flex-1 flex-col'>
												<div>
													<div className={`flex justify-between text-base font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
														<h3>
															<Link to={dish?.name}> {dish?.name} </Link>
														</h3>

														<p className='ml-4'>${totaldishPrice(dish, basketItem) + totaldishOptionsPrice(dishOptions)}</p>
													</div>
												</div>
												<div className='flex flex-1  items-end justify-between text-sm my-3'>
													<p className={`${isDark ? 'text-white' : 'text-gray-500'}`}>
														${dish.price} X {quantity}
													</p>

													<p className='ml-4'>${totaldishPrice(dish, basketItem)}</p>
												</div>
												{totaldishOptionsPrice(dishOptions) > 0 && (
													<div className='flex flex-1  items-end justify-between text-sm '>
														<h3 className='ml-2'>
															Options
															{dishOptions.map((option, i) => {
																if (option.quantity) {
																	return (
																		<div key={i} className={` flex justify-around ${isDark ? 'text-white' : 'text-gray-500'} `}>
																			<span className='px-4 flex-1'>{option?.name}</span>
																			<span>
																				${option?.price} X {option?.quantity}
																			</span>
																		</div>
																	);
																}
															})}
														</h3>

														<p className='ml-4'>${totaldishOptionsPrice(dishOptions)}</p>
													</div>
												)}
											</div>
										</li>
									);
								})}
						</ul>
					</div>
				</div>
			</div>

			<div className=' py-6 px-4 sm:px-6'>
				<dl className={`hidden text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} space-y-6 border-t b border-gray-300 pt-6 lg:block`}>
					<div className='flex items-center justify-between'>
						<dt className={`${isDark ? 'text-white' : 'text-gray-600'}`}>Subtotal</dt>
						<dd>${totalAllDishPrice(basketItem) + totaldishOptionsPrice(dishOptionsItem)}</dd>
					</div>

					<div className='flex items-center justify-between'>
						<dt className={`${isDark ? 'text-white' : 'text-gray-600'}`}>Taxes</dt>
						<dd>${totalAllDishPrice(basketItem) > 0 ? (totalAllDishPrice(basketItem) * 0.09).toFixed(2) : 0}</dd>
					</div>

					<div className='flex items-center justify-between'>
						<dt className={`${isDark ? 'text-white' : 'text-gray-600'}`}>Shipping</dt>
						<dd> 0</dd>
					</div>
					{/* You Can Add Coupon */}
					{/* <form className='mt-10'>
									<label htmlFor='discount-code-mobile' className='block text-sm font-medium text-gray-700'>
										Discount code
									</label>
									<div className='flex space-x-4 mt-1'>
										<input type='text' id='discount-code-mobile' name='discount-code-mobile' className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
										<button type='submit' className='bg-gray-200 text-sm font-medium text-gray-600 rounded-md px-4 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'>
											Apply
										</button>
									</div>
								</form> */}
					<div className='flex items-center justify-between border-t border-gray-400 pt-6'>
						<dt className='text-base'>Total</dt>
						<dd className='text-base'>${(totalAllDishPrice(basketItem) + totaldishOptionsPrice(dishOptionsItem) + totalAllDishPrice(basketItem) * 0.09).toFixed(2)}</dd>
					</div>
				</dl>

				<Popover className='fixed bottom-0 inset-x-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden'>
					<div className='relative z-10 bg-white border-t border-gray-200 px-4 sm:px-6'>
						<div className='max-w-lg mx-auto'>
							<Popover.Button className='w-full flex items-center py-6 font-medium'>
								<span className='text-base mr-auto'>Total</span>
								<span className='text-base mr-2'>
									${(totalAllDishPrice(basketItem) + totaldishOptionsPrice(dishOptionsItem) + totalAllDishPrice(basketItem) * 0.09).toFixed(2)}
								</span>
								<ChevronUpIcon className='w-5 h-5 text-gray-500' aria-hidden='true' />
							</Popover.Button>
						</div>
					</div>

					<Transition.Root as={Fragment}>
						<div>
							<Transition.Child
								as={Fragment}
								enter='transition-opacity ease-linear duration-300'
								enterFrom='opacity-0'
								enterTo='opacity-100'
								leave='transition-opacity ease-linear duration-300'
								leaveFrom='opacity-100'
								leaveTo='opacity-0'
							>
								<Popover.Overlay className='fixed inset-0 bg-black bg-opacity-25' />
							</Transition.Child>
							<Transition.Child
								as={Fragment}
								enter='transition ease-in-out duration-300 transform'
								enterFrom='translate-y-full'
								enterTo='translate-y-0'
								leave='transition ease-in-out duration-300 transform'
								leaveFrom='translate-y-0'
								leaveTo='translate-y-full'
							>
								<Popover.Panel className='relative bg-white px-4 py-6 sm:px-6'>
									<dl className='max-w-lg mx-auto space-y-6'>
										<div className='flex items-center justify-between'>
											<dt className='text-gray-600'>Subtotal</dt>
											<dd>${totalAllDishPrice(basketItem) + totaldishOptionsPrice(dishOptionsItem)}</dd>
										</div>
										<div className='flex items-center justify-between'>
											<dt className='text-gray-600'>Taxes</dt>
											<dd>${totalAllDishPrice(basketItem) > 0 ? (totalAllDishPrice(basketItem) * 0.09).toFixed(2) : 0}</dd>
										</div>
										<div className='flex items-center justify-between'>
											<dt className='text-gray-600'>Shipping</dt>
											<dd> 0</dd>
										</div>
									</dl>
								</Popover.Panel>
							</Transition.Child>
						</div>
					</Transition.Root>
				</Popover>
			</div>
		</section>
	);
};

export default OrderSummary;
