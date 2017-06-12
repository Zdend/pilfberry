import { createSelector as s } from 'reselect';
import { NEW_ID } from '../../../shared/constants';

const isNew = entity => entity.get('id') === NEW_ID;

export const getUI = state => state.get('ui');
export const getPages = s(getUI, ui => ui.get('pages'));
export const getComponents = s(getUI, ui => ui.get('components'));
export const getCurrentLocation = s(getUI, ui => ui.get('currentLocation'));

export const getGlobalMessage = s(getComponents, components => components.get('globalMessage'));
export const getFooter = s(getComponents, components => components.get('footer'));
export const getLogin = s(getPages, pages => pages.get('login'));
export const getLandingPage = s(getPages, pages => pages.get('landingPage'));

export const getUIPageUser = s(getPages, pages => pages.get('user'));
export const getCredentials = s(getLogin, loginPage => loginPage.get('credentials'));
export const getTagToggle = s(getLandingPage, landingPage => landingPage.get('tagToggle'));





export const getDomain = state => state.get('domain');
export const getUser = s(getDomain, domain => domain.get('user'));
export const getRestaurants = s(getDomain, domain => domain.get('restaurants'));
export const getSavedRestaurants = s(getRestaurants, restaurants => restaurants.filterNot(isNew));
export const getRestaurant = id => s(getRestaurants, restaurants => restaurants.get(id));
export const getRestaurantPhotos = id => s(getDomain, domain => domain.get('restaurantPhotos').id === id && domain.get('restaurantPhotos').files);


