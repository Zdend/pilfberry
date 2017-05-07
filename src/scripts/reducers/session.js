import { combineReducers } from 'redux-immutable';
import { LOGIN } from '../actions/login-actions';
import { Map } from 'immutable';



function user(state = new Map({ message: '', type: 'info' }), action) {
    switch (action.type) {
        case LOGIN.SUCCESS:
            return state.merge(action.message);
        default:
            return state;
    }
}



export default {
    user
};