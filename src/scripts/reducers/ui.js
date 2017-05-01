import {combineReducers} from 'redux-immutable';
import {LOGIN} from '../actions/login-actions';
import {LANGUAGE} from '../actions/language-actions';
import {USER} from '../actions/user-actions';
import {Language} from '../models';
import {Credentials} from '../models';
import {Map} from 'immutable';


function credentials (state = new Credentials(), action) {
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
function user (state = new Map(), action) {
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

function language (state = new Language(), action) {
    switch (action.type) {
        case LANGUAGE.CHANGE:
            return state.set('code', action.code);
        case LANGUAGE.LOADED:
            return state;
        default:
            return state;
    }
}


export default {
    pages: combineReducers({
        login: combineReducers({credentials}),
        user
    }),
    components: combineReducers({
        footer: combineReducers({language})
    })
};