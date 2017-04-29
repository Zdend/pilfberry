import i18next from 'i18next';
import Czech from './cs';
import English from './en';


export const SUPPORTED_LOCALES = [
    { codes: ['en'], label: 'English', translation: English },
    { codes: ['cs_CZ', 'cs', 'cz'], label: 'Čeština', translation: Czech }
];

const resources = SUPPORTED_LOCALES.reduce((res, locale) => {
    const translation = { translation: locale.translation };
    const aliases = locale.codes.reduce((result, code) => ({...result, [code]: translation}), {});
    return {...res, ...aliases};
}, {});

export default (defaultLanguage, doneCallback) => {
    i18next
        .init({
            lng: defaultLanguage,
            resources
        }, doneCallback);
};
