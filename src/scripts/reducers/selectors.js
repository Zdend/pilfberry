import { createSelector as s } from 'reselect';
import { NEW_ID } from 'constants';

const isNew = entity => entity.get('id') === NEW_ID;

export const getUI = state => state.get('ui');
export const getPages = s(getUI, ui => ui.get('pages'));
export const getComponents = s(getUI, ui => ui.get('components'));
export const getGlobalMessage = s(getComponents, components => components.get('globalMessage'));
export const getFooter = s(getComponents, components => components.get('footer'));
export const getLogin = s(getPages, pages => pages.get('login'));
export const getUIPageUser = s(getPages, pages => pages.get('user'));
export const getLandingPageUI = s(getPages, pages => pages.get('landingPage'));
export const getCredentials = s(getLogin, loginPage => loginPage.get('credentials'));
export const getLanguage = s(getFooter, footer => footer.get('language'));
export const getActiveLanguage = s(getLanguage, language => language.get('code'));
export const getSupportedLocales = s(getLanguage, language => language.get('supportedLocales'));


export const getDomain = state => state.get('domain');
export const getUser = s(getDomain, domain => domain.get('user'));
export const getRestaurants = s(getDomain, domain => domain.get('restaurants'));
export const getSavedRestaurants = s(getRestaurants, restaurants => restaurants.filterNot(isNew));
export const getRestaurant = id => s(getRestaurants, restaurants => restaurants.get(id));


