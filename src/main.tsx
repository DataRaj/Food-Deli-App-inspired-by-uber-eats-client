import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo';
import {StateProvider} from './store/context/ContextManager';
import './index.css';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<>
		<ApolloProvider client={client}>
			<Router>
				<StateProvider>
					<App />
				</StateProvider>
			</Router>
		</ApolloProvider>
	</>,
);

reportWebVitals();
