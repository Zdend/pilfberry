import { select, put } from 'redux-saga/effects';
import { fetchRestaurantsAction, fetchRestaurantAction, saveRestaurantAction } from '../actions/restaurant-actions';
import { fetchEntity, updateEntity, deleteEntity } from './';
import { getRestaurant } from '../reducers/selectors';
import { push } from 'react-router-redux';
import { setMessageAction } from '../actions/global-message-actions';

export function* fetchRestaurants({ criteria }) {
    yield fetchEntity(fetchRestaurantsAction, '/api/restaurants', d => d, criteria);
}
export function* fetchRestaurant({ id }) {
    yield fetchEntity(fetchRestaurantAction, `/api/restaurant/${id}`);
}
export function* saveRestaurant({ id }) {
    const restaurant = yield select(getRestaurant(id));
    yield updateEntity(saveRestaurantAction, `/api/restaurant/${id}`, restaurant.toJS());
    yield put(push('/secure/restaurants'));
    yield put(setMessageAction({ message: 'Restaurant was saved', type: 'success' }));
}

export function* deleteRestaurant({ id }) {
    yield deleteEntity(saveRestaurantAction, `/api/restaurant/${id}`);
}