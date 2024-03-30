import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {reducer} from './reducer/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import sagaMiddlewares from './saga/allWatcher';

const composeEnhancers = composeWithDevTools({trace: true, traceLimit: 25});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagaMiddlewares);

export default store;
