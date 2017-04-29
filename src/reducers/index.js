import {combineReducers} from 'redux-immutable';
import ui from './ui';
import domain from './domain';

export default {
    ui: combineReducers(ui),
    domain: combineReducers(domain)
};