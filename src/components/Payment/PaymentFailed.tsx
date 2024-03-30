import {Link, useLocation} from 'react-router-dom';
import OrderFailedImg from '../../images/order-failed.svg';

const PaymentFailed = () => {
	const {state}: {state: any} = useLocation();

	return (
		<div className='container mx-auto px-4 sm:px-6 lg:px-8 '>
			<div className='flex h-screen  justify-center items-center'>
				<div className='flex p-10 justify-center items-center bg-red-700 shadow-2xl rounded-lg'>
					<div className='w-24 mr-5 flex-shrink-0 animate-wiggle'>
						<img src={OrderFailedImg} alt='' />
					</div>
					<div>
						<h4 className='text-base md:text-lg font-bold text-white'>Payment Failed !</h4>
						<p className='mt-1 text-white font-bold text-xs md:text-base'>{state.message}</p>
						<Link to={'/checkout'}>
							<button className='btn mt-10 font-bold text-xs md:text-base flex mx-auto px-5 bg-white text-gray-600'>Try Again</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentFailed;
