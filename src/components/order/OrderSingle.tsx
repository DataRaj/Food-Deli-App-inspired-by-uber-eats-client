import {Link, useParams} from 'react-router-dom';
import {Order, OrderStatus} from '../../graphql/schemaTypes';
import Loading from '../loading/Loading';
import {useEffect, useState} from 'react';
import {useQuery} from '@apollo/client';
import {GET_ORDER_BY_ID} from '../../graphql/queries';
import OrderDetails from './OrderDetails';
import {NEW_UPDATE_ORDER} from '../../graphql/subscriptions';

const OrderSingle = () => {
	const [order, setOrder] = useState<Order | null>(null);
	const orderId = useParams().id;

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
			setOrder(data?.getOrderById.order);
		}
	}, [data]);
	return order ? (
		<div className='flex flex-col  items-center h-screen mt-10'>
			<OrderDetails order={order} />
			<div>
				<Link to={'/orders'} className='text-lg pb-20 font-medium text-green-500 hover:text-green-600 sm:block'>
					<span aria-hidden='true'> &larr;</span> orders history
				</Link>
			</div>
		</div>
	) : (
		<Loading />
	);
};

export default OrderSingle;
