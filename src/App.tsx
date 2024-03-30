import {useReactiveVar} from '@apollo/client';
import {useLocation} from 'react-router-dom';
import {isDarkVar} from './apollo/GlobalVar';
import Header from './components/header/Header';
import Basket from './components/shopping-cart/Basket';
import Routes from './routes';
import {useStateValue} from './store/context/ContextManager';
const App = () => {
	const isDark = useReactiveVar(isDarkVar);
	const [state] = useStateValue();
	const location = useLocation();
	const checkPath =
		location.pathname === '/payment/pending' ||
		location.pathname === '/payment/verify/:reserve' ||
		location.pathname === '/auth/login' ||
		location.pathname === '/auth/signup';
	return (
		<div className={`h-full ${isDark && 'bg-black text-white'}`}>
			{!checkPath && <Header />}
			{state.basket.status && <Basket />}
			<Routes />
		</div>
	);
};

export default App;
