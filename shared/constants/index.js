export const DATE_FORMAT = 'DD/MM/YYYY';
export const NEW_ID = 'new';


export const STATUS_ACTIVE = 'ACTIVE';
export const STATUS_DELETED = 'DELETED';
export const STATUSES = [STATUS_ACTIVE, STATUS_DELETED];

export const TAG = {
    VEGETARIAN: 'VEGETARIAN',
    VEGAN: 'VEGAN',
    GLUTEN_FREE: 'GLUTEN FREE',
    RAW_VEGAN: 'RAW VEGAN',
    DAIRY_FREE: 'DAIRY FREE'
};


export const TAGS = Object.keys(TAG).map(prop => TAG[prop]);

export const API_KEY = 'AIzaSyAfvD6DhQe5P5ZprFHCXutWx-kB3DruSlU';
export const DEFAULT_LOCATION = { lat: -33.8578957, lng: 151.1209737 };