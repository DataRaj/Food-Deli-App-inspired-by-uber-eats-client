import {useMutation, useReactiveVar} from '@apollo/client';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {isDarkVar} from '../../apollo/GlobalVar';
import {CREATE_PAYMENT} from '../../graphql/mutations';
import {CreatePaymentMutation, CreatePaymentMutationVariables} from '../../graphql/schemaTypes';

const PaymentPending = () => {
	const {state}: {state: any} = useLocation();
	const isDark = useReactiveVar(isDarkVar);
	const orderId = state.orderId;
	const update = (_, result) => {
		const {ok, message, url} = result?.data?.createPayment;
		if (ok && url) {
			window.location.href = url;
		} else {
			console.log(message);
		}
	};
	const [createPaymentHandler] = useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CREATE_PAYMENT, {update});
	useEffect(() => {
		createPaymentHandler({variables: {data: {orderId, payment_method: 'online'}}});
	}, []);

	return (
		<div className={`h-screen ${isDark ? 'bg-gray-900 ' : 'bg-gray-100 '} justify-center items-center flex flex-col`}>
			<div className='h-12  w-12 absolute border-2 border-green-400 animate-ping rounded-full'></div>
			<div className='h-16  w-16 absolute border-2 border-green-400 animate-wiggle rounded-full'></div>
			<div className='mt-52'>
				<p className={`font-bold ${isDark ? 'text-white ' : 'text-gray-900'}`}>Please Wait ...</p>
				<span className={` ${isDark ? 'text-white ' : 'text-gray-900'}`}>We are transfering you to the bank.</span>
			</div>
		</div>
	);
};

export default PaymentPending;
