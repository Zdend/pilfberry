import { fork, call, put } from 'redux-saga/effects';
import { requestLoginWatcher } from './login-sagas';
import { fetchUserWatcher } from './user-sagas';
import { changeLanguageWatcher } from './language-sagas';
import { fetchRestaurantsWatcher } from './restaurant-sagas';
import { get, post } from 'axios';

export function* fetchEntity({ success, failure }, path, resultTransformer = data => data) {
    const response = yield call(get, path);
    try {
        if (response) {
            yield put(success(resultTransformer(response.data)));
        } else {
            yield put(failure(response));
        }
    } catch (e) {
        yield put(failure(response));
    }

}

export function* postEntity({ success, failure }, path, payload, resultTransformer = data => data) {
    const response = yield call(post, path, payload);
    try {
        if (response) {
            yield put(success(resultTransformer(response.data)));
        } else {
            yield put(failure(response));
        }
    } catch (e) {
        yield put(failure(response));
    }

}

export default function* root() {
    yield [
        fork(requestLoginWatcher),
        fork(fetchRestaurantsWatcher),
        fork(fetchUserWatcher),
        fork(changeLanguageWatcher)
    ];
}