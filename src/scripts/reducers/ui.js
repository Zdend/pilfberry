import { combineReducers } from 'redux-immutable';
import { LOGIN } from '../actions/login-actions';
import { LANGUAGE } from '../actions/language-actions';
import { USER } from '../actions/user-actions';
import { RESTAURANT } from '../actions/restaurant-actions';
import { LANDING_PAGE } from '../actions/ui-actions';
import { GLOBAL_MESSAGE } from '../actions/global-message-actions';
import { Language } from '../models';
import { Credentials } from '../models';
import { Map } from 'immutable';


function credentials(state = new Credentials(), action) {
    switch (action.type) {
        case LOGIN.CHANGE:
            return state.merge(action.newState);
        case LOGIN.REQUEST:
            return state.set('isPending', true);
        case LOGIN.SUCCESS:
        case LOGIN.FAILURE:
            return state.set('password', '');
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

function language(state = new Language(), action) {
    switch (action.type) {
        case LANGUAGE.CHANGE:
            return state.set('code', action.code);
        case LANGUAGE.LOADED:
            return state;
        default:
            return state;
    }
}

function landingPage(state = new Map({ displayMap: false }), action) {
    switch (action.type) {
        case LANDING_PAGE.CHANGE_FILTER:
            return state.set('displayMap', action.filterType === 'map');
        default:
            return state;
    }
}

function globalMessage(state = new Map({ message: '', type: 'info' }), action) {
    switch (action.type) {
        case GLOBAL_MESSAGE.SET:
        case RESTAURANT.SAVE_SUCCESS:
            return state.merge(action.message);
        default:
            return state;
    }
}



export default {
    pages: combineReducers({
        login: combineReducers({ credentials }),
        user,
        landingPage
    }),
    components: combineReducers({
        footer: combineReducers({ language }),
        globalMessage
    })
};