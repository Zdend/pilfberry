import {createRequestTypes, action} from './';

export const RESTAURANT = {
    ...createRequestTypes('RESTAURANT')
};

export const fetchRestaurantsAction = {
    request: () => action(RESTAURANT.REQUEST, {}),
    success: restaurants => action(RESTAURANT.SUCCESS, {restaurants}),
    failure: error => action(RESTAURANT.FAILURE, {error}),
};