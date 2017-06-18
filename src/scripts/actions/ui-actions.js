import { createRequestTypes, action } from './';

export const LANDING_PAGE = {
    CHANGE_FILTER: 'LANDING_PAGE_CHANGE_FILTER',
    CLOSEST_FIRST: 'CLOSEST_FIRST'
};
export const COORDINATES = {
    REQUEST: 'COORDINATES_REQUEST',
    UPDATE: 'COORDINATES_UPDATE'
};

export const landingPageChangeFilter = searchExpressions => action(LANDING_PAGE.CHANGE_FILTER, { searchExpressions });
export const toggleClosestFirst = () => action(LANDING_PAGE.CLOSEST_FIRST);
export const updateLocationAction = ({ lat, lng }) => action(COORDINATES.UPDATE, { coordinates: { lat, lng } });
export const checkCurrentLocationAction = () => action(COORDINATES.REQUEST);