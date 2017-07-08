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
export const getClosestFirst = s(getLandingPage, landingPage => landingPage.get('closestFirst'));
export const getSearchExpressions = s(getLandingPage, landingPage => landingPage.get('searchExpressions'));
export const getRestaurantEditPage = s(getPages, pages => pages.get('restaurantEditPage'));
export const getPostEditPage = s(getPages, pages => pages.get('postEditPage'));

export const getDomain = state => state.get('domain');
export const getUser = s(getDomain, domain => domain.get('user'));
export const getRestaurants = s(getDomain, domain => domain.get('restaurants'));
export const getPosts = s(getDomain, domain => domain.get('posts'));

export const getSavedRestaurants = s(getRestaurants, restaurants => restaurants.filterNot(isNew));
export const getRestaurant = id => s(getRestaurants, restaurants => restaurants.get(id));
export const getRestaurantsBySuburb = suburb => s(getRestaurants, restaurants => {
    return restaurants.filter(r => new RegExp(`.*${suburb.replace('-', '.*')}.*`, 'i').test(r.getIn(['address', 'suburb'])));
});
export const getRestaurantByPath = path => s(getRestaurants, restaurants => restaurants.find(r => r.get('path') === path));
export const getRestaurantPhotos = id => s(getDomain, domain => domain.get('restaurantPhotos').id === id && domain.get('restaurantPhotos').files);

export const getSavedPosts = s(getPosts, posts => posts.filterNot(isNew));
export const getPost = id => s(getPosts, posts => posts.get(id));

export const getRoutes = state => state.get('routes');
export const getAreaRoutes = s(getRoutes, routes => routes.get('suburbs'));

