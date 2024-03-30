import {useReactiveVar} from '@apollo/client';
import {isDarkVar} from '../../apollo/GlobalVar';
import {Order} from '../../graphql/schemaTypes';
import OrderItems from './OrderItems';
import OrderStatusBar from './OrderStatusBar';

const OrderDetails = ({order}: {order: Order}) => {
	const isDark = useReactiveVar(isDarkVar);

	return (
		<div className={` ${isDark ? 'bg-black border-none' : 'bg-white '} `}>
			<main className='max-w-2xl mx-auto pt-8 pb-24 sm:pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
				<div className='px-4 space-y-2 sm:px-0 sm:flex sm:items-baseline sm:justify-between sm:space-y-0'>
					<div className='flex sm:items-baseline sm:space-x-4'>
						<h1 className={`text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'} sm:text-3xl`}>Order #{order.id}</h1>
					</div>

					<p className={`text-sm ${isDark ? 'text-white' : 'text-gray-600'}`}>
						<time dateTime='2021-03-22' className={`text-sm ${isDark ? 'text-white' : 'text-gray-900 font-medium'}`}>
							{new Date(order.createdAt).toLocaleDateString()}
						</time>
					</p>
				</div>

				{/* Orders */}
				<section aria-labelledby='products-heading' className='mt-6'>
					<h2 id='products-heading' className='sr-only'>
						Orders purchased
					</h2>

					<div className='space-y-8'>
						<div key={order.id} className={` ${isDark ? 'bg-black ' : 'bg-white '} border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg`}>
							<div className='py-6 px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8'>
								<div className='sm:flex lg:col-span-7'>
									<div className='flex-shrink-0 w-full lg:aspect-w-0 lg:aspect-h-1 rounded-lg overflow-hidden sm:aspect-none sm:w-40 sm:h-40'>
										<img src={order.restaurant?.coverImg} alt={'orderImg'} className='w-full  object-center object-cover lg:w-full lg:h-full' />
									</div>
									<div className='mt-6 sm:mt-0 sm:ml-6'>
										<dt className={`font-medium text-green-500`}>Total Price</dt>
										<dd className={` mt-3  space-y-3 ${isDark ? 'text-white' : 'text-gray-500'}`}>
											<h3 className={`text-2xl font-extrabold  ${isDark ? 'text-white ' : 'text-gray-900 '}`}>${order.totalPrice}</h3>
										</dd>
									</div>
									<div className='mt-6 sm:mt-0 sm:ml-20'>
										<dt className={`font-medium text-green-500`}>User Info</dt>
										<dd className={` mt-3 space-y-3 ${isDark ? 'text-white' : 'text-gray-500'}`}>
											<p>{order.customer?.email}</p>
											<p>{order.customer?.role}</p>
											<button disabled type='button' className='font-medium text-green-600 hover:text-green-500'>
												Edit
											</button>
										</dd>
									</div>
								</div>

								<div className='mt-6 lg:mt-0 lg:col-span-5'>
									<dl className='grid grid-cols-2 gap-x-6 text-sm'>
										<div>
											<dt className={`font-medium text-green-500`}>Delivery address</dt>
											<dd className={` mt-3 space-y-3 ${isDark ? 'text-white' : 'text-gray-500'}`}>
												<span className='block'>{order.address?.address}</span>
												<span className='block'>{order.address?.apartment}</span>
												<span className='block'>{order.address?.city}</span>
												<span className='block'>{order.address?.postalCode}</span>
												<span className='block'>{order.address?.region}</span>
											</dd>
										</div>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* Order Status */}
				<section aria-labelledby='products-heading' className='mt-6'>
					<OrderStatusBar order={order} />
				</section>
				{/* Order Items */}
				<section aria-labelledby='products-heading' className='mt-6'>
					<OrderItems items={order.items} options={order?.options ? order.options : null} />
				</section>
			</main>
		</div>
	);
};

export default OrderDetails;
