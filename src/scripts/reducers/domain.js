import {OBJECTIVES} from '../actions/objective-actions';
import {USER} from '../actions/user-actions';
import {CONTACT} from '../actions/contact-actions';
import {RECORD} from '../actions/record-actions';
import {OrderedMap} from 'immutable';
import {User, Objective, Contact, Record} from '../models';
import {arrayToMapById} from '../services';
import {NEW_ID} from '../constants';


function user (state = new User(), action) {
    switch (action.type) {
        case USER.SUCCESS:
            return new User(action.user);
        default:
            return state;
    }
}

function objectives (state = new OrderedMap(), action) {
    switch (action.type) {
        case OBJECTIVES.TOGGLE_CREATE:
            return state.has(NEW_ID) ? state : state.set(NEW_ID, new Objective());
        case OBJECTIVES.SUCCESS:
            return arrayToMapById(action.objectives, Objective, OrderedMap);
        case OBJECTIVES.INPUT_CHANGE:
            return state.mergeIn([NEW_ID], action.newState);
        default:
            return state;
    }
}

function contacts (state = new OrderedMap(), action) {
    switch (action.type) {
        case CONTACT.SUCCESS:
            return arrayToMapById(action.contacts, Contact, OrderedMap);
        case CONTACT.FAILURE:
            return state;
        default:
            return state;
    }
}

function records (state = new OrderedMap(), action) {
    switch (action.type) {
        case RECORD.SUCCESS:
            return arrayToMapById(action.records, Record, OrderedMap);
        case RECORD.FAILURE:
            return state;
        default:
            return state;
    }
}

export default {
    records,
    contacts,
    user,
    objectives
};