import {action} from './';

export const LANGUAGE = {
    CHANGE: 'LANGUAGE_CHANGE',
    LOADED: 'LANGUAGE_LOADED'
};

export const languageChangeAction = (code) => action(LANGUAGE.CHANGE, {code});
export const languageLoadedAction = () => action(LANGUAGE.LOADED);