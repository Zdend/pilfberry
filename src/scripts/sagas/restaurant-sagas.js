import { takeEvery } from 'redux-saga/effects';
import { fetchRestaurantsAction, fetchRestaurantAction, RESTAURANT, RESTAURANTS } from '../actions/restaurant-actions';
import { fetchEntity } from './';

function* fetchRestaurants() {
    yield fetchEntity(fetchRestaurantsAction, '/api/restaurants',
        restaurants => restaurants.map(r => ({ ...r, id: r['_id'] })));
}
function* fetchRestaurant({ id }) {
    yield fetchEntity(fetchRestaurantAction, `/api/restaurant/${id}`, r => ({ ...r, id: r['_id'] }));
}

export function* fetchRestaurantsWatcher() {
    yield takeEvery(RESTAURANTS.REQUEST, fetchRestaurants);
}

export function* fetchRestaurantWatcher() {
    yield takeEvery(RESTAURANT.REQUEST, fetchRestaurant);
}
