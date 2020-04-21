export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_FORMAT_WORD = 'Do MMMM YYYY';
export const NEW_ID = 'new';

export const DEFAULT_AVATAR_URL = '/static/images/restaurant-type/japanese.jpg';

export const STATUS_ACTIVE = 'ACTIVE';
export const STATUS_DELETED = 'DELETED';
export const STATUS_DRAFT = 'DRAFT';
export const STATUSES = [STATUS_ACTIVE, STATUS_DELETED];
export const POST_STATUSES = [STATUS_ACTIVE, STATUS_DRAFT, STATUS_DELETED];

export const POST_CATEGORY = {
    RECIPE: 'RECIPE',
    POST: 'POST',
    DIET: 'DIET',
    NEWS: 'NEWS'
};

export const POST_CATEGORIES = Object.keys(POST_CATEGORY).map(prop => POST_CATEGORY[prop]);

export const TAG = {
    VEGETARIAN: 'VEGETARIAN',
    VEGAN: 'VEGAN',
    GLUTEN_FREE: 'GLUTEN FREE',
    RAW_VEGAN: 'RAW VEGAN',
    DAIRY_FREE: 'DAIRY FREE',
    FAMILY: 'FAMILY',
    TAKEAWAY: 'TAKEAWAY',
    PESCATARIAN: 'PESCATARIAN',
    PALEO: 'PALEO',
    FOOD_COURT: 'FOOD COURT',
    BAR: 'BAR',
    PREGNANT_FRIENDLY: 'PREGNANT FRIENDLY',
    NUT_FREE: 'NUT FREE'
};


export const TAGS = Object.keys(TAG).map(prop => TAG[prop]);

export const CUISINE = {
    INTERNATIONAL: 'INTERNATIONAL',
    INDIAN: 'INDIAN',
    DESSERT: 'DESSERT',
    AUSTRALIAN: 'AUSTRALIAN',
    THAI: 'THAI',
    CHINESE: 'CHINESE',
    JAPANESE: 'JAPANESE',
    FUSION: 'FUSION',
    CAFE: 'CAFE',
    GROCER: 'GROCER',
    KOREA: 'KOREA',
    MALAYSIAN: 'MALAYSIAN',
    ITALIAN: 'ITALIAN',
    VIETNAMESE: 'VIETNAMESE',
    TAIWANESE: 'TAIWANESE',
    BURGERS: 'BURGERS',
    NEPALESE: 'NEPALESE',
    SPANISH: 'SPANISH',
    RUSSIAN: 'RUSSIAN',
    FRENCH: 'FRENCH',
    EASTERN_EUROPEAN: 'EASTERN EUROPEAN',
};
export const CUISINES = Object.keys(CUISINE).map(prop => CUISINE[prop]);

export const PHOTO_TYPE = {
    AVATAR: 'AVATAR',
    COVER: 'COVER',
    GALLERY: 'GALLERY'
};
export const PHOTO_TYPES = Object.keys(PHOTO_TYPE).map(prop => PHOTO_TYPE[prop]);


export const PRICE = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    EXTRA: 4
};

export const API_KEY = 'AIzaSyAfvD6DhQe5P5ZprFHCXutWx-kB3DruSlU';
export const WEB_API_KEY = 'AIzaSyCXdRkuZju9jPbwnVrM-FyIh0rjkIIMGI8';
export const DEFAULT_LOCATION = { lat: -33.8578957, lng: 151.1209737 };

export const HOSTNAME = 'https://pilfberry.com';


// UI ONLY CONSTANTS
export const GEO_PREFILL = {
    BY_ADDRESS: 'BY_ADDRESS',
    BY_NAME: 'BY_NAME',
    BY_COORDINATES: 'BY_COORDINATES'
};