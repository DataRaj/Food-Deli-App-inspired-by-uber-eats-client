import {Fragment, useEffect, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {XIcon} from '@heroicons/react/outline';
import {StarIcon} from '@heroicons/react/solid';
import {Link} from 'react-router-dom';
import {useStateValue} from '../../store/context/ContextManager';
import {actions} from '../../store/actions';
import useUser from '../../hooks/useUser';
import {UserRole} from '../../graphql/schemaTypes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAdd, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import NumericOptions from '../custom/NumericOptions';
import NumericInput from '../custom/NumericInput';
import Reviews from '../reviews/Reviews';
import useRestaurant from '../../hooks/useRestaurant';
import {isDarkVar} from '../../apollo/GlobalVar';
import {useReactiveVar} from '@apollo/client';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const DishCover = ({setIsSelected, dish}) => {
	const [state, dispatch] = useStateValue();
	const [open, setOpen] = useState<boolean>(true);
	const [isReviewsShow, setIsReviewsShow] = useState<boolean>(false);
	const isDark = useReactiveVar(isDarkVar);

	const [basket, setBasket] = useState<any>({});
	const [dishOptionId, setDishOptionId] = useState<number | null>(null);
	const basketItem: any = JSON.parse(sessionStorage.getItem('basket') || '{}');

	useEffect(() => {
		setBasket(basketItem);
	}, [basketItem?.items?.length]);

	const {user} = useUser();
	const restaurant = useRestaurant();
	const changeQuantity = (id, opration) => {
		dispatch({
			type: actions.BASKET_QUANTITY_CHANGE,
			payload: {id, opration},
		});
	};
	const changeDishOptionQuantity = (id, opration) => {
		setDishOptionId(id);
		dispatch({
			type: actions.DISH_OPTIONS_QUANTITY_CHANGE,
			payload: {id, opration},
		});
	};
	const removeFromBasket = (id) => {
		dispatch({
			type: actions.REMOVE_FROM_BASKET,
			payload: {id, dishOptionId},
		});
	};

	const addToBasketHandler = () => {
		const item = {
			id: dish.id,
			name: dish.name,
			price: dish.price,
			description: dish.description,
			photo: dish.photo,
			options: dish.options,
		};
		if (restaurant) {
			dispatch({
				type: actions.ADD_TO_BASKET,
				payload: {item, message: 'Added to basket', restaurantId: restaurant.id, id: dish.id},
			});
		}
	};

	const addtoOrderButton = () => {
		const isDishAlreadyAdded = basketItem?.items ? basketItem?.items?.find((item) => item.id === dish.id) : state?.basket?.items.find((item) => item.id === dish.id);
		const quantity = basketItem?.items ? basketItem?.dishQuantity[dish.id] : state?.basket?.dishQuantity[dish.id];

		if (isDishAlreadyAdded && basketItem?.items) {
			return (
				<div className=' flex flex-row'>
					<div className='mt-12 w-1/3  border-dotted border-2 border-green-500 text-green-500  border-grren-400 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium '>
						<span>Added</span>
					</div>
					<div className='mt-12 w-full py-3 px-8 flex items-center justify-center text-base font-medium '>
						<NumericInput changeQuantity={changeQuantity} quantity={quantity} dishId={dish.id} />
					</div>
					<button
						onClick={() => removeFromBasket(dish.id)}
						type='button'
						className='text-red-500 mt-12 w-1/3  py-3 px-8 flex items-center justify-center text-base font-medium '
					>
						<span>
							<FontAwesomeIcon icon={faTrash} />
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<button
					onClick={addToBasketHandler}
					type='button'
					className={`mt-12 w-full ${
						isDark ? 'bg-green-500 text-white' : 'bg-black text-white'
					}  border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium  hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
				>
					<span>
						<FontAwesomeIcon icon={faAdd} />
					</span>
					<span className='pl-4'> Add to Order</span>
				</button>
			);
		}
	};
	return (
		<Transition.Root show={open} as={Fragment} appear={true}>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={setOpen}
				onClick={() =>
					setTimeout(() => {
						setIsSelected(false);
					}, 500)
				}
			>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block' />
				</Transition.Child>
				<div className='fixed z-10 inset-0 overflow-y-auto transition-all'>
					<div className='flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
							enterTo='opacity-100 translate-y-0 md:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 md:scale-100'
							leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
						>
							<Dialog.Panel className='flex text-base  text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-4xl'>
								<div
									className={`w-full relative flex items-center ${
										isDark ? 'bg-black ' : 'bg-white '
									} px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8`}
								>
									<button
										type='button'
										className='absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8'
										onClick={() => {
											setOpen(false);
											setIsSelected(false);
										}}
									>
										<span className='sr-only'>Close</span>
										<XIcon className='h-6 w-6' aria-hidden='true' />
									</button>

									<div className='w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8'>
										<div className='aspect-w-3 aspect-h-2 md:aspect-h-4  overflow-hidden sm:col-span-4 lg:col-span-5'>
											<img src={dish.photo} alt={dish.name} className='object-center object-contain' />
										</div>
										<div className='sm:col-span-8 lg:col-span-7'>
											<h2 className={`text-2xl font-extrabold ${isDark ? ' text-white' : 'text-gray-900'} sm:pr-12`}>{dish.name}</h2>

											<section aria-labelledby='information-heading' className='mt-4'>
												<h3 id='information-heading' className='sr-only'>
													Product information
												</h3>
												<span className='text-2xl  text-white  rounded-full bg-green-500 px-4 '>$ {dish.price}</span>
												{/* Reviews */}
												<div className='mt-6'>
													<h4 className='sr-only'>Reviews</h4>
													<div className='flex items-center'>
														<div className='flex items-center'>
															{[0, 1, 2, 3, 4].map((rating) => (
																<StarIcon
																	key={rating}
																	className={classNames(dish?.rating > rating ? 'text-gray-900' : 'text-yellow-400', 'h-5 w-5 flex-shrink-0')}
																	aria-hidden='true'
																/>
															))}
														</div>
														<p className='sr-only'>{dish?.rating} out of 5 stars</p>
														<div
															onClick={() => setIsReviewsShow((c) => !c)}
															className='cursor-pointer ml-3 text-sm font-medium text-green-500 hover:text-green-600'
														>
															{dish?.reviewCount}
															<span className='mb-4 '>{isReviewsShow ? 'Hide Reviews' : 'See Reviews'}</span>
														</div>
													</div>
												</div>
											</section>

											<section aria-labelledby='options-heading' className='mt-10'>
												<h3 id='options-heading' className='sr-only'>
													Product options
												</h3>

												<form>
													{/* Description */}
													<div>
														<h4 className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'} font-bold`}>Description</h4>

														<span className={`mt-4 flex items-center space-x-3 ${isDark ? ' text-white' : 'text-gray-900'}`}>{dish.description}</span>
													</div>

													{/* Options */}
													{dish?.options?.map.length > 0 ? (
														<div className='mt-10'>
															<h4 className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'} font-bold mb-5`}>Options</h4>
															<div className='grid grid-cols-1'>
																{dish?.options?.map((item, i) => {
																	const quantity = basketItem?.items
																		? basketItem?.dishOptionQuantity[item.id] || 0
																		: state?.basket?.dishOptionQuantity[item?.id] || 0;

																	return (
																		<div key={item.id} className='grid grid-cols-3 py-1 '>
																			<p className={`text-sm    ${isDark ? ' text-white' : 'text-gray-900'}`}>{item.name}</p>
																			<span className={`text-sm ml-3 ${isDark ? ' text-white' : 'text-gray-900'}`}>${item.extra}</span>
																			{user?.role !== UserRole.Owner && (
																				<NumericOptions
																					quantity={quantity}
																					changeDishOptionQuantity={changeDishOptionQuantity}
																					optionId={item.id}
																					dishId={dish.id}
																				/>
																			)}
																		</div>
																	);
																})}
															</div>
														</div>
													) : (
														<div className='py-12'></div>
													)}
													{user?.role !== UserRole.Owner && addtoOrderButton()}
													{user?.role === UserRole.Owner && (
														<Link
															to={`edit-dish/${dish.id}`}
															className={`mt-12 w-full ${
																isDark ? ' bg-green-500 text-white' : 'bg-black'
															} border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
														>
															<span>
																<FontAwesomeIcon icon={faEdit} />
															</span>
															<span className='pl-4'> Edit Dish</span>
														</Link>
													)}
												</form>
											</section>
										</div>
										{/* Reviews */}
										{isReviewsShow && <Reviews />}
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default DishCover;
