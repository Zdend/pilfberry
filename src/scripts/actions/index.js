const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createRequestTypes(base, prefix) {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        const nullSafePrefix = prefix ? prefix + '_' : '';
        acc[`${nullSafePrefix}${type}`] = `${base}_${nullSafePrefix}${type}`;
        return acc;
    }, {});
}

export function action(type, payload = {}) {
    return { type, ...payload };
}

export const fetchEntitiesAction = (request, success, failure) => ({
    request: criteria => action(request, { criteria }),
    success: entities => action(success, { entities }),
    failure: error => action(failure, { error }),
});

export const failureAction = failureType => error => action(failureType, { error });