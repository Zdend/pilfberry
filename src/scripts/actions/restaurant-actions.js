import { createRequestTypes, action } from './';

export const RESTAURANT = {
    ...createRequestTypes('RESTAURANT'),
    CHANGE: 'RESTAURANT_CHANGE',
    SAVE_REQUEST: 'RESTAURANT_SAVE_REQUEST',
    SAVE_SUCCESS: 'RESTAURANT_SAVE_SUCCESS',
    SAVE_FAILURE: 'RESTAURANT_SAVE_FAILURE',
    CREATE: 'RESTAURANT_CREATE',
    DELETE: 'RESTAURANT_DELETE',
    PREFILL_REQUEST: 'RESTAURANT_PREFILL_REQUEST',
    PREFILL_SUCCESS: 'RESTAURANT_PREFILL_SUCCESS',
    PREFILL_FAILURE: 'RESTAURANT_PREFILL_FAILURE',
    FILE_CHANGE: 'RESTAURANT_FILE_CHANGE'
};

export const RESTAURANTS = {
    ...createRequestTypes('RESTAURANTS')
};

export const restaurantValueChangeAction = (id, field, value) => action(RESTAURANT.CHANGE, { id, field, value });

export const createRestaurantAction = () => action(RESTAURANT.CREATE);
export const deleteRestaurantAction = id => action(RESTAURANT.DELETE, { id });

export const fileChangeAction = id => files => action(RESTAURANT.FILE_CHANGE, { id, files });

export const saveRestaurantAction = {
    request: id => action(RESTAURANT.SAVE_REQUEST, { id }),
    success: restaurant => action(RESTAURANT.SAVE_SUCCESS, { restaurant }),
    failure: error => action(RESTAURANT.SAVE_FAILURE, { error }),
};

export const fetchRestaurantAction = {
    request: id => action(RESTAURANT.REQUEST, { id }),
    success: restaurant => action(RESTAURANT.SUCCESS, { restaurant }),
    failure: error => action(RESTAURANT.FAILURE, { error }),
};

export const prefillAddressAction = {
    request: id => action(RESTAURANT.PREFILL_REQUEST, { id }),
    success: (id, address) => action(RESTAURANT.PREFILL_SUCCESS, { id, address }),
    failure: error => action(RESTAURANT.PREFILL_FAILURE, { error }),
};

export const fetchRestaurantsAction = {
    request: (criteria) => action(RESTAURANTS.REQUEST, { criteria }),
    success: restaurants => action(RESTAURANTS.SUCCESS, { restaurants }),
    failure: error => action(RESTAURANTS.FAILURE, { error }),
};

