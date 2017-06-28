import { fork, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { get, post, put as putAxios, delete as deleteAxios } from 'axios';
import { requestLoginWatcher } from './login-sagas';
import { fetchUserWatcher } from './user-sagas';
import { fetchRestaurants, fetchRestaurant, saveRestaurant, deleteRestaurant, prefillAddress, deletePhoto, fetchRestaurantsBySuburb } from './restaurant-sagas';
import { RESTAURANT, RESTAURANTS } from '../actions/restaurant-actions';
import { COORDINATES, updateLocationAction } from '../actions/ui-actions';

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

function getCurrentLocation() {
    return new Promise(function (resolve, reject) {
        if (!window.navigator.geolocation) {
            return reject('Geolocation is not enabled');
        }
        window.navigator.geolocation.getCurrentPosition(function (position) {
            resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    });
}

export function* checkCurrentLocation() {
    try {
        const position = yield call(getCurrentLocation);
        yield put(updateLocationAction(position));
    } catch (e) {
        // Not enabled
    }
}

export default function* root() {
    yield [
        fork(requestLoginWatcher),
        fork(fetchUserWatcher),
        takeEvery(RESTAURANTS.REQUEST, fetchRestaurants),
        takeEvery(RESTAURANTS.BY_SUBURB_REQUEST, fetchRestaurantsBySuburb),
        takeEvery(RESTAURANT.REQUEST, fetchRestaurant),
        takeEvery(RESTAURANT.PREFILL_REQUEST, prefillAddress),
        takeLatest(RESTAURANT.SAVE_REQUEST, saveRestaurant),
        takeLatest(RESTAURANT.DELETE, deleteRestaurant),
        takeLatest(RESTAURANT.DELETE_PHOTO, deletePhoto),
        takeLatest(COORDINATES.REQUEST, checkCurrentLocation)
    ];
}