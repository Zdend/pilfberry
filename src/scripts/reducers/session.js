import { Map } from 'immutable';
import { LOGIN } from '../actions/login-actions';

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