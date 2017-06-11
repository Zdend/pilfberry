export const DATE_FORMAT = 'DD/MM/YYYY';
export const NEW_ID = 'new';

export const DEFAULT_AVATAR_URL = '/static/images/restaurant-type/japanese.jpg';

export const STATUS_ACTIVE = 'ACTIVE';
export const STATUS_DELETED = 'DELETED';
export const STATUSES = [STATUS_ACTIVE, STATUS_DELETED];

export const TAG = {
    VEGETARIAN: 'VEGETARIAN',
    VEGAN: 'VEGAN',
    GLUTEN_FREE: 'GLUTEN FREE',
    RAW_VEGAN: 'RAW VEGAN',
    DAIRY_FREE: 'DAIRY FREE',
    PREGNANT_FRIENDLY: 'PREGNANT FRIENDLY',
    NUT_FREE: 'NUT FREE',
    FAMILY: 'FAMILY',
    TAKEAWAY: 'TAKEAWAY',
    PESCATARIAN: 'PESCATARIAN',
    PALEO: 'PALEO',
    FOOD_COURT: 'FOOD COURT',
    BAR: 'BAR'
};


export const TAGS = Object.keys(TAG).map(prop => TAG[prop]);

export const CUISINE = {
    JAPANESE: 'JAPANESE',
    INDIAN: 'INDIAN',
    THAI: 'THAI',
    CHINESE: 'CHINESE',
    KOREA: 'KOREA',
    MALAYSIAN: 'MALAYSIAN',
    EASTERN_EUROPEAN: 'EASTERN EUROPEAN',
    AUSTRALIAN: 'AUSTRALIAN',
    FRENCH: 'FRENCH',
    ITALIAN: 'ITALIAN',
    SPANISH: 'SPANISH',
    NEPALESE: 'NEPALESE',
    RUSSIAN: 'RUSSIAN',
    VIETNAMESE: 'VIETNAMESE',
    TAIWANESE: 'TAIWANESE',
    BURGERS: 'BURGERS',
    FUSION: 'FUSION',
    CAFE: 'CAFE',
    GROCER: 'GROCER',
    DESSERT: 'DESSERT'
};
export const CUISINES = Object.keys(CUISINE).map(prop => CUISINE[prop]);

export const PHOTO_TYPE = {
    AVATAR: 'AVATAR',
    COVER: 'COVER',
    GALLERY: 'GALLERY'
};
export const PHOTO_TYPES = Object.keys(PHOTO_TYPE).map(prop => PHOTO_TYPE[prop]);


export const API_KEY = 'AIzaSyAfvD6DhQe5P5ZprFHCXutWx-kB3DruSlU';
export const DEFAULT_LOCATION = { lat: -33.8578957, lng: 151.1209737 };



// UI ONLY CONSTANTS
export const GEO_PREFILL = {
    BY_ADDRESS: 'BY_ADDRESS',
    BY_NAME: 'BY_NAME',
    BY_COORDINATES: 'BY_COORDINATES'
};