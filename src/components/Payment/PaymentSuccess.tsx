import {Link, useLocation} from 'react-router-dom';
import PreaperFood from '../../images/preaper.svg';
import PreaperFoodBlack from '../../images/preaperBlack.svg';
import OrderSuccessImg from '../../images/order-success.svg';
import {useQuery, useReactiveVar} from '@apollo/client';
import {GET_ORDER_BY_ID} from '../../graphql/queries';
import {useEffect, useState} from 'react';
import {Order, OrderStatus} from '../../graphql/schemaTypes';
import Loading from '../loading/Loading';
import {NEW_UPDATE_ORDER} from '../../graphql/subscriptions';
import {isDarkVar} from '../../apollo/GlobalVar';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}
const PaymentSuccess = () => {
	const isDark = useReactiveVar(isDarkVar);
	const {state}: {state: any} = useLocation();
	const orderId = state.orderId;
	const [order, setOrder] = useState<Order | null>(null);

	const orderStatusWidthCal = () => {
		let number = 1;
		number = order?.status === OrderStatus.Cooking ? 1 : 1;
		number = order?.status === OrderStatus.Cooked ? 3 : 1;
		return `calc((1 * 2 + ${number}) / 8 * 100%)`;
	};
	const {data, subscribeToMore} = useQuery(GET_ORDER_BY_ID, {variables: {data: {id: Number(orderId)}}});
	useEffect(() => {
		if (!data?.getOrderById.ok) {
			setOrder(null);
		}
		if (data?.getOrderById.ok && data?.getOrderById.order) {
			subscribeToMore({
				document: NEW_UPDATE_ORDER,
				updateQuery: (prev, {subscriptionData}) => {
					if (!subscriptionData.data) {
						return prev;
					}
					const {updateOrders} = subscriptionData.data;

					if (updateOrders.status === OrderStatus.Failed) {
						return {
							getOrderById: {
								ok: false,
								message: 'Order cancelled',
								order: null,
							},
						};
					}

					return {
						getOrderById: {
							...prev.getOrderById,
							order: {...updateOrders},
						},
					};
				},
			});
			setOrder(data.getOrderById.order);
		}
	}, [data]);

	return order && order.id === orderId ? (
		<>
			<div className='flex justify-center items-center h-screen mt-20'>
				<main className='max-w-2xl mx-auto pt-8 pb-24 sm:pt-16 sm:px-6 lg:max-w-7xl lg:px-8 '>
					<div className='grid grid-cols-2'>
						<div>
							<Link to={`/orders`} className='text-sm font-medium text-green-500 hover:text-green-600 '>
								View Order Details<span aria-hidden='true'> &rarr;</span>
							</Link>
						</div>
						<div>
							Order placed:
							<time dateTime='2021-03-22' className={`pl-2 font-medium ${isDark ? 'text-white ' : 'text-gray-900 '}`}>
								{new Date(order.createdAt).toLocaleDateString()}
							</time>
						</div>
					</div>

					{/* Products */}
					<section aria-labelledby='products-heading' className='mt-6'>
						<h2 id='products-heading' className='sr-only'>
							Products purchased
						</h2>

						<div className='space-y-8'>
							<div key={orderId} className={` ${isDark ? 'bg-black' : 'bg-white'} border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg`}>
								<div className='py-6 px-4 sm:px-6 '>
									<div className='flex flex-col md:flex-row justify-center items-center'>
										<img
											src={OrderSuccessImg}
											alt='order-success'
											className='object-center object-cover w-1/2 md:w-1/3 h-full md:h-auto
								'
										/>

										<div className='mt-6 sm:mt-0 sm:ml-6'>
											<h2 className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>Thanks for Your Order</h2>
											<h3 className='text-lg mt-2 font-extrabold tracking-tight text-green-600 sm:text-2xl'>Order #{order.id}</h3>
											<h6 className={`text-md mt-2  ${isDark ? 'text-white' : 'text-gray-700'}`}>
												Total : <span className='font-extrabold'>${order.totalPrice}</span>
											</h6>
										</div>
									</div>
								</div>
								<section>{isDark ? <img src={PreaperFoodBlack} alt='preapering-food' /> : <img src={PreaperFood} alt='preapering-food' />}</section>
								<div className='border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8'>
									<h4 className='sr-only'>Status</h4>
									<p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
										Order Status: <span className='text-green-600 font-extrabold text-lg'>{order.status}</span>
									</p>
									<div className='mt-6' aria-hidden='true'>
										<div className='bg-gray-200 rounded-full overflow-hidden'>
											<div className='h-2 bg-green-600 rounded-full' style={{width: orderStatusWidthCal()}} />
										</div>
										<div className=' grid grid-cols-4 text-sm font-medium text-gray-600 mt-6'>
											<div className='text-green-600'>Order placed</div>
											<div className={classNames(order.status === OrderStatus.Cooking ? 'text-green-600 animate-wiggle' : 'text-gray-400', 'text-center')}>
												{OrderStatus.Cooking}
											</div>
											<div className={classNames(order.status === OrderStatus.Cooked ? 'text-green-600 animate-wiggle' : 'text-gray-400', 'text-center')}>
												{OrderStatus.Cooked}
											</div>
											<div className={classNames(order.status === OrderStatus.Delivered ? 'text-green-600 animate-wiggle' : 'text-gray-400', 'text-right')}>
												{OrderStatus.Delivered}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	) : (
		<Loading />
	);
};

export default PaymentSuccess;
