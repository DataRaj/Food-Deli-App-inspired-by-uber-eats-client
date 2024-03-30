import {takeEvery, put, call} from 'redux-saga/effects';
import {actions} from '../actions';
// import Axios from '../../Https/axios';
// const axios = new Axios();

//TODO FETCH Worker
function* fetchUserWorker(action) {
	try {
		// const users = yield call(() => axios.get('user/add').then((res) => res.data.items));
		yield put({type: actions.SEND_MESSAGE_SUCCESS, payload: {messages: action.payload.messages}});
		yield put({type: actions.FETCH_USER_SUCCESS, payload: {isLogin: action.payload.login}});
	} catch (error) {
		yield put({type: actions.SEND_MESSAGE_FAILED, payload: {messages: error.message}});
		yield put({type: actions.FETCH_USER_FAILED, payload: {messages: error.message}});
	}
}
//STUB FETCH Watcher
export function* fetchUserWatcher() {
	yield takeEvery(actions.SEND_MESSAGE, fetchUserWorker);
}

//TODO FETCH Worker
function* chatWorker(action) {
	try {
		// const users = yield call(() => axios.get('user/add').then((res) => res.data.items));
		yield put({type: actions.CHAT_STATUS_SUCCESS, payload: {status: action.payload.status}});
	} catch (error) {
		yield put({type: actions.CHAT_STATUS_FAILED, payload: {messages: error.message}});
	}
}
//STUB FETCH Watcher
export function* chatWatcher() {
	yield takeEvery(actions.CHAT_STATUS, chatWorker);
}
//TODO FETCH Worker
function* fetchRoomWorker(action) {
	try {
		// const users = yield call(() => axios.get('user/add').then((res) => res.data.items));
		yield put({type: actions.FETCH_ROOM_SUCCESS, payload: {rooms: action.payload}});
	} catch (error) {
		yield put({type: actions.FETCH_ROOM_FAILED, payload: {messages: error.message}});
	}
}
//STUB FETCH Watcher
export function* fetchRoomWatcher() {
	yield takeEvery(actions.FETCH_ROOM, fetchRoomWorker);
}

//TODO FETCH Worker
function* authenticateWorker(action) {
	try {
		const UID = yield call(() => action.payload.user.uid);
		localStorage.setItem('UID', JSON.stringify(UID));
		yield put({type: actions.AUTHENTICATION_SUCCESS, payload: {data: {...action.payload}}});
	} catch (error) {
		yield put({type: actions.AUTHENTICATION_FAILED, payload: {messages: error.message}});
	}
}
//STUB FETCH Watcher
export function* authenticateWatcher() {
	yield takeEvery(actions.AUTHENTICATION, authenticateWorker);
}
