import { createRequestTypes, action } from './';

export const RESTAURANT = {
    ...createRequestTypes('RESTAURANT'),
    CHANGE: 'RESTAURANT_CHANGE'
};

export const RESTAURANTS = {
    ...createRequestTypes('RESTAURANTS')
};

export const restaurantValueChangeAction = (id, field, value) => action(RESTAURANT.CHANGE, { id, field, value });

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