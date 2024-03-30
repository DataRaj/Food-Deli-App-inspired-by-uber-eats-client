import Banner from '../components/banner/Banner';
import Footer from '../components/footer/Footer';
import Loading from '../components/loading/Loading';
import {UserRole} from '../graphql/schemaTypes';
import useUser from '../hooks/useUser';
import Client from './client/Client';
import Driver from './driver/Driver';
import Owner from './owner/Owner';

const Home = () => {
	const {user, loading} = useUser();

	const homeHandler = () => {
		if (user) {
			if (user.role === UserRole.Owner) {
				return <Owner />;
			}
			if (user.role === UserRole.Delivery) {
				return <Driver />;
			}
			if (user.role === UserRole.Client) {
				return <Client />;
			}
		} else {
			return <Client />;
		}
	};
	return (
		<div>
			{!loading && (
				<div className='font-[Rubik]'>
					{/* {!user?.verified && user && <Banner text={'please click on the link that we sent to your email'} color={'white'} bgcolor={'red'} />} */}
					{homeHandler()}
					<Footer />
				</div>
			)}
		</div>
	);
};

export default Home;
