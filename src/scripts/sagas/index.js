import { fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { get, post, put as putAxios, delete as deleteAxios } from 'axios';
import { requestLoginWatcher } from './login-sagas';
import { fetchUserWatcher } from './user-sagas';
import { fetchRestaurants, fetchRestaurant, saveRestaurant, deleteRestaurant, prefillAddress, deletePhoto } from './restaurant-sagas';
import { RESTAURANT, RESTAURANTS } from '../actions/restaurant-actions';

export function* fetchEntity({ success, failure }, path, resultTransformer = data => data, payload) {
    const response = yield call(get, path, { params: payload });
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

export function* sendEntity(
    { success, failure },
    path,
    payload,
    resultTransformer = data => data,
    requestType = post) {

    const response = yield call(requestType, path, payload);
    try {
        if (response) {
            const transformedData = resultTransformer(response.data);
            yield put(success(transformedData));
            yield transformedData;
        } else {
            yield put(failure(response));
        }
    } catch (e) {
        yield put(failure(response));
    }
}

export function* updateEntity(action, path, payload, resultTransformer = d => d) {
    yield sendEntity(action, path, payload, resultTransformer, putAxios);
}

export function* deleteEntity(action, path, payload, resultTransformer = d => d) {
    yield sendEntity(action, path, payload, resultTransformer, deleteAxios);
}

export default function* root() {
    yield [
        fork(requestLoginWatcher),
        fork(fetchUserWatcher),
        takeEvery(RESTAURANTS.REQUEST, fetchRestaurants),
        takeEvery(RESTAURANT.REQUEST, fetchRestaurant),
        takeEvery(RESTAURANT.PREFILL_REQUEST, prefillAddress),
        takeLatest(RESTAURANT.SAVE_REQUEST, saveRestaurant),
        takeLatest(RESTAURANT.DELETE, deleteRestaurant),
        takeLatest(RESTAURANT.DELETE_PHOTO, deletePhoto)
    ];
}