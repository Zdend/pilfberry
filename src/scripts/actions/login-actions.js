import {createRequestTypes, action} from './';

const loginTypes = createRequestTypes('LOGIN');
export const LOGIN = {
    ...loginTypes,
    CHANGE: 'LOGIN_CHANGE'
};

export const loginAction = {
    request: () => action(LOGIN.REQUEST),
    success: (login, response) => action(LOGIN.SUCCESS, {response}),
    failure: (error) => action(LOGIN.FAILURE, {error}),
};

export const credentialsChange = (key, e) => action(LOGIN.CHANGE, { newState: { [key]: e.target.value }});