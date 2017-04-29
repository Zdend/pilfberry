import {createSelector as s} from 'reselect';
import {NEW_ID} from '../constants';

export const getUI = state => state.get('ui');
export const getPages = s(getUI, ui => ui.get('pages'));
export const getComponents = s(getUI, ui => ui.get('components'));
export const getFooter = s(getComponents, components => components.get('footer'));
export const getLogin = s(getPages, pages => pages.get('login'));
export const getUIPageUser = s(getPages, pages => pages.get('user'));
export const getCredentials = s(getLogin, loginPage => loginPage.get('credentials'));
export const getLanguage = s(getFooter, footer => footer.get('language'));
export const getActiveLanguage = s(getLanguage, language => language.get('code'));
export const getSupportedLocales = s(getLanguage, language => language.get('supportedLocales'));



export const filterNew = record => record.get('id') === NEW_ID;
export const getDomain = state => state.get('domain');
export const getUser = s(getDomain, domain => domain.get('user'));
export const getContacts = s(getDomain, domain => domain.get('contacts'));
export const getObjectives = s(getDomain, domain => domain.get('objectives'));
export const getRecords = s(getDomain, domain => domain.get('records'));
export const getObjectivesWithoutNew = s(getObjectives, objectives => objectives.filterNot(filterNew));
export const getNewObjective = s(getObjectives, objectives => objectives.find(filterNew));


