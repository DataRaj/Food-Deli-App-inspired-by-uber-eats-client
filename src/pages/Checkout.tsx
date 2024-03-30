import {useReactiveVar} from '@apollo/client';
import {isDarkVar, isLoginVar} from '../apollo/GlobalVar';
import CheckAuth from '../components/banner/CheckAuth';
import PaymentForms from '../components/Payment/PaymentForms';
import OrderSummary from '../components/shopping-cart/OrderSummary';

const Checkout = () => {
	const isLoggedIn = useReactiveVar(isLoginVar);
	const isDark = useReactiveVar(isDarkVar);
	return (
		<>
			<div
				className={`hidden lg:block fixed top-100 left-0 w-1/2 h-full ${
					isDark ? 'bg-black' : 'bg-white'
				} `}
			/>
			<div
				className={`hidden lg:block fixed top-100 right-0 w-1/2 h-full ${
					isDark ? 'bg-neutral-900' : 'bg-gray-100'
				} `}
			/>
			<div className='relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 xl:gap-x-48'>
				<h1 className='sr-only'>Order information</h1>
				<OrderSummary />
				<PaymentForms />
				{!isLoggedIn && <CheckAuth />}
			</div>
		</>
	);
};

export default Checkout;
