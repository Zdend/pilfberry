import { Record, List } from 'immutable';
import { STATUS_ACTIVE } from 'constants';

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

export const restaurantDef = {
    address: Address,
    tags: List,
    cuisines: List
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