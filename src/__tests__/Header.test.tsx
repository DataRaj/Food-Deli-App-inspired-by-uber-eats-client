import {render} from '@testing-library/react';
import Header from '../components/header/Header';
import {MockedProvider} from '@apollo/client/testing';
import {BrowserRouter as Router} from 'react-router-dom';

jest.mock('../routes', () => {
	return () => <div>Routes</div>;
});
describe('<Header/>', () => {
	test('renders Header', () => {
		render(
			<MockedProvider>
				<Router>
					<Header />
				</Router>
			</MockedProvider>,
		);
	});
});
