import {useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {ORDERS} from '../../graphql/queries';
import {Order} from '../../graphql/schemaTypes';
import {NEW_UPDATE_ORDER} from '../../graphql/subscriptions';
import Footer from '../footer/Footer';
import OrdersTable from './OrdersTable';

const Orders = () => {
	const [orders, setOrders] = useState<Order[] | null>(null);

	const {data, subscribeToMore} = useQuery(ORDERS, {variables: {data: {status: null}}});

	useEffect(() => {
		if (!data?.getOrders.ok) {
			setOrders(null);
		}
		if (data?.getOrders.ok && data?.getOrders.orders) {
			subscribeToMore({
				document: NEW_UPDATE_ORDER,
				updateQuery: (prev, {subscriptionData}) => {
					if (!subscriptionData.data) {
						return prev;
					}
					const {updateOrders} = subscriptionData.data;

					return {
						getOrders: {
							...prev.getOrders,
							order: {...updateOrders},
						},
					};
				},
			});
			setOrders(data.getOrders.orders);
		}
	}, [data]);
	return (
		<>
			<div className='max-w-7xl mb-10 mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
				<div className='lg:max-w-7xl max-w-4xl mx-auto'>
					<div className=' overflow-hidden '>
						{orders && orders?.length > 0 ? (
							<>
								<div className='px-4 py-5 sm:px-6 text-center mx-auto font-extrabold text-2xl'>
									<h1>Orders History</h1>
								</div>
								<div className=' px-4 py-5 sm:p-6 mt-10 h-screen'>
									<OrdersTable orders={orders} />
								</div>
							</>
						) : (
							<div className='h-screen'>
								<div className='flex items-center  justify-center px-4 py-5 sm:p-6 text-center mx-auto  font-extrabold text-2xl  bg-black text-white '>
									<div>No Order History Found !</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Orders;
