import { takeEvery } from 'redux-saga/effects';
import { fetchUserAction, USER } from '../actions/user-actions';
import { fetchEntity } from './';

function* fetchUser() {
    yield fetchEntity(fetchUserAction, '/api/users/me', d => d.user[0]);
}

export function* fetchUserWatcher() {
    yield takeEvery(USER.REQUEST, fetchUser);
}
