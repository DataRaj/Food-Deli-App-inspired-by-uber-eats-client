import {useReactiveVar} from '@apollo/client';
import {useEffect} from 'react';
import {isDarkVar} from '../../apollo/GlobalVar';

const AddAddress = ({clearErrors, register, selectedAddress}) => {
	const isDark = useReactiveVar(isDarkVar);
	const addressRegister = {required: {value: selectedAddress ? false : true, message: 'address is required'}};
	const apartmentRegister = {required: {value: selectedAddress ? false : true, message: 'apartment is required'}};
	const cityRegister = {required: {value: selectedAddress ? false : true, message: 'city is required'}};
	const regionRegister = {required: {value: selectedAddress ? false : true, message: 'region is required'}};
	const postalCodeRegister = {required: {value: selectedAddress ? false : true, message: 'postal code is required'}};
	const clearAddressErrors = () => clearErrors('address');
	const clearApartmentErrors = () => clearErrors('apartment');
	const clearRegionErrors = () => clearErrors('region');
	const clearCityErrors = () => clearErrors('city');
	const clearPostalCodeErrors = () => clearErrors('postalCode');
	useEffect(() => {
		if (selectedAddress) {
			clearAddressErrors();
			clearApartmentErrors();
			clearRegionErrors();
			clearCityErrors();
			clearPostalCodeErrors();
		}
	}, [selectedAddress]);
	return (
		<div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3'>
			<div className='sm:col-span-3'>
				<label htmlFor='address' className={`block text-sm font-medium  ${isDark ? 'text-white' : 'text-gray-700'}`}>
					Address
				</label>
				<div className='mt-1'>
					<input
						{...register('address', addressRegister)}
						onKeyDown={clearAddressErrors}
						type='text'
						id='address'
						name='address'
						autoComplete='street-address'
						className='text-black block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm'
					/>
				</div>
			</div>

			<div className='sm:col-span-3'>
				<label htmlFor='apartment' className={`block text-sm font-medium  ${isDark ? 'text-white' : 'text-gray-700'}`}>
					Apartment, suite, etc.
				</label>
				<div className='mt-1'>
					<input
						{...register('apartment', apartmentRegister)}
						onKeyDown={clearApartmentErrors}
						type='text'
						id='apartment'
						name='apartment'
						className='text-black block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm'
					/>
				</div>
			</div>

			<div>
				<label htmlFor='city' className={`block text-sm font-medium  ${isDark ? 'text-white' : 'text-gray-700'}`}>
					City
				</label>
				<div className='mt-1'>
					<input
						{...register('city', cityRegister)}
						onKeyDown={clearCityErrors}
						type='text'
						id='city'
						name='city'
						autoComplete='address-level2'
						className='text-black block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm'
					/>
				</div>
			</div>

			<div>
				<label htmlFor='region' className={`block text-sm font-medium  ${isDark ? 'text-white' : 'text-gray-700'}`}>
					State / Province
				</label>
				<div className='mt-1'>
					<input
						{...register('region', regionRegister)}
						onKeyDown={clearRegionErrors}
						type='text'
						id='region'
						name='region'
						autoComplete='address-level1'
						className='text-black block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm'
					/>
				</div>
			</div>

			<div>
				<label htmlFor='postalCode' className={`block text-sm font-medium  ${isDark ? 'text-white' : 'text-gray-700'}`}>
					Postal code
				</label>
				<div className='mt-1'>
					<input
						{...register('postalCode', postalCodeRegister)}
						onKeyDown={clearPostalCodeErrors}
						type='number'
						id='postalCode'
						name='postalCode'
						autoComplete='postalCode'
						className='text-black block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm'
					/>
				</div>
			</div>
		</div>
	);
};

export default AddAddress;
