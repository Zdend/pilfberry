import { OrderedMap, Map, fromJS } from 'immutable';
import { USER } from '../actions/user-actions';
import { RESTAURANT, RESTAURANTS } from '../actions/restaurant-actions';
import { User, Restaurant } from '../models';
import { arrayToMapById } from '../services';


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
            return arrayToMapById(action.restaurants, Restaurant, OrderedMap);
        case RESTAURANTS.FAILURE:
            return state;
        case RESTAURANT.SUCCESS:
            const restaurant = new Restaurant({ ...action.restaurant, address: new Map(action.restaurant.address) });
            return state.merge({ [action.restaurant.id]: restaurant });
        case RESTAURANT.CHANGE:
            return state.setIn([action.id, ...action.field.split('.')], action.value);
        default:
            return state;
    }
}

export default {
    user,
    restaurants
};