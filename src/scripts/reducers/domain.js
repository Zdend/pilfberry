import { OrderedMap } from 'immutable';
import { USER } from '../actions/user-actions';
import { RESTAURANT } from '../actions/restaurant-actions';
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
        case RESTAURANT.SUCCESS:
            return arrayToMapById(action.restaurants, Restaurant, OrderedMap);
        case RESTAURANT.FAILURE:
            return state;
        default:
            return state;
    }
}

export default {
    user,
    restaurants
};