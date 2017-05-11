import { takeEvery, takeLatest, select } from 'redux-saga/effects';
import { fetchRestaurantsAction, fetchRestaurantAction, saveRestaurantAction, RESTAURANT, RESTAURANTS } from '../actions/restaurant-actions';
import { fetchEntity, sendEntity } from './';
import { getRestaurant } from '../reducers/selectors';
import { put } from 'axios';

function* fetchRestaurants() {
    yield fetchEntity(fetchRestaurantsAction, '/api/restaurants',
        restaurants => restaurants.map(r => ({ ...r, id: r['_id'] })));
}
function* fetchRestaurant({ id }) {
    yield fetchEntity(fetchRestaurantAction, `/api/restaurant/${id}`, r => ({ ...r, id: r['_id'] }));
}
function* saveRestaurant({ id }) {
    const restaurant = yield select(getRestaurant(id));
    yield sendEntity(saveRestaurantAction, `/api/restaurant/${id}`, restaurant.toJS(), r => r, put);
}

export function* saveRestaurantWatcher() {
    yield takeLatest(RESTAURANT.SAVE_REQUEST, saveRestaurant);
}

export function* fetchRestaurantsWatcher() {
    yield takeEvery(RESTAURANTS.REQUEST, fetchRestaurants);
}

export function* fetchRestaurantWatcher() {
    yield takeEvery(RESTAURANT.REQUEST, fetchRestaurant);
}
