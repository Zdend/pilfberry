import { Record, List, Map } from 'immutable';
import { STATUS_ACTIVE } from 'constants';
import { arrayToMapById } from '../services';

export const Address = Record({
    postcode: undefined,
    street: undefined,
    suburb: undefined,
    city: undefined,
    country: undefined,
    latitude: undefined,
    longitude: undefined,
    state: undefined
});

export const Photo = Record({
    id: null,
    filename: undefined,
    photoType: undefined,
    contentType: undefined
});

export const restaurantDef = {
    address: Address,
    tags: List,
    cuisines: List,
    photos: photos => arrayToMapById(photos, Photo, Map)
};

export default Record({
    id: null,
    name: '',
    status: STATUS_ACTIVE,
    address: new Address(),
    tags: new List(),
    description: '',
    url: '',
    created: null,
    cuisines: new List(),
    photos: new List()
});