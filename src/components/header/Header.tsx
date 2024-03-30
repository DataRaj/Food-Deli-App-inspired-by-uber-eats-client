import Logo from '../../images/uber-eats.svg';
import LogoWhite from '../../images/uber-eats-white.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
	faBasketShopping,
	faMoon,
	faPizzaSlice,
	faReorder,
	faSignOut,
	faSun,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {themeHandler, userLoggedOut} from '../../apollo';
import {useQuery, useReactiveVar} from '@apollo/client';
import {isDarkVar} from '../../apollo/GlobalVar';
import {useStateValue} from '../../store/context/ContextManager';
import {actions} from '../../store/actions';
import useUser from '../../hooks/useUser';
import {Order, OrderStatus, UserRole} from '../../graphql/schemaTypes';
import {ORDERS} from '../../graphql/queries';
import {useEffect, useState} from 'react';
import Loading from '../loading/Loading';
import {SunIcon} from '@heroicons/react/solid';

const Header = () => {
	const isDark = useReactiveVar(isDarkVar);

	const basketItem: any = JSON.parse(sessionStorage.getItem('basket') || '{}');

	const [_, dispatch] = useStateValue();
	const {user, loading} = useUser();

	const basketHandler = () => {
		dispatch({
			type: actions.BASKET_STATUS,
			payload: {status: basketItem?.status ? false : true},
		});
	};
	const [orders, setOrders] = useState<Order[] | null>(null);
	const [totalQuantity, setTotalQuantity] = useState<number | null>(null);
	const {data} = useQuery(ORDERS, {variables: {data: {status: OrderStatus.Cooking}}});
	useEffect(() => {
		if (!data?.getOrders.ok) {
			setOrders(null);
		}
		if (data?.getOrders.ok && data?.getOrders.orders) {
			setOrders(data.getOrders.orders);
		}
	}, [data]);

	useEffect(() => {
		const quantityObject = basketItem?.dishQuantity;
		const total: any =
			quantityObject &&
			Object.values(quantityObject).reduce((total: any, quantity) => {
				return total + quantity;
			}, 0);

		setTotalQuantity(total > 0 ? total : null);
	}, [basketItem?.dishQuantity]);

	return (
		<div className='flex flex-row content-center items-center justify-start text-center  w-full '>
			{!loading ? (
				<header className='flex items-center justify-start text-center py-4 w-full mx-auto'>
					<div className='w-full px-5 xl:-x-0 max-w-screen-xl mx-auto flex justify-between items-center'>
						<Link to={'/'}>
							{!isDark && (
								<img
									className='w-36 md:w-40 p-1 cursor-pointer'
									src={Logo}
									alt='logo'
								/>
							)}
							{isDark && (
								<img
									className='w-36 md:w-40 p-1  cursor-pointer'
									src={LogoWhite}
									alt='logo'
								/>
							)}
						</Link>

						<div className='flex  '>
							{user?.role === UserRole.Owner && (
								<div className='mx-10'>
									<Link
										to={'/orders'}
										className=' mx-0.5 cursor-pointer inline-flex relative items-center p-2 text-sm font-medium text-center'
									>
										<FontAwesomeIcon icon={faPizzaSlice} size={'lg'} />
										<span className='sr-only'>Notifications</span>
										<div className='inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full '>
											{orders?.length}
										</div>
									</Link>
								</div>
							)}

							{user?.role !== UserRole.Owner && (
								<div
									onClick={basketHandler}
									className={`py-1 mx-0.5 cursor-pointer mr-4 md:mr-5 inline-flex relative   ${
										basketItem?.items?.length > 0 && 'text-lime-700'
									} `}
								>
									<FontAwesomeIcon
										className='text-xl  md:px-2'
										icon={faBasketShopping}
									/>
									{totalQuantity && (
										<div className='inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full '>
											{totalQuantity}
										</div>
									)}
									{/* {totalQuantity && <span className=' px-2 py-1 text-white rounded-full bg-green-500'>{totalQuantity}</span>} */}
								</div>
							)}

							{user?.role === UserRole.Client && (
								<Link
									to='/orders'
									className={`py-1 mx-0.5 cursor-pointer mr-2 hover:text-green-600 `}
								>
									<FontAwesomeIcon
										className=' text-xl px-1 md:px-4 text-center'
										icon={faUser}
									/>
								</Link>
							)}

							{!isDark && (
								<button
									className='py-1 mx-0.5 mr-2 cursor-pointer  inline-flex relative'
									onClick={() => themeHandler(false)}
								>
									<svg
										fill='black'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='w-6 h-6'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
										/>
									</svg>
								</button>
							)}
							{isDark && (
								<button
									className=' py-1 mx-0.5 mr-2 cursor-pointer  inline-flex relative'
									onClick={() => themeHandler(true)}
								>
									<svg
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='w-6 h-6'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
										/>
									</svg>
								</button>
							)}

							{user ? (
								<span
									className=' py-1  mx-0.5 cursor-pointer ml-2'
									onClick={userLoggedOut}
								>
									<FontAwesomeIcon
										className='  text-xl md:px-2'
										icon={faSignOut}
									/>
								</span>
							) : (
								<Link
									to='/auth/login'
									className=' py-1  ml-2 md:mx-4 cursor-pointer'
								>
									<span className='text-sm md:text-xl px-2  md:px-4 btn border-2 border-white'>
										Login
									</span>
								</Link>
							)}
						</div>
					</div>
				</header>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Header;
