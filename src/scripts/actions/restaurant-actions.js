import { createRequestTypes, action } from './';

export const RESTAURANT = {
    ...createRequestTypes('RESTAURANT')
};

export const RESTAURANTS = {
    ...createRequestTypes('RESTAURANTS')
};

export const fetchRestaurantAction = {
    request: id => action(RESTAURANT.REQUEST, { id }),
    success: restaurant => action(RESTAURANT.SUCCESS, { restaurant }),
    failure: error => action(RESTAURANT.FAILURE, { error }),
};

export const fetchRestaurantsAction = {
    request: () => action(RESTAURANTS.REQUEST, {}),
    success: restaurants => action(RESTAURANTS.SUCCESS, { restaurants }),
    failure: error => action(RESTAURANTS.FAILURE, { error }),
};