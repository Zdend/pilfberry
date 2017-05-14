import { OrderedMap, Map, fromJS } from 'immutable';
import { USER } from '../actions/user-actions';
import { RESTAURANT, RESTAURANTS } from '../actions/restaurant-actions';
import { User, Restaurant, Address } from '../models';
import { arrayToMapById, transformNestedRecords, transformNestedRecordObject } from '../services';
import { NEW_ID } from 'constants';

function user(state = new User(), action) {
    switch (action.type) {
        case USER.SUCCESS:
            return new User(action.user);
        default:
            return state;
    }
}


function restaurants(state = new OrderedMap(), action) {
    switch (action.type) {
        case RESTAURANTS.SUCCESS:
            return arrayToMapById(action.restaurants, Restaurant, OrderedMap, { address: Address });
        case RESTAURANTS.FAILURE:
            return state;
        case RESTAURANT.SUCCESS:
        case RESTAURANT.SAVE_SUCCESS:
            return state.merge(transformNestedRecordObject(action.restaurant, Restaurant, { address: Address }));
        case RESTAURANT.CHANGE:
            return state.setIn([action.id, ...action.field.split('.')], action.value);
        case RESTAURANT.CREATE:
            return state.set(NEW_ID, new Restaurant({ id: NEW_ID }));
        default:
            return state;
    }
}

export default {
    user,
    restaurants
};