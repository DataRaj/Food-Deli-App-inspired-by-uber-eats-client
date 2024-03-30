import {useMutation, useQuery} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {EDIT_RESTAURANT} from '../../graphql/mutations';
import {
	CategoriesQuery,
	CategoriesQueryVariables,
	CategoryInput,
	EditRestaurantMutation,
	EditRestaurantMutationVariables,
	Restaurant,
	RestaurantOwnerQuery,
	RestaurantOwnerQueryVariables,
	UserRole,
} from '../../graphql/schemaTypes';
import ErrorSpan from '../../components/custom/ErrorSpan';
import {CATEGORIES, RESTAURANTS_OWNER, RESTAURANT_OWNER} from '../../graphql/queries';
import {useEffect, useState} from 'react';
import {uploadPhotoHandler} from '../../services/UploadPhoto';
import useUser from '../../hooks/useUser';
import Loading from '../../components/loading/Loading';

const EditRestaurant = () => {
	let navigate = useNavigate();
	let {id} = useParams();
	const [restaurant, setRestaurant] = useState<any>(undefined);
	const [categories, setCategories] = useState<any>([]);
	const [changedCategory, setChangedCategory] = useState<boolean | undefined>(undefined);
	const [newCategory, setNewCategory] = useState<CategoryInput[] | undefined | null>();

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
		mode: 'onSubmit',
		defaultValues: {
			name: restaurant?.name,
			category: restaurant?.category?.name,
			address: restaurant?.address,
			photo: restaurant?.coverImg,
		},
	});

	const {data, error, loading: loadingDish} = useQuery<RestaurantOwnerQuery, RestaurantOwnerQueryVariables>(RESTAURANT_OWNER, {variables: {data: {restaurantId: Number(id)}}});
	useEffect(() => {
		if (!data?.getOwnerRestaurant?.ok) {
			setServerMessage(data?.getOwnerRestaurant?.message);
		}
		if (data && !loadingDish && !error) {
			setRestaurant(data?.getOwnerRestaurant?.restaurant);
		}
	}, [data]);

	// useEffect(() => {
	// 	if (user?.role !== UserRole.Owner) {
	// 		navigate('/', {replace: true, state: {message: 'You are not authorized to access this page'}});
	// 	}
	// }, [user]);

	const onCompleted = (data: EditRestaurantMutation) => {
		const {ok, message} = data?.editRestaurant;
		if (!ok) {
			setError('name', {message});
		}

		if (ok) {
			setServerMessage(message);
			setTimeout(() => {
				navigate(`/restaurant/owner/${id}`);
			}, 1500);
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
	const [dispatch, {loading}] = useMutation<EditRestaurantMutation, EditRestaurantMutationVariables>(EDIT_RESTAURANT, {
		onCompleted,
		refetchQueries: [{query: RESTAURANT_OWNER, variables: {data: {restaurantId: Number(id)}}}],
	});
	useQuery<CategoriesQuery, CategoriesQueryVariables>(CATEGORIES, {onCompleted: onCompletedCategories});

	useEffect(() => {
		const {category} = getValues();
		if (category) {
			setNewCategory(category);
		}
	}, [changedCategory]);

	const onValidSubmit = async () => {
		if (loading) return;
		const {name, address} = getValues();
		if (!isValid) {
			setError('name', {message: 'invalid request!'});
		}
		if (data?.getOwnerRestaurant?.ok && !loadingDish && !error && !loading && isValid) {
			dispatch({
				variables: {
					data: {
						name: name && name !== restaurant.name ? name : undefined,
						coverImg: photoUrl && photoUrl !== restaurant.coverImg ? photoUrl : undefined,
						address: address && address !== restaurant.address ? address : undefined,
						restaurantId: Number(id),
						categoryId: Number(newCategory) && Number(newCategory) !== Number(restaurant.category.id) ? Number(newCategory) : undefined,
					},
				},
			});
		}
	};

	const clearNameErrors = () => clearErrors('name');
	const clearAddressErrors = () => clearErrors('address');
	const clearCategoryErrors = () => clearErrors('category');

	return (
		<>
			{restaurant ? (
				<div className='container flex flex-col h-screen items-center justify-center  mx-auto'>
					<div className='w-full max-w-screen-sm flex flex-col items-center py-10 px-5 text-center bg-white '>
						<h3 className='font-bold text-lg text-gray-800 text-left w-full pl-10 '>Edit Restaurant</h3>

						<div className='flex flex-col mt-5 px-20 '>
							{errors?.name?.message && <ErrorSpan message={errors?.name?.message} />}
							{errors?.address?.message && <ErrorSpan message={errors?.address?.message} />}
							{serverMessage && <span className='span bg-green-500 text-white'>{serverMessage}</span>}
						</div>
						<form className='flex flex-col w-full mt-5 px-10 bg-white ' onSubmit={handleSubmit(onValidSubmit)}>
							<input
								defaultValue={restaurant.name}
								{...register('name')}
								className='input mb-3 text-black'
								type='text'
								placeholder='Restaurant Name'
								onKeyDown={clearNameErrors}
							/>
							<input
								defaultValue={restaurant.address}
								{...register('address')}
								className='input mb-3 text-black'
								type='text'
								placeholder='Restaurant Address'
								onKeyDown={clearAddressErrors}
							/>

							<select
								defaultValue={restaurant.category.id}
								{...register('category', {onChange: () => setChangedCategory((c) => (c ? false : true))})}
								className='input mb-3 text-black uppercase'
								onKeyDown={clearCategoryErrors}
							>
								{categories &&
									categories
										.filter((category) => category.name !== 'All')
										.map((category) => {
											return (
												<option className='uppercase text-black' key={category?.id} value={category?.id} selected={category.id === restaurant.category.id}>
													{category?.name}
												</option>
											);
										})}
							</select>

							{!photoUrl ? (
								<div className='flex flex-row justify-center items-center mt-10'>
									<img className='w-20 h-20 md:w-40 md:h-40 mr-10 bg-no-repeat bg-center   ' src={restaurant.coverImg} alt='restaurantImg' />
									<button
										onClick={() => uploadPhotoHandler(setPhotoUrl)}
										type={'button'}
										className='border-4 border-dotted border-gray-200 text-center px-10 md:px-20 py-5 my-6 text-black'
									>
										Change Photo
									</button>
								</div>
							) : (
								<div className='flex flex-row justify-center items-center mt-10 '>
									<img className=' w-20 h-20  md:w-40 md:h-40 mr-10 bg-no-repeat bg-center   ' src={photoUrl ? photoUrl : ''} alt='restaurantImg' />
									<span className='border-2 border-green-500  text-center px-20 py-5 my-6  text-green-600'>
										Photo Uploaded
										<span className='pl-5 '>
											<FontAwesomeIcon icon={faCircleCheck} />
										</span>
									</span>
								</div>
							)}

							<button className='mt-5 py-2 btn hover:bg-green-500' type='submit' disabled={loading}>
								{!loading && 'Edit Restaurant'}
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
							<Link className='pl-2 text-lime-600 font-medium hover:underline' to={`/restaurant/owner/${id}`}>
								Click here
							</Link>
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
};

export default EditRestaurant;
