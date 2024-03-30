import {faSadTear, IconDefinition} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import restaurantBg from '../../images/restaurants-bg.png';

interface IErrorPageProps {
	title?: string | null;
	message?: string | null;
	icon?: IconDefinition;
}
const ErrorPage: React.FC<IErrorPageProps> = ({title, message, icon}) => {
	return (
		<div className='h-screen w-full text-white flex flex-col items-center justify-center space-y-6 bg-cover bg-center ' style={{backgroundImage: `url(${restaurantBg})`}}>
			<div className='animate-wiggle text-5xl md:text-7xl'>
				<FontAwesomeIcon icon={icon ? icon : faSadTear} />
			</div>
			<h1 className='text-2xl md:text-5xl font-bold'>Something went wrong</h1>
			<h1 className='text-xl md:text-3xl font-bold lowercase'>{title}</h1>
			<p className='text-lg md:text-xl '>{message}</p>
			<Link className='hover:underline' to={'/'}>
				&larr; Go back home
			</Link>
		</div>
	);
};

export default ErrorPage;
