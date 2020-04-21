import { createRequestTypes, action } from './';

const loginTypes = createRequestTypes('LOGIN');
export const LOGIN = {
    ...loginTypes,
    CHANGE: 'LOGIN_CHANGE'
};

export const loginAction = {
    request: () => action(LOGIN.REQUEST),
    success: (email, roles) => action(LOGIN.SUCCESS, { email, roles }),
    failure: (error) => action(LOGIN.FAILURE, { error }),
};

export const credentialsChange = (key, e) => action(LOGIN.CHANGE, { newState: { [key]: e.target.value } });