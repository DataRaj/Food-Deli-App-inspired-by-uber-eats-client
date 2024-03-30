import {useLazyQuery} from '@apollo/client';
import {Transition} from '@headlessui/react';
import {Fragment, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {SEARCH_RESTAURANT} from '../../graphql/queries';
import {SearchRestaurantsQuery, SearchRestaurantsQueryVariables} from '../../graphql/schemaTypes';
import restaurantBg from '../../images/restaurants-bg.png';
import {actions} from '../../store/actions';
import {useStateValue} from '../../store/context/ContextManager';

const RestaurantsSearch = () => {
	const [query, setQuery] = useState(null);
	const [message, setMessage] = useState<string | undefined>('');
	const [show, setShow] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, dispatch] = useStateValue();
	const {register, getValues, handleSubmit, clearErrors, reset} = useForm({
		mode: 'onSubmit',
	});

	const onValidSubmit = (e) => {
		const {restaurantName} = getValues();
		setQuery(restaurantName);
	};
	const clearSearchErrors = () => clearErrors('restaurantName');

	const onCompleted = (data: SearchRestaurantsQuery) => {
		const {ok, message, restaurants} = data?.searchRestaurants;
		if (!ok) {
			setMessage(message);
			setShow(true);
			setTimeout(() => {
				setShow(false);
			}, 2000);
		}
		if (ok && restaurants) {
			dispatch({
				type: actions.RESTAURANTS,
				payload: {restaurants},
			});
			setQuery(null);
			reset({restaurantName: ''});
		}
	};

	const [handler, {loading}] = useLazyQuery<SearchRestaurantsQuery, SearchRestaurantsQueryVariables>(SEARCH_RESTAURANT, {onCompleted});
	useEffect(() => {
		if (query) {
			handler({
				variables: {
					data: {query},
				},
			});
		} else if (query === '') {
			window.location.reload();
		}
	}, [query, handler]);

	useEffect(() => {
		setTimeout(() => {
			setShow(false);
		}, 2000);
		return () => {
			setShow(true);
		};
	}, [message]);

	return (
		<div className='w-full flex flex-col items-center justify-center bg-cover bg-center py-36 ' style={{backgroundImage: `url(${restaurantBg})`}}>
			<div className='flex w-full items-center text-center text-white h-8 justify-center  text-4xl'>
				<span>Uber Eats</span>
			</div>
			<div className='flex px-2 mt-4 items-center text-center border-t-2 border-white  text-white h-8 justify-center  text-2xl'>
				<span className='mt-2'>Get the food you want</span>
			</div>

			<form
				onSubmit={handleSubmit(onValidSubmit)}
				className='w-full max-w-screen-md md:max-w-screen-xl flex items-center justify-center font-bold text-lg  text-center py-14 my-4'
			>
				<input
					id='searchInput'
					className='input border-0 w-3/6  placeholder:text-sm md:placeholder:text-lg'
					type='search'
					{...register('restaurantName', {})}
					placeholder='Search Restaurants...'
					onKeyDown={clearSearchErrors}
				/>
				<button className='bg-black border-0 text-white py-2 px-4 '>Find</button>
			</form>
			{message && (
				<Transition
					show={show}
					as={Fragment}
					enter='transform ease-out duration-300 transition'
					enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
					enterTo='translate-y-0 opacity-100 sm:translate-x-0'
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<p className=' flex justify-center items-center rounded-lg text-white bg-red-500 px-5 absolute'>{message}</p>
				</Transition>
			)}
			{loading && (
				<div className=' flex justify-center items-center '>
					<div className='h-12  w-12 absolute border-2 border-green-400 animate-ping rounded-full'></div>
					<div className='h-14  w-14 absolute border-2 border-green-400 animate-ping rounded-full'></div>
					<div className='h-16  w-16 absolute border-2 border-green-400 animate-wiggle rounded-full'></div>
				</div>
			)}
		</div>
	);
};

export default RestaurantsSearch;
