import { select, put, call, fork } from 'redux-saga/effects';
import { fetchRestaurantsAction, fetchRestaurantAction, saveRestaurantAction, prefillAddressAction } from '../actions/restaurant-actions';
import { fetchEntity, updateEntity, deleteEntity } from './';
import { getRestaurant, getRestaurantPhotos } from '../reducers/selectors';
import { push } from 'react-router-redux';
import { setMessageAction } from '../actions/global-message-actions';
import { get, put as putAxios } from 'axios';
import { transformClientRestaurantToServer } from '../transformers/restaurant-transformer';
import { API_KEY, GEO_PREFILL } from '../../../shared/constants';

export function* fetchRestaurants({ criteria }) {
    yield fetchEntity(fetchRestaurantsAction, '/api/restaurants', d => d, criteria);
}
export function* fetchRestaurant({ id }) {
    yield fetchEntity(fetchRestaurantAction, `/api/restaurant/${id}`);
}
export function* saveRestaurant({ id }) {
    const restaurant = yield select(getRestaurant(id));
    yield updateEntity(saveRestaurantAction, `/api/restaurant/${id}`, transformClientRestaurantToServer(restaurant.toJS()));
    yield uploadFiles(id);
    yield put(push('/secure/restaurants'));
    yield put(setMessageAction({ message: `Restaurant "${restaurant.get('name')}" was saved`, type: 'success' }));
}

function* uploadFile(id, file) {
    try {
        const data = new FormData();
        data.append('file', file);
        const response = yield call(putAxios, `/api/restaurant/${id}/photos`, data);
        if (response && response.status === 200) {
            yield put(setMessageAction({ message: `Photo has been added`, type: 'success' }));
        } else {
            yield put(setMessageAction({ message: `There was a problem with uploading a photo`, type: 'danger' }));
        }
    } catch (e) {
        yield put(setMessageAction({ message: `There was a problem with uploading a photo`, type: 'danger' }));
    }
}

export function* uploadFiles(id) {
    const files = yield select(getRestaurantPhotos(id));
    if (files && files.length) {
        yield files.map(file => fork(uploadFile, id, file));
    }
}


export function* deleteRestaurant({ id }) {
    yield deleteEntity(saveRestaurantAction, `/api/restaurant/${id}`);
}

export function* deletePhoto({ restaurantId, photoId }) {
    yield deleteEntity(saveRestaurantAction, `/api/restaurant/${restaurantId}/photo/${photoId}`);
}

//prefillByName get both coordinates and address
//prefillByAddress get coordinates
//prefillByCoordinates get address

//I need Coordinates or address
export function* prefillAddress({ id, type }) {
    yield prefillAddressByCoordinates(id);
    // switch (type) {
    //     case GEO_PREFILL.BY_COORDINATES: return yield prefillAddressByCoordinates(id);
    //     case GEO_PREFILL.BY_ADDRESS: return;
    //     case GEO_PREFILL.BY_NAME: return;
    // }
}


function* prefillAddressByCoordinates(id) {
    const restaurant = yield select(getRestaurant(id));
    const lat = restaurant.getIn(['address', 'latitude']);
    const lng = restaurant.getIn(['address', 'longitude']);
    if (!lat || !lng) {
        yield put(setMessageAction({ message: `You must specify latitude and longitude or address`, type: 'danger' }));
        return;
    }

    try {
        const response = yield call(get, `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${API_KEY}`);

        if (response) {
            console.log(response);
            if (!response.data || !response.data.results || !response.data.results.length) {
                yield put(setMessageAction({ message: `We were unable to find any result matching coordinates`, type: 'danger' }));
            }

            const address = parseAddressResponse(response.data.results);
            yield put(prefillAddressAction.success(id, address));
        }
        yield put(setMessageAction({ message: `Address was updated according to selected coordinates`, type: 'success' }));
    } catch (e) {
        yield put(setMessageAction({ message: `We were unable to locate specified address`, type: 'danger' }));
    }
}

function parseAddressResponse(results) {
    return getAddressUntilNonEmpty(results, 0, {});
}

function getAddressUntilNonEmpty(results, index, initialAddress) {
    const getComponent = result => name => {
        const componentMatch = component => component.types && component.types.indexOf(name) !== -1;
        const matches = result.address_components.filter(componentMatch);
        return matches && matches.length ? matches[0] && matches[0].long_name : undefined;
    };
    const finder = getComponent(results[index]);
    const address = {
        postcode: finder('postal_code'),
        street: `${finder('street_number') ? finder('street_number') : ''} ${finder('route')}`,
        suburb: finder('locality'),
        state: finder('administrative_area_level_1'),
        country: finder('country'),
        city: finder('colloquial_area')
    };
    const blankFreeAddress = Object.keys(address).reduce((result, prop) => {
        if (address[prop] && address[prop].trim()) {
            result[prop] = address[prop];
        }
        return result;
    }, {});
    const newAddress = Object.assign(blankFreeAddress, initialAddress);

    return (index + 1) >= results.length
        ? newAddress
        : getAddressUntilNonEmpty(results, index + 1, newAddress);

}