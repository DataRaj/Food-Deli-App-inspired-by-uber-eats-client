import {useMutation} from '@apollo/client';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {EditUserProfileMutation, EditUserProfileMutationVariables, UpdateUserInput, UserRole} from '../../graphql/schemaTypes';
import useUser from '../../hooks/useUser';
import {EDIT_USER_PROFILE} from '../../graphql/mutations';
import ErrorSpan from '../custom/ErrorSpan';
import Header from '../header/Header';

import {v4 as uuidv4} from 'uuid';
import {useState} from 'react';

const EditProfile = () => {
	const [serverMessage, setServerMessage] = useState('');
	const [inputPassword, setInputPassword] = useState(false);
	const [inputEmail, setInputEmail] = useState(true);
	let navigate = useNavigate();
	const {user, refetch} = useUser();
	const {
		register,
		getValues,
		formState: {errors},
		handleSubmit,
		setError,
		clearErrors,
	} = useForm<UpdateUserInput>({
		mode: 'onChange',
		defaultValues: {
			email: user?.email,
		},
	});

	const update = (cache, result) => {
		const {ok, message} = result.data?.updateUser;
		const newEmail = getValues().email;
		const newPassword = getValues().password;
		if (!ok) {
			setError('password', {message});
		}
		if (ok) {
			setServerMessage(message);
			cache.modify({
				id: `User:${user?.id}`,
				fields: {
					email() {
						return newEmail;
					},
					password() {
						return newPassword;
					},
					verified() {
						if (newEmail !== user?.email && inputEmail) return false;
					},
				},
			});
			setTimeout(() => {
				setServerMessage(message);
				clearErrors();
				navigate('/');
			}, 3000);
		}
	};
	const [loginHandler, {loading}] = useMutation<EditUserProfileMutation, EditUserProfileMutationVariables>(EDIT_USER_PROFILE, {update});

	const onValidSubmit = () => {
		if (loading) return;
		const {email, password} = getValues();

		inputEmail && loginHandler({variables: {data: {email}}});
		inputPassword && loginHandler({variables: {data: {...(password !== '' && {password})}}});
	};
	const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const emailRegister = {pattern: {value: emailPattern, message: 'email format is incorrect'}};
	const passwordRegister = {minLength: {value: 4, message: 'password should be greater than 4'}};
	const roleRegister = {required: {value: false, message: 'role should '}};
	const clearEmailErrors = () => clearErrors('email');
	const clearLoginErrors = () => clearErrors('password');
	const clearRoleErrors = () => clearErrors('role');
	return (
		<>
			<div className='container flex flex-col h-screen items-center justify-center '>
				<div className='w-full max-w-screen-sm flex flex-col items-center py-10 px-5 text-center '>
					<h3 className='font-bold text-lg text-gray-800 text-left w-full pl-10'>Update Your Profile</h3>
					<div className='w-full text-left pl-10 mt-10'>
						change your
						<span
							onClick={() => {
								setInputEmail(true);
								setInputPassword(false);
							}}
							className={` text-white text-lg cursor-pointer mx-2 px-2 py-1  ${inputEmail ? 'bg-black' : 'bg-gray-400'}  `}
						>
							Email
						</span>
						or
						<span
							onClick={() => {
								setInputPassword(true);
								setInputEmail(false);
							}}
							className={` text-white text-lg cursor-pointer  mx-2 px-2 py-1   ${inputPassword ? 'bg-black' : 'bg-gray-400'} `}
						>
							Password
						</span>
					</div>
					<div className='flex flex-col mt-5 px-20 '>
						{errors?.email?.message && <ErrorSpan message={errors?.email?.message} />}
						{errors?.password?.message && <ErrorSpan message={errors?.password?.message} />}
						{serverMessage && <span className='bg-green-600 text-white px-4 span'>{serverMessage}</span>}
					</div>

					<form className='flex flex-col w-full mt-5 px-10' onSubmit={handleSubmit(onValidSubmit)}>
						{inputEmail && <input className='input mb-3' {...register('email', emailRegister)} type='text' placeholder='Email' onKeyDown={clearEmailErrors} />}
						{inputPassword && <input className='input mb-3' {...register('password', passwordRegister)} type='password' placeholder='Password' onKeyDown={clearLoginErrors} />}
						{user?.role === UserRole.Admin && (
							<select className='input mb-3' onKeyDown={clearRoleErrors} {...register('role', roleRegister)}>
								{Object.keys(UserRole).map((role, key) => (
									<option key={uuidv4()} value={role}>
										{role}
									</option>
								))}
							</select>
						)}
						<button className={loading ? 'bg-gray-300 btn' : 'btn'} type='submit' disabled={loading}>
							{loading && 'Loading...'}
							{inputEmail && 'Update Email'}
							{inputPassword && 'Update Password'}
						</button>
					</form>
					<div className='mt-5'>
						<span className=' font-medium'>Go Back?</span>
						<Link className='pl-2 text-lime-600 font-medium hover:underline' to={'/'}>
							Click here
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProfile;
