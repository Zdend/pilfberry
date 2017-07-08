import { takeEvery, put, call, select } from 'redux-saga/effects';
import { post } from 'axios';
import { push } from 'react-router-redux';
import * as LoginActions from '../actions/login-actions';
import { setMessageAction } from '../actions/global-message-actions';
import { getCredentials } from '../reducers/selectors';


function* postLogin() {
    const credentials = yield select(getCredentials);

    try {
        const response = yield call(post, '/api/login', {
            username: credentials.get('login'),
            password: credentials.get('password')
        });
        if (response) {
            yield put(LoginActions.loginAction.success(response.data));
            yield put(push('/secure'));
        } else {
            yield put(LoginActions.loginAction.failure());
            yield put(setMessageAction({ message: 'Login failed', type: 'danger' }));
        }
    } catch (e) {
        yield put(LoginActions.loginAction.failure());
        yield put(setMessageAction({ message: `Login failed`, type: 'danger' }));
    }
}


export function* requestLoginWatcher() {
    yield takeEvery(LoginActions.LOGIN.REQUEST, postLogin);
}
