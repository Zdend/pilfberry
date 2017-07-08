import { createRequestTypes, action, fetchEntitiesAction, failureAction } from './';

export const RESTAURANT = {
    ...createRequestTypes('RESTAURANT'),
    CHANGE: 'RESTAURANT_CHANGE',
    ...createRequestTypes('RESTAURANT', 'SAVE'),
    ...createRequestTypes('RESTAURANT', 'DELETE'),
    CREATE: 'RESTAURANT_CREATE',
    ...createRequestTypes('RESTAURANT', 'PREFILL'),
    FILE_CHANGE: 'RESTAURANT_FILE_CHANGE',
    DELETE_PHOTO: 'RESTAURANT_DELETE_PHOTO'
};

export const RESTAURANTS = {
    ...createRequestTypes('RESTAURANTS'),
    ...createRequestTypes('RESTAURANTS', 'BY_SUBURB')
};

export const restaurantValueChangeAction = (id, field, value) => action(RESTAURANT.CHANGE, { id, field, value });

export const createRestaurantAction = () => action(RESTAURANT.CREATE);
export const deleteRestaurantAction = id => action(RESTAURANT.DELETE, { id });

export const deletePhotoAction = restaurantId => photoId => action(RESTAURANT.DELETE_PHOTO, { restaurantId, photoId });

export const fileChangeAction = id => files => action(RESTAURANT.FILE_CHANGE, { id, files });

export const saveRestaurantAction = {
    request: id => action(RESTAURANT.SAVE_REQUEST, { id }),
    success: restaurant => action(RESTAURANT.SAVE_SUCCESS, { restaurant }),
    failure: failureAction(RESTAURANT.SAVE_FAILURE),
};

export const fetchRestaurantAction = {
    request: ({ id, path }) => action(RESTAURANT.REQUEST, { id, path }),
    success: restaurant => action(RESTAURANT.SUCCESS, { restaurant }),
    failure: failureAction(RESTAURANT.FAILURE),
};

export const prefillAddressAction = {
    request: id => action(RESTAURANT.PREFILL_REQUEST, { id }),
    success: (id, address) => action(RESTAURANT.PREFILL_SUCCESS, { id, address }),
    failure: failureAction(RESTAURANT.PREFILL_FAILURE),
};

export const fetchRestaurantsAction = fetchEntitiesAction(
    RESTAURANTS.REQUEST, RESTAURANTS.SUCCESS, RESTAURANTS.FAILURE);
    
export const fetchRestaurantsBySuburbAction = fetchEntitiesAction(
    RESTAURANTS.BY_SUBURB_REQUEST, RESTAURANTS.BY_SUBURB_SUCCESS, RESTAURANTS.BY_SUBURB_FAILURE);