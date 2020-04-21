import { OrderedMap } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { USER } from '../actions/user-actions';
import { RESTAURANT, RESTAURANTS } from '../actions/restaurant-actions';
import { POST, POSTS } from '../actions/post-actions';
import { User, Restaurant, restaurantDef, Post } from '../models';
import { arrayToMapById, transformNestedRecordObject } from '../services';
import { NEW_ID } from '../../../shared/constants';

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
        case RESTAURANTS.BY_SUBURB_SUCCESS:
            return arrayToMapById(action.entities, Restaurant, OrderedMap, restaurantDef);
        case RESTAURANTS.FAILURE:
            return state;
        case RESTAURANT.SUCCESS:
        case RESTAURANT.SAVE_SUCCESS:
            return state.merge(transformNestedRecordObject(action.restaurant, Restaurant, restaurantDef));
        case RESTAURANT.CHANGE:
            return state.setIn([action.id, ...action.field.split('.')], action.value);
        case RESTAURANT.CREATE:
            return state.set(NEW_ID, new Restaurant({ id: NEW_ID }));
        case RESTAURANT.PREFILL_SUCCESS:
            return state.mergeIn([action.id, 'address'], action.address);
        default:
            return state;
    }
}
function restaurantPhotos(state = { id: null, files: [] }, action) {
    switch (action.type) {
        case RESTAURANT.FILE_CHANGE:
            return { id: action.id, files: action.files };
        case LOCATION_CHANGE:
            return { files: [] };
        default:
            return state;
    }
}


function posts(state = new OrderedMap(), action) {
    switch (action.type) {
        case POSTS.SUCCESS:
            return arrayToMapById(action.entities, Post, OrderedMap);
        case POSTS.FAILURE:
            return state;
        case POST.SUCCESS:
        case POST.SAVE_SUCCESS:
            return state.merge(transformNestedRecordObject(action.entity, Post));
        case POST.CHANGE:
            return state.setIn([action.id, ...action.field.split('.')], action.value);
        case POST.CREATE:
            return state.set(NEW_ID, new Post({ id: NEW_ID }));
        default:
            return state;
    }
}

export default {
    user,
    restaurants,
    restaurantPhotos,
    posts
};