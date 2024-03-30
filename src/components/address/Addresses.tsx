import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {RadioGroup} from '@headlessui/react';
import {useEffect} from 'react';

import useUser from '../../hooks/useUser';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}
const Addresses = ({selectedAddress, setSelectedAddress, addAddressSelected}) => {
	const {user} = useUser();
	useEffect(() => {
		if (addAddressSelected) {
			setSelectedAddress(undefined);
		}
	}, [addAddressSelected]);

	return (
		<>
			<RadioGroup value={selectedAddress} onChange={setSelectedAddress}>
				<RadioGroup.Label className='text-base font-medium text-gray-900'>Select a address</RadioGroup.Label>

				<div className=' mt-4 grid grid-rows-1 gap-y-6 sm:grid-rows-1 sm:gap-x-4 '>
					{user?.address ? (
						user.address?.map((address) => {
							return (
								<RadioGroup.Option
									key={address.id}
									value={address}
									className={({active, checked}) => {
										let checking = addAddressSelected ? checked === false : checked === true;
										return classNames(
											checking && active && !addAddressSelected && 'bg-green-100',
											checking && !addAddressSelected && 'bg-green-100',
											'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none',
										);
									}}
								>
									{({checked}) => {
										let checking = addAddressSelected ? checked === false : checked === true;
										return (
											<>
												<div className='flex-1 flex'>
													<div className='flex flex-col'>
														<RadioGroup.Label as='span' className='block text-sm font-medium text-gray-900'>
															{address.address} , {address.apartment}
														</RadioGroup.Label>
														<RadioGroup.Description as='span' className='mt-1 flex items-center text-sm text-gray-500'>
															{address.postalCode} | {address.city} | {address.region}
														</RadioGroup.Description>
													</div>
												</div>
												<FontAwesomeIcon
													icon={faCheckCircle}
													className={classNames(!checked || addAddressSelected ? 'invisible' : '', 'h-5 w-5 text-green-600')}
													aria-hidden='true'
												/>
												<div
													className={classNames(
														checking && !addAddressSelected ? 'border' : 'border-2',
														checking && !addAddressSelected ? 'border-green-500' : 'border-transparent',
														'absolute -inset-px rounded-lg pointer-events-none',
													)}
													aria-hidden='true'
												/>
											</>
										);
									}}
								</RadioGroup.Option>
							);
						})
					) : (
						<div className='border-dotted border-2 border-gray-200 w-full py-10 my-4 text-center'>No address found</div>
					)}
				</div>
			</RadioGroup>
		</>
	);
};

export default Addresses;
