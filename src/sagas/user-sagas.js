import {takeEvery, select} from 'redux-saga/effects';
import {fetchUserAction, USER} from '../actions/user-actions';
import {fetchContactAction} from '../actions/contact-actions';
import {fetchRecordAction} from '../actions/record-actions';
import {fetchEntity} from './';
import {getUser} from '../reducers/selectors';

function* fetchUser () {
    yield fetchEntity(fetchUserAction, '/api/users/me', d => d.user[0]);
    const user = yield select(getUser);
    yield fetchEntity(fetchContactAction, `/api/contacts/${user.get('contactId')}`, d => d.contact);
    yield fetchEntity(fetchRecordAction, `/api/records/${user.get('recordId')}`, d => d.record);
}

export function* fetchUserWatcher () {
    yield takeEvery(USER.REQUEST, fetchUser);
}
