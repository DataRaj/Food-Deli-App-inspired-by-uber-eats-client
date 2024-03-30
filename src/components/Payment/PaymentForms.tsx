import {faLock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {totalAllDishPrice} from '../shopping-cart/Basket';
import Zarinpal from '../../images/zarinpal.png';
import {useMutation, useReactiveVar} from '@apollo/client';
import {AddressItem, CreateOrderMutation, CreateOrderMutationVariables} from '../../graphql/schemaTypes';
import {CREATE_ORDER} from '../../graphql/mutations';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {isDarkVar} from '../../apollo/GlobalVar';
import {useForm} from 'react-hook-form';
import ErrorSpan from '../custom/ErrorSpan';
import AddAddress from '../address/AddAddress';
import Addresses from '../address/Addresses';
import useUser from '../../hooks/useUser';
import {v4 as uuid} from 'uuid';
const PaymentForms = () => {
	const dishOptionsItem: any = [];
	const isDark = useReactiveVar(isDarkVar);
	const {user} = useUser();
	const [selectedAddress, setSelectedAddress] = useState<AddressItem | undefined>(undefined);
	const [addAddressSelected, setAddAddressSelected] = useState<boolean>(false);

	const basketItem: any = JSON.parse(sessionStorage.getItem('basket') || '{}');
	const [serverMessage, setServerMessage] = useState<string | null>(null);
	const {
		register,
		getValues,
		formState: {errors},
		handleSubmit,
		setError,
		clearErrors,
	} = useForm({
		mode: 'onChange',
	});

	let navigate = useNavigate();
	const update = (_, result) => {
		const {ok, message, orderId} = result?.data?.createOrder;
		if (!ok) {
			setError('address', {message});
		}
		if (ok && orderId) {
			navigate('/payment/pending', {state: {orderId}});
		} else {
			setServerMessage(message);
		}
	};
	const [createOrderHandler] = useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CREATE_ORDER, {update});

	const orderHandler = () => {
		const {address, apartment, region, city, postalCode} = getValues();
		const addedAddress: AddressItem = {id: uuid(), address, apartment, region, city, postalCode: Number(postalCode)};
		const dishQuantityIds = Object.keys(basketItem?.dishQuantity);

		const dishQuantityObject = dishQuantityIds.map((dishQuantityId) => {
			return {id: Number(dishQuantityId), quantity: basketItem?.dishQuantity[Number(dishQuantityId)]};
		});
		const dishOptionQuantityIds = Object.keys(basketItem?.dishOptionQuantity);
		const dishOptionQuantityObject = dishOptionQuantityIds.map((dishOptionQuantityId) => {
			return {id: String(dishOptionQuantityId), quantity: basketItem?.dishOptionQuantity[String(dishOptionQuantityId)]};
		});
		const totalPrice = (totalAllDishPrice(basketItem) + totaldishOptionsPrice(dishOptionsItem) + totalAllDishPrice(basketItem) * 0.09).toFixed(2);

		createOrderHandler({
			variables: {
				data: {
					userAddress: selectedAddress ? selectedAddress : addedAddress,
					dishQuantity: dishQuantityObject,
					dishOptionQuantity: dishOptionQuantityObject,
					restaurantId: basketItem.restaurantId,
					totalPrice: Number(totalPrice),
				},
			},
		});
	};

	const totaldishOptionsPrice = (dishOptions) => {
		const dishQuantity: any = [];

		dishOptions?.map((option) => {
			if (option.quantity) {
				for (let i = 0; i < option.quantity; i++) {
					dishQuantity.push(option.price);
				}
			}
			return undefined;
		});

		const totalPrice = dishQuantity.reduce((total: number, price) => {
			return total + price;
		}, 0);
		return totalPrice;
	};

	return (
		<>
			<form onSubmit={handleSubmit(orderHandler)} className='-mt-14 pt-16 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1'>
				<div className='max-w-lg mx-auto lg:max-w-none'>
					{serverMessage && <div className='bg-red-500 text-white text-center'>{serverMessage}</div>}
					{/* Payment Card Section  */}
					{/* <section aria-labelledby='payment-heading' className='mt-10'>
						<h2 id='payment-heading' className='text-lg font-medium text-gray-900'>
							Payment details
						</h2>
						<PaymentCard />
					</section> */}

					<section aria-labelledby='shipping-heading' className='mt-10'>
						<h2 id='shipping-heading' className={`text-lg font-medium  ${isDark ? 'text-white' : 'text-gray-900'} `}>
							Shipping address
						</h2>
						<div className='mt-10' onClick={() => setAddAddressSelected(false)}>
							<Addresses setSelectedAddress={setSelectedAddress} selectedAddress={selectedAddress} addAddressSelected={addAddressSelected} />
						</div>
						<div className='relative my-4'>
							<div className='absolute inset-0 flex items-center' aria-hidden='true'>
								<div className='w-full border-t border-gray-200' />
							</div>
							<div className='relative flex justify-center'>
								<span className='px-4 bg-white text-sm font-medium text-gray-500'>or</span>
							</div>
						</div>
						<h2 id='shipping-heading' className={`text-base  mt-5 ${isDark ? 'text-white' : 'text-gray-900'} `}>
							{user?.address ? 'Add a new address' : 'Add address'}
						</h2>
						<div onClick={() => setAddAddressSelected(true)}>
							<AddAddress clearErrors={clearErrors} register={register} selectedAddress={selectedAddress} />
						</div>
					</section>

					<div className='my-10 flex space-x-2'>
						<div className='flex items-center h-5'>
							<input
								id='same-as-shipping'
								name='same-as-shipping'
								type='checkbox'
								defaultChecked
								className='h-4 w-4 border-gray-300 rounded text-green-600 focus:ring-green-500'
							/>
						</div>
						<label htmlFor='same-as-shipping' className={`block text-sm font-medium  ${isDark ? 'text-white' : 'text-gray-900'}`}>
							Billing address is the same as shipping address
						</label>
					</div>

					<button
						type='submit'
						className='w-full flex items-center justify-center bg-green-400 border border-transparent text-white rounded-md py-2 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
					>
						<span className='text-black font-bold px-2'>Pay with</span>
						<img className='h-5 w-auto' src={Zarinpal} alt='zarinpal-logo' />
					</button>
					{/* <div className='relative my-4'>
						<div className='absolute inset-0 flex items-center' aria-hidden='true'>
							<div className='w-full border-t border-gray-200' />
						</div>
						<div className='relative flex justify-center'>
							<span className='px-4 bg-white text-sm font-medium text-gray-500'>or</span>
						</div>
					</div>

					<button type='button' disabled className='w-full bg-gray-300 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>
						Pay $ ${(totalAllDishPrice(basketItem) + totaldishOptionsPrice(dishOptionsItem) + totalAllDishPrice(basketItem) * 0.09).toFixed(2)}
					</button> */}
					<p className='flex justify-center text-sm font-medium text-gray-500 mt-6'>
						<FontAwesomeIcon icon={faLock} className='w-5 h-5 text-gray-400 mr-1.5' aria-hidden='true' />
						Payment details stored in plain text
					</p>
				</div>
				<div className='flex flex-col mt-5 px-20 '>
					{/* {state?.message !== undefined ? <span className='bg-green-600 span text-white'>{state?.message}</span> : null}
					{state?.error !== undefined ? <ErrorSpan message={state?.error} /> : null} */}
					{errors?.address?.message && <ErrorSpan message={errors?.address?.message} />}
					{errors?.city?.message && <ErrorSpan message={errors?.city?.message} />}
					{errors?.region?.message && <ErrorSpan message={errors?.region?.message} />}
					{errors?.apartment?.message && <ErrorSpan message={errors?.apartment?.message} />}
					{errors?.postalCode?.message && <ErrorSpan message={errors?.postalCode?.message} />}
				</div>
			</form>
		</>
	);
};

export default PaymentForms;
