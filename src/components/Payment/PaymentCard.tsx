import {useReactiveVar} from '@apollo/client';
import {isDarkVar} from '../../apollo/GlobalVar';

const PaymentCard = () => {
	const isDark = useReactiveVar(isDarkVar);
	return (
		<div className='mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4'>
			<div className='col-span-3 sm:col-span-4'>
				<label htmlFor='name-on-card' className={`block text-sm font-medium  ${isDark ? 'text-white' : 'text-gray-700'}`}>
					Name on card
				</label>
				<div className='mt-1'>
					<input type='text' id='name-on-card' name='name-on-card' autoComplete='cc-name' className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm' />
				</div>
			</div>

			<div className='col-span-3 sm:col-span-4'>
				<label htmlFor='card-number' className={`block text-sm font-medium  ${isDark ? 'text-white' : 'text-gray-700'}`}>
					Card number
				</label>
				<div className='mt-1'>
					<input type='text' id='card-number' name='card-number' autoComplete='cc-number' className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm' />
				</div>
			</div>

			<div className='col-span-2 sm:col-span-3'>
				<label htmlFor='expiration-date' className={`block text-sm font-medium  ${isDark ? 'text-white' : 'text-gray-700'}`}>
					Expiration date (MM/YY)
				</label>
				<div className='mt-1'>
					<input type='text' name='expiration-date' id='expiration-date' autoComplete='cc-exp' className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm' />
				</div>
			</div>

			<div>
				<label htmlFor='cvc' className={`block text-sm font-medium  ${isDark ? 'text-white' : 'text-gray-700'}`}>
					CVC
				</label>
				<div className='mt-1'>
					<input type='text' name='cvc' id='cvc' autoComplete='csc' className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm' />
				</div>
			</div>
		</div>
	);
};

export default PaymentCard;
