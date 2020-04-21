import { action } from './';

export const GLOBAL_MESSAGE = {
    SET: 'GLOBAL_MESSAGE_SET'
};

export const setMessageAction = message => action(GLOBAL_MESSAGE.SET, { message });