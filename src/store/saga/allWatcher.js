import {all} from 'redux-saga/effects';
import {fetchUserWatcher, chatWatcher, fetchRoomWatcher, authenticateWatcher} from './userSaga';
export default function* middlewares() {
	yield all([fetchUserWatcher(), chatWatcher(), fetchRoomWatcher(), authenticateWatcher()]);
}
