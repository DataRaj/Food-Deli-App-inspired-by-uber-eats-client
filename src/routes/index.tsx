import {Route, Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Confirm from '../components/email/Confirm';
import EditProfile from '../components/user/EditProfile';
import ClientRestaurant from '../pages/client/Restaurant';
import OwnerRestaurant from '../pages/owner/SingleRestaurant';
import ErrorPage from '../components/custom/ErrorPage';
import AddRestaurant from '../pages/owner/AddRestaurant';
import AddDish from '../pages/owner/AddDish';
import Basket from '../components/shopping-cart/Basket';
import Checkout from '../pages/Checkout';
import PaymentPending from '../components/Payment/PaymentPending';
import PaymentVerify from '../components/Payment/PaymentVerify';
import PaymentSuccess from '../components/Payment/PaymentSuccess';
import PaymentFailed from '../components/Payment/PaymentFailed';
import Orders from '../components/order/Orders';
import OrderSingle from '../components/order/OrderSingle';
import EditDish from '../pages/owner/EditDish';
import EditRestaurant from '../pages/owner/EditRestaurant';
import AddCategory from '../pages/owner/AddCategory';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/auth/login' element={<Login />} />
			<Route path='/auth/signup' element={<Signup />} />
			<Route path='restaurant/:id' element={<ClientRestaurant />} />
			<Route path='restaurant/owner/:id' element={<OwnerRestaurant />} />
			<Route path='restaurant/owner/:id/add-dish' element={<AddDish />} />
			<Route path='restaurant/owner/:id/edit-dish/:dishId' element={<EditDish />} />
			<Route path='restaurant/:id/edit-restaurant' element={<EditRestaurant />} />
			<Route path='restaurant/add' element={<AddRestaurant />} />
			<Route path='category/add' element={<AddCategory />} />
			<Route path='/confirm' element={<Confirm />} />
			<Route path='/basket' element={<Basket />} />
			<Route path='/checkout' element={<Checkout />} />
			<Route path='/user/edit' element={<EditProfile />} />
			<Route path='/payment/pending' element={<PaymentPending />} />
			<Route path='/payment/success' element={<PaymentSuccess />} />
			<Route path='/payment/failed' element={<PaymentFailed />} />
			<Route path='/payment/verify/:reserve' element={<PaymentVerify />} />
			<Route path='/order/:id' element={<OrderSingle />} />
			<Route path='/orders' element={<Orders />} />
			<Route path='*' element={<ErrorPage title='404' message='Nothing Found' />} />
		</Routes>
	);
};
export default Router;
