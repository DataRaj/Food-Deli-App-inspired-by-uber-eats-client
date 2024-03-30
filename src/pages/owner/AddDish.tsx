import {useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAdd, faCircleCheck, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {CREATE_DISH} from '../../graphql/mutations';
import {CreateDishInput, CreateDishMutation, CreateDishMutationVariables} from '../../graphql/schemaTypes';
import ErrorSpan from '../../components/custom/ErrorSpan';
import {useState} from 'react';
import * as filestack from 'filestack-js';
import {v4 as uuidv4} from 'uuid';
import {uploadPhotoHandler} from '../../services/UploadPhoto';
export const client = filestack.init('AncOrYkrcRkll1kf2xYZ8z');

const AddDish = () => {
	let {id} = useParams();
	let navigate = useNavigate();
	const [serverMessage, setServerMessage] = useState<string | undefined>(undefined);
	const [photoUrl, setPhotoUrl] = useState<string>('');

	const {
		register,
		getValues,

		formState: {errors, isValid},
		handleSubmit,
		setError,
		clearErrors,
		setValue,
	} = useForm<CreateDishInput>({
		mode: 'onChange',
	});

	const onCompleted = (data: CreateDishMutation) => {
		const {ok, message} = data?.createDishe;
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

	const [dispatch, {loading}] = useMutation<CreateDishMutation, CreateDishMutationVariables>(CREATE_DISH, {onCompleted});

	const onValidSubmit = async () => {
		if (loading) return;
		const {name, price, description, ...rest} = getValues();

		const options = optionNumber.map((id) => ({id: String(id), name: rest[`dishOptionName-${id}`], quantity: 0, extra: +rest[`dishOptionExtra-${id}`]}));
		dispatch({variables: {data: {restaurantId: Number(id), name, price: Number(price), description, options, photo: photoUrl}}});
	};
	const randomId = uuidv4();
	const restaurantNameRegister = {required: {value: true, message: 'restaurant name is required'}};
	const priceRegister = {required: {value: true, message: 'category could not be empty'}};
	const descriptionRegister = {required: {value: true, message: 'description could not be empty'}};
	const clearNameErrors = () => clearErrors('name');
	const clearPriceErrors = () => clearErrors('price');
	const clearDescriptionErrors = () => clearErrors('description');
	const [optionNumber, setOptionNumber] = useState<number[]>([]);

	const deleteOptionHndler = (id) => {
		setOptionNumber((current) => current.filter((item) => item !== id));
		//  @ts-ignore
		setValue(`dishOptionName-${id}`, '');
		// @ts-ignore
		setValue(`dishOptionExtra-${id}`, '');
	};
	const AddOptionHandler = () => {
		setOptionNumber((current) => [...current, randomId]);
	};

	return (
		<>
			<div className='container flex flex-col h-screen items-center justify-center  mx-auto'>
				<div className='w-full max-w-screen-sm flex flex-col items-center py-10 px-5 text-center bg-white '>
					<h3 className='font-bold text-lg text-gray-800 text-left w-full pl-10 '>Add Dish</h3>
					<span className=' text-gray-600 text-left w-full pl-10'>
						by adding restaurant,you agree to our{' '}
						<Link className='text-green-400 pr-1' to='/'>
							policy
						</Link>
						and
						<Link className='text-green-400 pl-1' to='/'>
							rules
						</Link>
					</span>
					<div className='flex flex-col mt-5 px-20 '>
						{errors?.name?.message && <ErrorSpan message={errors?.name?.message} />}
						{errors?.price?.message && <ErrorSpan message={errors?.price?.message} />}
						{serverMessage && <span className='span bg-green-500 text-white'>{serverMessage}</span>}
					</div>
					<form className='flex flex-col w-full mt-5 px-10 bg-white ' onSubmit={handleSubmit(onValidSubmit)}>
						<input {...register('name', restaurantNameRegister)} className='input mb-3  text-black' type='text' placeholder='Name' onKeyDown={clearNameErrors} />
						<input {...register('price', priceRegister)} className='input mb-3  text-black' type='text' placeholder='Price' onKeyDown={clearPriceErrors} />
						<input
							{...register('description', descriptionRegister)}
							className='input mb-3  text-black'
							type='text'
							placeholder='Description'
							onKeyDown={clearDescriptionErrors}
						/>
						<span onClick={() => AddOptionHandler()} className='cursor-pointer w-1/2 md:w-1/3  text-black  py-1 px2 my-5 border-2 border-dotted border-gray-400'>
							Add Option
							<FontAwesomeIcon icon={faAdd} className='ml-2' />
						</span>

						{optionNumber?.length > 0 &&
							optionNumber.map((id, i) => {
								return (
									<div key={i} className='w-full flex flex-row mt-2'>
										{/* @ts-ignore */}
										<input
											/* @ts-ignore */
											{...register(`dishOptionName-${id}`, restaurantNameRegister)}
											className='w-40 md:w-1/2 input mb-3 mx-auto  text-black'
											type='text'
											placeholder='name'
										/>
										{/* @ts-ignore */}
										<input
											/* @ts-ignore */
											{...register(`dishOptionExtra-${id}`, restaurantNameRegister)}
											className='w-16 md:w-1/3 input mb-3  mx-auto text-black'
											type='number'
											min={0}
											placeholder='price'
										/>

										<button type='button' className='text-white ml-4 px-2 py-1 w-8 h-8 mt-2  bg-rose-600' onClick={() => deleteOptionHndler(id)}>
											X
										</button>
									</div>
								);
							})}

						{!photoUrl ? (
							<button
								onClick={() => uploadPhotoHandler(setPhotoUrl)}
								type={'button'}
								className=' border-4 border-dotted border-gray-200 text-center px-20 py-5 my-6 text-black'
							>
								Upload Photo
							</button>
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
						<button
							className={!isValid ? 'bg-gray-300 btn py-2 mt-5 flex text-center justify-center items-center' : 'mt-5 py-2 btn'}
							type='submit'
							disabled={!isValid || loading}
						>
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
		</>
	);
};

export default AddDish;
