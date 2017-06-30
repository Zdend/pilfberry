import { combineReducers } from 'redux-immutable';
import { LOGIN } from '../actions/login-actions';
import { USER } from '../actions/user-actions';
import { RESTAURANT } from '../actions/restaurant-actions';
import { LANDING_PAGE, COORDINATES } from '../actions/ui-actions';
import { GLOBAL_MESSAGE } from '../actions/global-message-actions';
import { Credentials } from '../models';
import { Map, Set } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

function credentials(state = new Credentials(), action) {
    switch (action.type) {
        case LOGIN.CHANGE:
            return state.merge(action.newState);
        case LOGIN.REQUEST:
            return state.set('isPending', true);
        case LOGIN.SUCCESS:
            return state.merge({ password: '', isPending: false, isLogged: true });
        case LOGIN.FAILURE:
            return state.merge({ password: '', isPending: false, isLogged: false });
        default:
            return state;
    }
}
function user(state = new Map(), action) {
    switch (action.type) {
        case USER.REQUEST:
            return state.set('userIsPending', true);
        case USER.SUCCESS:
        case USER.FAILURE:
            return state.set('userIsPending', false);
        default:
            return state;
    }
}

function globalMessage(state = new Map({ message: '', type: 'info' }), action) {
    switch (action.type) {
        case GLOBAL_MESSAGE.SET:
            return state.merge(action.message);
        case LOCATION_CHANGE:
            return new Map({ message: '' });
        default:
            return state;
    }
}

function currentLocation(state = new Map({ lat: null, lng: null }), action) {
    switch (action.type) {
        case COORDINATES.UPDATE:
            return state.merge(action.coordinates);
        default:
            return state;
    }
}

function landingPage(state = new Map({ searchExpressions: new Set(), closestFirst: false }), action) {
    switch (action.type) {
        case LANDING_PAGE.CLOSEST_FIRST:
            return state.update('closestFirst', closestFirst => !closestFirst);
        case LANDING_PAGE.CHANGE_FILTER:
            return state.set('searchExpressions', new Set(action.searchExpressions));
        default:
            return state;
    }
}

function restaurantEditPage(state = new Map(), action) {
    switch (action.type) {
        case RESTAURANT.SAVE_REQUEST:
            return state.set('saving', true);
        case RESTAURANT.SAVE_SUCCESS:
        case RESTAURANT.SAVE_FAILURE:
            return state.set('saving', false);
        default:
            return state;
    }
}


export default {
    pages: combineReducers({
        login: combineReducers({ credentials }),
        user,
        landingPage,
        restaurantEditPage
    }),
    components: combineReducers({
        globalMessage
    }),
    currentLocation
};