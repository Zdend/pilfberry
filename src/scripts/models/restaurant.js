import { Record } from 'immutable';
import { STATUS_ACTIVE } from 'constants';

export const Address = Record({
    postcode: undefined,
    street: undefined,
    suburb: undefined,
    city: undefined,
    country: undefined
});

export default Record({
    id: null,
    name: '',
    status: STATUS_ACTIVE,
    address: new Address()
});