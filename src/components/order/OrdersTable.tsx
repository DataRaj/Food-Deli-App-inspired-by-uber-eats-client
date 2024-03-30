import {useReactiveVar} from '@apollo/client';
import {Link} from 'react-router-dom';
import {isDarkVar} from '../../apollo/GlobalVar';
import {Order, OrderStatus} from '../../graphql/schemaTypes';

const OrdersTable = ({orders}: {orders: Order[] | null}) => {
	const isDark = useReactiveVar(isDarkVar);

	const orderStatusStyle = (status) => {
		let bgColor;
		switch (status) {
			case OrderStatus.Failed:
				bgColor = 'bg-red-200';
				break;
			case OrderStatus.Cooking:
				bgColor = 'bg-yellow-200';
				break;
			case OrderStatus.Cooked:
				bgColor = 'bg-blue-200';
				break;
			case OrderStatus.Delivered:
				bgColor = 'bg-green-200';
				break;

			default:
				bgColor = 'bg-gray-200';
				break;
		}
		return bgColor;
	};
	return (
		<div className='flex flex-col'>
			<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
				<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
					<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className={`${isDark ? 'bg-white' : 'bg-gray-50'}`}>
								<tr>
									<th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-black' : 'text-gray-500'} uppercase tracking-wider`}>
										Name
									</th>
									<th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-black' : 'text-gray-500'} uppercase tracking-wider`}>
										Date
									</th>
									<th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-black' : 'text-gray-500'} uppercase tracking-wider`}>
										Status
									</th>
									<th scope='col' className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-black' : 'text-gray-500'} uppercase tracking-wider`}>
										Price
									</th>
									<th scope='col' className='relative px-6 py-3'>
										<span className='sr-only'>Details</span>
									</th>
								</tr>
							</thead>
							<tbody className={` ${isDark ? 'bg-black ' : 'bg-white '} divide-y divide-gray-200`}>
								{orders?.map((order: Order) => (
									<tr key={order.id}>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='flex items-center'>
												<div className='flex-shrink-0 h-10 w-10'>
													<img className='h-10 w-10 rounded-full' src={order.restaurant?.coverImg} alt='' />
												</div>
												<div className='ml-4'>
													<div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>#{order?.id}</div>
													<div className={`text-sm ${isDark ? 'text-white' : 'text-gray-500'}`}>{order?.customer?.email}</div>
												</div>
											</div>
										</td>

										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-900'>{new Date(order.createdAt).toLocaleDateString()}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<span className={`w-16 inline-flex  text-center justify-center text-xs leading-5 font-semibold rounded-full  text-gray-600 ${orderStatusStyle(order.status)}`}>{order.status}</span>
										</td>
										<td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-white' : 'text-gray-500'}`}>$ {order.totalPrice}</td>
										<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
											<Link to={`/order/${order.id}`} className='text-green-500 hover:text-green-900'>
												Details
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrdersTable;
