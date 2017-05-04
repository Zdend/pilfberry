import {createRequestTypes, action} from './';

export const LANDING_PAGE = {
    CHANGE_FILTER: 'LANDING_PAGE_CHANGE_FILTER'
};

export const landingPageChangeFilter = filterType => action(LANDING_PAGE.CHANGE_FILTER, {filterType});