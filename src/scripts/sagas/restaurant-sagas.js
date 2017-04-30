import {takeEvery} from 'redux-saga/effects';
import {fetchRestaurantsAction, RESTAURANT} from '../actions/restaurant-actions';
import {fetchEntity} from './';

function* fetchRestaurants () {
    yield fetchEntity(fetchRestaurantsAction, '/api/restaurants',
        restaurants => restaurants.map(r => ({...r, id: r['_id']})));
}


export function* fetchRestaurantsWatcher () {
    yield takeEvery(RESTAURANT.REQUEST, fetchRestaurants);
}
