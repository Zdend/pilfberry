import { createRequestTypes, action } from './';

export const LANDING_PAGE = {
    CHANGE_FILTER: 'LANDING_PAGE_CHANGE_FILTER',
    TAG_CHANGE: 'TAG_CHANGE'
};
export const COORDINATES = {
    REQUEST: 'COORDINATES_REQUEST',
    UPDATE: 'COORDINATES_UPDATE'
};

export const landingPageChangeFilter = filterType => action(LANDING_PAGE.CHANGE_FILTER, { filterType });
export const landingPageTagChange = tag => action(LANDING_PAGE.TAG_CHANGE, { tag });
export const updateLocationAction = ({ lat, lng }) => action(COORDINATES.UPDATE, { coordinates: { lat, lng } });
export const checkCurrentLocationAction = () => action(COORDINATES.REQUEST);