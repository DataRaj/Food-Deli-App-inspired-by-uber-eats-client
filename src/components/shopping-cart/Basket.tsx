/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {XIcon} from '@heroicons/react/outline';
import {Link} from 'react-router-dom';
import {useStateValue} from '../../store/context/ContextManager';
import {actions} from '../../store/actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import NumericInput from '../custom/NumericInput';
import {useReactiveVar} from '@apollo/client';
import {isBasketItemVar, isDarkVar} from '../../apollo/GlobalVar';
import EmptyBasket from '../../images/empty-basket.svg';
export const totalAllDishPrice = (basket) => {
	return basket?.items
		?.filter((dish, i) => basket?.items.indexOf(dish) === i)
		.reduce((total: number, dish) => {
			const quantity = basket?.dishQuantity[dish.id];
			const totalDishes = total + dish.price * quantity;
			return totalDishes;
		}, 0);
};
export const totaldishPrice = (dish, basket) => {
	const quantity = basket.dishQuantity[dish.id];
	const dishQuantity: any = [];
	for (let i = 0; i < quantity; i++) {
		dishQuantity.push(dish.price);
	}
	const totalPrice = dishQuantity.reduce((total: number, price) => {
		return total + price;
	}, 0);
	return totalPrice;
};
const Basket = () => {
	const isDark = useReactiveVar(isDarkVar);
	const isBasket = useReactiveVar<boolean>(isBasketItemVar);
	const basketItem: any = JSON.parse(sessionStorage.getItem('basket') || '{}');
	const [_, dispatch] = useStateValue();
	const [open, setOpen] = useState(true);

	const changeBasketStatus = () => {
		dispatch({
			type: actions.BASKET_STATUS,
			payload: {status: false},
		});
	};

	const removeFromBasket = (id) => {
		dispatch({
			type: actions.REMOVE_FROM_BASKET,
			payload: {id},
		});
	};

	const changeQuantity = (id, opration) => {
		dispatch({
			type: actions.BASKET_QUANTITY_CHANGE,
			payload: {id, opration},
		});
	};
	return (
		<Transition.Root show={open} as={Fragment} appear={true}>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={setOpen}
				onClick={() =>
					setTimeout(() => {
						changeBasketStatus();
					}, 500)
				}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-in-out duration-500'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in-out duration-500'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div className='fixed inset-0 overflow-hidden'>
					<div className='absolute inset-0 overflow-hidden'>
						<div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
							<Transition.Child
								as={Fragment}
								enter='transform transition ease-in-out duration-500 sm:duration-500'
								enterFrom='translate-x-full'
								enterTo='translate-x-0'
								leave='transform transition ease-in-out duration-500 sm:duration-500'
								leaveFrom='translate-x-0'
								leaveTo='translate-x-full'
							>
								<Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
									<div className={`flex h-full flex-col overflow-y-scroll ${isDark ? 'bg-black ' : 'bg-white '} shadow-xl`}>
										<div className='flex-1 overflow-y-auto py-6 px-4 sm:px-6'>
											<div className='flex items-start justify-between'>
												<Dialog.Title className={`text-lg font-medium ${isDark ? 'text-white ' : 'text-gray-900 '}`}>
													<div>Basket</div>
												</Dialog.Title>
												<div className='ml-3 flex h-7 items-center transition-all'>
													<button
														type='button'
														className={`-m-2 p-2  ${isDark ? 'text-white ' : 'text-gray-900 '} hover:text-gray-500 focus:ring-0 focus:border-red-400`}
														onClick={() => {
															setOpen(false);
															setTimeout(() => {
																changeBasketStatus();
															}, 500);
														}}
													>
														<span className='sr-only'>Close panel</span>
														<XIcon className='h-6 w-6 focus:ring-0 focus:border-none' aria-hidden='true' />
													</button>
												</div>
											</div>

											<div className='mt-8'>
												<div className='flow-root'>
													<ul className='-my-6 divide-y divide-gray-200'>
														{basketItem?.items ? (
															basketItem?.items
																?.filter((dish, i) => basketItem?.items.indexOf(dish) === i)
																?.map((dish, i) => {
																	const quantity = basketItem?.dishQuantity[dish.id];
																	return (
																		<li key={i} className='flex py-6'>
																			<div className='h-24 w-24 flex-shrink-0 overflow-hidden '>
																				<img src={dish?.photo} alt={dish?.name} className='h-full w-full object-cover object-center' />
																			</div>

																			<div className='ml-4 flex flex-1 flex-col'>
																				<div>
																					<div
																						className={`flex justify-between text-base font-medium ${
																							isDark ? 'text-white ' : 'text-gray-900 '
																						}`}
																					>
																						<h3>
																							<Link to={dish?.name}> {dish?.name} </Link>
																						</h3>

																						{isBasket ? (
																							<p className={`ml-4 ${isDark ? 'text-white ' : 'text-gray-900 '}`}>
																								$ {totaldishPrice(dish, basketItem)}
																							</p>
																						) : (
																							<p className='ml-4'>$ 0</p>
																						)}
																					</div>
																				</div>
																				<div className='flex flex-1  items-end justify-between text-sm my-3'>
																					<p className={`${isDark ? 'text-white ' : 'text-gray-600 '}`}>each ${dish.price}</p>
																				</div>
																				<div className='flex flex-1 items-start justify-between text-sm'>
																					<NumericInput changeQuantity={changeQuantity} quantity={quantity} dishId={dish.id} />
																					<div className='flex'>
																						<button
																							type='button'
																							onClick={() => removeFromBasket(dish.id)}
																							className='font-medium text-red-600 hover:text-red-500'
																						>
																							<FontAwesomeIcon size='lg' icon={faTrash} />
																						</button>
																					</div>
																				</div>
																			</div>
																		</li>
																	);
																})
														) : (
															<div className='flex justify-center items-center  h-screen '>
																<div className='text-center'>
																	<img className='w-full' src={EmptyBasket} alt='no-item' />

																	<p className={`lg:text-2xl p-4 rounded-2xl ${isDark ? 'text-white ' : 'text-gray-900 '}`}>No Item Added </p>
																</div>
															</div>
														)}
													</ul>
												</div>
											</div>
										</div>

										{basketItem?.items ? (
											<div className='border-t border-gray-200 py-6 px-4 sm:px-6'>
												<div className='flex justify-between text-base font-medium text-gray-900'>
													<p className={`${isDark ? 'text-white ' : 'text-gray-900 '}`}>Subtotal</p>
													<p className={`${isDark ? 'text-white ' : 'text-gray-900 '}`}>${totalAllDishPrice(basketItem)}</p>
												</div>
												<p className={`mt-0.5 text-sm ${isDark ? 'text-white ' : 'text-gray-500 '}`}>Shipping and taxes calculated at checkout.</p>
												<div className='mt-6' onClick={() => setOpen(false)}>
													<Link
														to='/checkout'
														className='flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700'
													>
														Checkout
													</Link>
												</div>
												<div className='mt-6 flex justify-center text-center text-sm text-gray-400'>
													<p>
														or{' '}
														<button type='button' className='font-medium text-green-500 hover:text-green-600' onClick={() => setOpen(false)}>
															Continue Ordering<span aria-hidden='true'> &rarr;</span>
														</button>
													</p>
												</div>
											</div>
										) : (
											<div className='border-t border-gray-200 py-6 px-4 sm:px-6 cursor-pointer'>
												<div
													className='mt-6'
													onClick={() => {
														setOpen(false);
														setTimeout(() => {
															changeBasketStatus();
														}, 500);
													}}
												>
													<div className='flex items-center justify-center px-6 py-3 font-medium bg-green-600 text-white hover:bg-green-700'>
														&larr; Add Item to Basket
													</div>
												</div>
											</div>
										)}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default Basket;
