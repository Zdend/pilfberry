import { createRequestTypes, action } from './';

export const RESTAURANT = {
    ...createRequestTypes('RESTAURANT'),
    CHANGE: 'RESTAURANT_CHANGE',
    SAVE_REQUEST: 'RESTAURANT_SAVE_REQUEST',
    SAVE_SUCCESS: 'RESTAURANT_SAVE_SUCCESS',
    SAVE_FAILURE: 'RESTAURANT_SAVE_FAILURE',
    CREATE: 'RESTAURANT_CREATE',
    DELETE: 'RESTAURANT_DELETE'
};

export const RESTAURANTS = {
    ...createRequestTypes('RESTAURANTS')
};

export const restaurantValueChangeAction = (id, field, value) => action(RESTAURANT.CHANGE, { id, field, value });

export const createRestaurantAction = () => action(RESTAURANT.CREATE);
export const deleteRestaurantAction = id => action(RESTAURANT.DELETE, { id });

export const saveRestaurantAction = {
    request: id => action(RESTAURANT.SAVE_REQUEST, { id }),
    success: restaurant => action(RESTAURANT.SAVE_SUCCESS, {
        restaurant, message: { message: 'Restaurant was saved', type: 'success' }
    }),
    failure: error => action(RESTAURANT.SAVE_FAILURE, { error }),
};

export const fetchRestaurantAction = {
    request: id => action(RESTAURANT.REQUEST, { id }),
    success: restaurant => action(RESTAURANT.SUCCESS, { restaurant }),
    failure: error => action(RESTAURANT.FAILURE, { error }),
};

export const fetchRestaurantsAction = {
    request: (criteria) => action(RESTAURANTS.REQUEST, { criteria }),
    success: restaurants => action(RESTAURANTS.SUCCESS, { restaurants }),
    failure: error => action(RESTAURANTS.FAILURE, { error }),
};