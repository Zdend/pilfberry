import { OrderedMap } from 'immutable';
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
            return state.merge({ [action.restaurant.id]: action.restaurant });
        default:
            return state;
    }
}

export default {
    user,
    restaurants
};