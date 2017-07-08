import { createRequestTypes, action } from './';

export const USER = createRequestTypes('USER');

export const fetchUserAction = {
    request: (id) => action(USER.REQUEST, { id }),
    success: (user) => action(USER.SUCCESS, { user }),
    failure: (error) => action(USER.FAILURE, { error }),
};