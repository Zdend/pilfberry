import {Record} from 'immutable';

export const AddressRecord = Record({
    id: null,
    postcode: null,
    street: null,
    suburb: null,
    city: null,
    country: null
});

export default Record({
    id: null,
    name: '',
    address: new AddressRecord()
});