/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import {useMutation, useQuery} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {CREATE_RESTAURANT} from '../../graphql/mutations';
import {CategoriesQuery, CategoriesQueryVariables, CreateRestaurantMutation, CreateRestaurantMutationVariables, UserRole} from '../../graphql/schemaTypes';
import ErrorSpan from '../../components/custom/ErrorSpan';
import {CATEGORIES, RESTAURANTS_OWNER} from '../../graphql/queries';
import {useEffect, useState} from 'react';
import {uploadPhotoHandler} from '../../services/UploadPhoto';
import useUser from '../../hooks/useUser';

const AddRestaurant = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState<any>([]);
	const [photoUrl, setPhotoUrl] = useState<string>('');
	const [serverMessage, setServerMessage] = useState<string | undefined>(undefined);
	const {user} = useUser();
	const {
		register,
		getValues,
		formState: {errors, isValid},
		handleSubmit,
		setError,
		clearErrors,
	} = useForm({
		mode: 'onChange',
	});
	useEffect(() => {
		if (user?.role !== UserRole.Owner) {
			navigate('/', {replace: true, state: {message: 'You are not authorized to access this page'}});
		}
	}, [user]);
	const onCompleted = (data: CreateRestaurantMutation) => {
		const {ok, message} = data?.createRestaurant;
		if (!ok) {
			setError('name', {message});
		}
		if (ok) {
			setServerMessage(message);
			navigate('/');
		}
	};
	const onCompletedCategories = (data: CategoriesQuery) => {
		const {ok, message, categories} = data?.getCategories;
		if (!ok && message) {
			setError('name', {message});
		}
		if (ok && categories) {
			setCategories(categories);
		}
	};
	const [dispatch, {loading}] = useMutation<CreateRestaurantMutation, CreateRestaurantMutationVariables>(CREATE_RESTAURANT, {
		onCompleted,
		refetchQueries: [{query: RESTAURANTS_OWNER}],
	});
	useQuery<CategoriesQuery, CategoriesQueryVariables>(CATEGORIES, {onCompleted: onCompletedCategories});

	const onValidSubmit = async () => {
		if (loading) return;
		const {name, address, categoryId} = getValues();
		dispatch({variables: {data: {name, coverImg: photoUrl, address, categoryId: Number(categoryId)}}});
	};

	const restaurantNameRegister = {required: {value: true, message: 'restaurant name is required'}};
	const addressRegister = {required: {value: true, message: 'address could not be empty'}};
	const categoryRegister = {required: {value: true, message: 'category could not be empty'}};
	const clearNameErrors = () => clearErrors('name');
	const clearAddressErrors = () => clearErrors('address');
	const clearCategoryErrors = () => clearErrors("category['name']");
	return (
		<>
			<div className='container flex flex-col h-screen items-center justify-center  mx-auto'>
				<div className='w-full max-w-screen-sm flex flex-col items-center py-10 px-5 text-center bg-white '>
					<h3 className='font-bold text-lg text-gray-800 text-left w-full pl-10 '>Add Restaurant</h3>
					<span className=' text-gray-600 text-left w-full pl-10'>
						by adding restaurant,you agree to our{' '}
						<Link className='text-green-500 pr-1' to='/'>
							policy
						</Link>
						and
						<Link className='text-green-500 pl-1' to='/'>
							rules
						</Link>
					</span>
					<div className='flex flex-col mt-5 px-20 '>
						{errors?.name?.message && <ErrorSpan message={`${errors?.name?.message}`} />}
						{errors?.address?.message && <ErrorSpan message={`${errors?.address?.message}`} />}
						{errors?.coverImg?.message && <ErrorSpan message={`${errors?.coverImg?.message}`} />}
						{serverMessage && <span className='span bg-green-500 text-white'>{serverMessage}</span>}
					</div>
					<form className='flex flex-col w-full mt-5 px-10 bg-white ' onSubmit={handleSubmit(onValidSubmit)}>
						<input
							{...register('name', restaurantNameRegister)}
							className='input mb-3  text-black'
							type='text'
							placeholder='Restaurant Name'
							onKeyDown={clearNameErrors}
						/>
						<input
							{...register('address', addressRegister)}
							className='input mb-3  text-black'
							type='text'
							placeholder='Restaurant Address'
							onKeyDown={clearAddressErrors}
						/>
						<select {...register('categoryId', categoryRegister)} className='input mb-3  text-black' onKeyDown={clearCategoryErrors}>
							<option className=' text-black'>Select Category</option>
							{categories &&
								categories
									.filter((category) => category.name !== 'All')
									.map((category) => (
										<option className=' text-black' key={category?.id} value={category?.id}>
											{category?.name}
										</option>
									))}
						</select>
						{!photoUrl ? (
							<button
								onClick={() => uploadPhotoHandler(setPhotoUrl)}
								type={'button'}
								className='border-4 border-dotted border-gray-200 text-center flex justify-center px-20 py-5 my-6 text-black'
							>
								Upload Photo
							</button>
						) : (
							<div className='flex flex-row w-full'>
								<span className='border-2 border-green-500 w-full  text-center flex justify-center px-20 py-5 my-6 text-green-600'>
									Photo Uploaded
									<span className='pl-5 '>
										<FontAwesomeIcon icon={faCircleCheck} />
									</span>
								</span>
							</div>
						)}

						<button
							className={!isValid ? 'bg-gray-300 btn py-2 mt-5 flex text-center justify-center items-center' : 'mt-5 py-2 btn'}
							type='submit'
							disabled={!isValid || loading}
						>
							{!loading && 'Add Restaurant'}
							{loading && (
								<div className='flex flex-row space-x-16 items-center justify-center'>
									<span className='text-white'>Loading</span>
									<svg className=' animate-spin  w-5 h-5 absolute  text-green-400'>
										<FontAwesomeIcon icon={faSpinner} />
									</svg>
								</div>
							)}
						</button>
					</form>
					<div className='mt-5'>
						<span className=' font-medium text-black'>Go Back?</span>
						<Link className='pl-2 text-lime-600 font-medium hover:underline' to={'/'}>
							Click here
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddRestaurant;
