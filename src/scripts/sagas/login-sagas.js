import {takeEvery, put, call, select} from 'redux-saga/effects';
import * as LoginActions from '../actions/login-actions';
import {getCredentials} from '../reducers/selectors';
import {post} from 'axios';
import {push} from 'react-router-redux';


function* postLogin () {
    const credentials = yield select(getCredentials);
    const params = new URLSearchParams();
    params.append('username', credentials.get('login'));
    params.append('password', credentials.get('password'));
    try {
        const response = yield call(post, '/login', params);
        if (response) {
            yield put(LoginActions.loginAction.success(response));
            yield put(push('/secure'));
        } else {
            yield put(LoginActions.loginAction.failure('Login failed'));
        }
    } catch (e) {
        yield put(LoginActions.loginAction.failure('Something went wrong: ' + e));
    }
}


export function* requestLoginWatcher () {
    yield takeEvery(LoginActions.LOGIN.REQUEST, postLogin);
}
