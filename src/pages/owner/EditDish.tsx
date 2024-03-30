import {useMutation, useQuery, useReactiveVar} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAdd, faCircleCheck, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {EDIT_DISH} from '../../graphql/mutations';
import {CreateDishInput, DishOptionInput, EditDishMutation, EditDishMutationVariables, GetDishQuery, GetDishQueryVariables} from '../../graphql/schemaTypes';
import ErrorSpan from '../../components/custom/ErrorSpan';
import {useEffect, useState} from 'react';
import * as filestack from 'filestack-js';
import {v4 as uuidv4} from 'uuid';
import {uploadPhotoHandler} from '../../services/UploadPhoto';
import {GET_DISH_BY_ID, RESTAURANT_OWNER} from '../../graphql/queries';
import Loading from '../../components/loading/Loading';
import {isDarkVar} from '../../apollo/GlobalVar';
export const client = filestack.init('AncOrYkrcRkll1kf2xYZ8z');

const EditDish = () => {
	let {id, dishId} = useParams();
	let navigate = useNavigate();
	const isDark = useReactiveVar(isDarkVar);
	const [serverMessage, setServerMessage] = useState<string | undefined>(undefined);
	const [changedOption, setChangedOption] = useState<boolean | undefined>(undefined);
	const [photoUrl, setPhotoUrl] = useState<string>('');
	const [optionAdded, setOptionAdded] = useState<Boolean>(false);
	const [newOption, setNewOption] = useState<DishOptionInput[] | undefined | null>();
	const [dish, setDish] = useState<any>(null);
	const {
		register,
		getValues,
		formState: {errors, isValid},
		handleSubmit,
		setError,
	} = useForm<CreateDishInput>({
		mode: 'onSubmit',
		defaultValues: {
			name: dish?.name,
			price: dish?.price,
			description: dish?.description,
			options: dish?.options,
		},
	});

	const onCompleted = (data: EditDishMutation) => {
		const {ok, message} = data?.editDish;
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
	const {data, error, loading: loadingDish} = useQuery<GetDishQuery, GetDishQueryVariables>(GET_DISH_BY_ID, {variables: {dishId: Number(dishId)}});
	useEffect(() => {
		if (!data?.getDish?.ok) {
			setServerMessage(data?.getDish?.message);
		}
		if (data && !loadingDish && !error) {
			setDish(data.getDish.dish);
			if (data?.getDish?.dish?.options) {
				setNewOption(data?.getDish?.dish?.options);
			}
		}
	}, [data]);

	const [dispatch, {loading}] = useMutation<EditDishMutation, EditDishMutationVariables>(EDIT_DISH, {
		onCompleted,
		refetchQueries: [{query: RESTAURANT_OWNER, variables: {data: {restaurantId: Number(id)}}}],
	});

	useEffect(() => {
		const {options} = getValues();

		if (options) {
			setNewOption(options);
		}
	}, [setNewOption, optionAdded]);

	useEffect(() => {
		const {options} = getValues();
		if (options) {
			setNewOption(options);
		}
	}, [changedOption]);

	const onValidSubmit = async () => {
		if (loading) return;
		const {name, description, price} = getValues();
		const optionItem = newOption
			?.filter((option) => option.extra > 0 || option.name !== '')
			.map((option: DishOptionInput) => ({...option, quantity: Number(option.quantity), extra: Number(option.extra)}));
		if (!isValid) {
			setError('name', {message: 'something went wrong!'});
		}
		if (data?.getDish?.ok && !loadingDish && !error && !loading && isValid) {
			dispatch({
				variables: {
					data: {
						dishId: Number(dishId),
						options: optionItem,
						name: name && name !== dish.name ? name : undefined,
						description: description && description !== dish.description ? description : undefined,
						price: price && Number(price) !== Number(dish.price) ? Number(price) : undefined,
						photo: photoUrl && photoUrl !== dish.photo ? photoUrl : undefined,
					},
				},
			});
		}
	};

	const randomId = uuidv4();

	const deleteOptionHndler = (id) => {
		const filteredOption = newOption?.filter((option) => option.id !== id);
		setNewOption(filteredOption);
	};

	const AddOptionHandler = () => {
		setOptionAdded((c) => (c ? false : true));
		const optionsItem: DishOptionInput | any = [];
		setNewOption((current) => {
			optionsItem.push({id: randomId, name: '', extra: 0, quantity: 0});
			return current?.concat(optionsItem);
		});
	};

	return (
		<>
			{dish ? (
				<div className='container flex flex-col h-screen items-center justify-center mx-auto '>
					<div className='w-full max-w-screen-sm flex flex-col items-center py-10 px-5 text-center bg-white '>
						<h3 className='font-bold text-lg text-gray-800 text-left w-full pl-10 '>{`Edit Dish #${id}`}</h3>

						<div className='flex flex-col mt-5 px-20 '>
							{errors?.name?.message && <ErrorSpan message={errors?.name?.message} />}
							{errors?.price?.message && <ErrorSpan message={errors?.price?.message} />}
							{serverMessage && <span className='span bg-green-500 text-white'>{serverMessage}</span>}
						</div>
						<form className='flex flex-col w-full mt-5 px-10  ' onSubmit={handleSubmit(onValidSubmit)}>
							<input defaultValue={dish.name} {...register('name')} className='input mb-3  text-black' type='text' placeholder='Name' />
							<input defaultValue={dish.price} {...register('price')} className='input mb-3  text-black' type='number' placeholder='Price' />
							<input defaultValue={dish.description} {...register('description')} className='input mb-3  text-black' type='text' placeholder='Description' />
							<span onClick={AddOptionHandler} className='cursor-pointer w-1/2 md:w-1/3  py-1  text-black px2 my-5 border-2 border-dotted border-gray-400'>
								Add Option
								<FontAwesomeIcon icon={faAdd} className='ml-2' />
							</span>

							{newOption &&
								newOption.length > 0 &&
								newOption?.map((option, index) => {
									return (
										<div key={`options[${index}]`} className=' w-full flex flex-row mt-2'>
											{/* @ts-ignore */}
											<input className='sr-only' defaultValue={option.id} {...register(`options[${index}].id`)} />
											{/* @ts-ignore */}
											<input className='sr-only' type={'number'} defaultValue={Number(option.quantity)} {...register(`options[${index}].quantity`)} />

											{/* @ts-ignore */}
											<input
												className='input mb-3 mx-2 md:mx-5 text-black'
												type='text'
												placeholder='name'
												defaultValue={option.name}
												/* @ts-ignore */
												{...register(`options[${index}].name`, {onBlur: () => setChangedOption((c) => (c ? false : true))})}
											/>

											{/* @ts-ignore */}
											<input
												className='input mb-3  w-16  text-center  text-black'
												type='number'
												min={0}
												placeholder='extra'
												defaultValue={Number(option.extra)}
												/* @ts-ignore */
												{...register(`options[${index}].extra`, {onBlur: () => setChangedOption((c) => (c ? false : true))})}
											/>

											<button type='button' className='text-white ml-4 px-2 py-1 w-8 h-8 mt-2  bg-rose-600' onClick={() => deleteOptionHndler(option.id)}>
												X
											</button>
										</div>
									);
								})}
							{!photoUrl ? (
								<div className='flex flex-row justify-center items-center mt-10 mx-auto'>
									<img className='w-40 h-40 mr-10 bg-no-repeat bg-center   ' src={dish?.photo} alt='dishImg' />
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
									<img className='w-40 h-40 mr-10 bg-no-repeat bg-center   ' src={photoUrl ? photoUrl : ''} alt='dishImg' />
									<span className='border-2 border-green-500  text-center px-20 py-5 my-6  text-green-600'>
										Photo Uploaded
										<span className='pl-5 '>
											<FontAwesomeIcon icon={faCircleCheck} />
										</span>
									</span>
								</div>
							)}
							<button className={'mt-5 py-2 btn hover:bg-green-500'} type='submit' disabled={loading || !data?.getDish?.ok}>
								{!loading && 'Submit'}
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

export default EditDish;
