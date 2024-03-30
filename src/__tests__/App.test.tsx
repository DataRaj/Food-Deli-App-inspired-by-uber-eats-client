import {render} from '@testing-library/react';
import App from '../App';

jest.mock('../routes', () => {
	return () => <div>Routes</div>;
});
describe('<App/>', () => {
	test('renders App', () => {
		const {debug} = render(<App />);
		// eslint-disable-next-line testing-library/no-debugging-utils
		debug();
	});
});
