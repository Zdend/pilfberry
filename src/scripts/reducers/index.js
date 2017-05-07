import {combineReducers} from 'redux-immutable';
import ui from './ui';
import domain from './domain';
import session from './session';

export default {
    ui: combineReducers(ui),
    domain: combineReducers(domain),
    session: combineReducers(session)
};