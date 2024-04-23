import {useMutation, useReactiveVar} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import 'react-phone-number-input/style.css';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import {SIGN_UP_MUTATION} from '../graphql/mutations';
import LogoWhite from '../images/uber-eats-white.svg';
import Logo from '../images/uber-eats.svg';
import {
	CreateAccountInput,
	CreateAccountMutation,
	CreateAccountMutationVariables,
	UserRole,
} from '../graphql/schemaTypes';
import ErrorSpan from '../components/custom/ErrorSpan';
import {useState} from 'react';
import {isDarkVar} from '../apollo/GlobalVar';
import { uniqueId } from 'filestack-js';
const Signup = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const {state}: {state: any} = useLocation();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [mobile, setMobile] = useState<any>('+91');
	const navigate = useNavigate();
	const isDark = useReactiveVar(isDarkVar);
	const {
		register,
		getValues,
		formState: {errors, isValid},
		handleSubmit,
		setError,
		control,
		clearErrors,
	} = useForm<CreateAccountInput>({
		mode: 'onChange',
		defaultValues: {
			role: UserRole.Client,
		},
	});

	const onCompleted = (data: CreateAccountMutation) => {
		const {ok, message} = data?.createAccount ;
		if (!ok) {
			setError('email', {message});
		} else {
			const {email, password} = getValues();
			navigate('/auth/login', {replace: true, state: {message, email, password}});
		}
	};
	const [signupHandler, {loading}] = useMutation<
		CreateAccountMutation,
		CreateAccountMutationVariables
	>(SIGN_UP_MUTATION, {onCompleted});

	const onValidSubmit = () => {
		if (loading) return;
		const {email, password, role, firstName, lastName} = getValues();

		const lowerCaseEmail = email.toLowerCase();
		const lowerCaseFirstName = firstName.toLowerCase();
		const lowerCaseLastName = lastName.toLowerCase();

		signupHandler({
			variables: {
				data: {
					email: lowerCaseEmail,
					password,
					role,
					firstName: lowerCaseFirstName,
					lastName: lowerCaseLastName,
					mobile,
				},
			},
		});
	};
	const emailPattern =
		// eslint-disable-next-line no-useless-escape
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const emailRegister = {
		required: {value: true, message: 'email is required'},
		pattern: {value: emailPattern, message: 'email format is incorrect'},
		minLength: {value: 5, message: 'email must be more than 5 charachter'},
	};
	const passwordRegister = {
		required: {value: true, message: 'password could not be empty'},
		minLength: {value: 4, message: 'password should be greater than 4'},
	};
	const roleRegister = {required: {value: true, message: 'role could not be empty'}};
	const firstNameRegister = {required: {value: true, message: 'firstName could not be empty'}};
	const lastNameRegister = {required: {value: true, message: 'lastName could not be empty'}};
	const clearEmailErrors = () => clearErrors('email');
	const clearLoginErrors = () => clearErrors('password');
	const clearRoleErrors = () => clearErrors('role');
	const clearFirstNameErrors = () => clearErrors('firstName');
	const clearLastNameErrors = () => clearErrors('lastName');
	return (
		<div className='container flex flex-col h-screen items-center justify-center mx-auto'>
			<div className='w-full max-w-screen-sm flex flex-col items-center py-10 px-5 text-center '>
				<Link to={'/'} className='flex mb-20 relative'>
					{!isDark && (
						<img className='w-40 md:w-48 p-1 cursor-pointer' src={Logo} alt='logo' />
					)}
					{isDark && (
						<img
							className='w-40 md:w-48 p-1  cursor-pointer'
							src={LogoWhite}
							alt='logo'
						/>
					)}
				</Link>
				<h3
					className={`font-bold text-lg ${
						isDark ? 'text-white' : 'text-gray-800'
					} text-left mt-8  w-full pl-10`}
				>
					Welcome to Uber
				</h3>
				<span
					className={` ${isDark ? 'text-white' : 'text-gray-600'} text-left w-full pl-10`}
				>
					Sign up with your information.
				</span>
				<div className='flex flex-col mt-5 px-20 '>
					{state?.message !== undefined ? (
						<span className='bg-green-600 span'>{state?.message}</span>
					) : null}
					{state?.error !== undefined ? <ErrorSpan message={state?.error} /> : null}
					{errors?.email?.message && <ErrorSpan message={errors?.email?.message} />}
					{errors?.password?.message && <ErrorSpan message={errors?.password?.message} />}
				</div>
				<form
					className='flex flex-col w-full mt-5 px-10'
					onSubmit={handleSubmit(onValidSubmit)}
				>
					<input
						className='input mb-3 focus:ring-0 focus:border-gray-400 text-black lowercase'
						{...register('firstName', firstNameRegister)}
						type='text'
						placeholder='First Name'
						onKeyDown={clearFirstNameErrors}
					/>
					<input
						className='input mb-3 focus:ring-0 focus:border-gray-400 text-black lowercase'
						{...register('lastName', lastNameRegister)}
						type='text'
						placeholder='Last Name'
						onKeyDown={clearLastNameErrors}
					/>
					<input
						className='input mb-3 focus:ring-0 focus:border-gray-400 text-black lowercase'
						{...register('email', emailRegister)}
						type='text'
						placeholder='Email'
						onKeyDown={clearEmailErrors}
					/>
					<input
						className='input mb-3 focus:ring-0 focus:border-gray-400'
						{...register('password', passwordRegister)}
						type='password'
						placeholder='Password'
						onKeyDown={clearLoginErrors}
					/>
					<div className=' my-5 focus:ring-0 focus:border-gray-400 text-black lowercase '>
						<PhoneInputWithCountry
							name='phoneInputWithCountrySelect'
							control={control}
							rules={{required: true}}
							placeholder='Enter phone number'
							value={mobile}
							onChange={setMobile}
							defaultCountry='IN'
						/>
					</div>
					<select
						className='input mb-3 focus:ring-0 focus:border-gray-400 text-black '
						{...register('role', roleRegister)}
						onKeyDown={clearRoleErrors}
					>
						{Object.keys(UserRole).map((role, key) => (
							<option key={key} value={role}>
								{role}
							</option>
						))}
					</select>
					<button
						className={`btn mt-5 ${isDark ? 'bg-green-500 text-black' : 'bg-black'}`}
						type='submit'
						disabled={loading}
					>
						{loading ? 'Loading...' : 'Sign Up'}
					</button>
				</form>
				<div className='mt-5'>
					<span className=' font-medium'>Have an account?</span>
					<Link className='pl-2 text-green-600 font-medium' to={'/auth/login'}>
						Log In
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signup;
