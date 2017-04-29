import {createRequestTypes, action} from './';

export const CONTACT = {
    ...createRequestTypes('CONTACT')
};

export const fetchContactAction = {
    request: id => action(CONTACT.REQUEST, {id}),
    success: contacts => action(CONTACT.SUCCESS, {contacts}),
    failure: error => action(CONTACT.FAILURE, {error}),
};
