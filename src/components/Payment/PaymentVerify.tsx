import {useEffect} from 'react';
import {useMutation} from '@apollo/client';
import {VERIFY_PAYMENT} from '../../graphql/mutations';
import {useNavigate} from 'react-router-dom';
import Loading from '../loading/Loading';

const PaymentVerify = () => {
	const navigate = useNavigate();
	const update = (_, result) => {
		const {ok, message, orderId} = result?.data?.verifyPayment;
		if (ok && orderId && !loading) {
			sessionStorage.removeItem('basket');
			navigate('/payment/success', {state: {orderId}});
		} else {
			navigate('/payment/failed', {state: {message}});
		}
	};
	const [verifyPaymentHandler, {loading}] = useMutation(VERIFY_PAYMENT, {update});
	useEffect(() => {
		const url = new URL(window.location.href);
		const data = {refID: url.searchParams.get('Authority'), transactionId: url.pathname.split('/')[3]};
		verifyPaymentHandler({variables: {data}});
	}, []);

	return <>{loading && <Loading />}</>;
};

export default PaymentVerify;
