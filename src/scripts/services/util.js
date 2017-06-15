import { DEFAULT_AVATAR_URL, PHOTO_TYPE } from '../../../shared/constants';
import { List } from 'immutable';

export const createPhotoLink = (restaurantId, filename) => `/files/restaurants/${restaurantId}/${filename}`;

export function findFirstAvatarPicture(restaurant) {
    if (!restaurant.get('photos').size) {
        return null;
    }
    const avatarPhoto = restaurant.get('photos').find(photo => photo.get('photoType') === PHOTO_TYPE.AVATAR);
    if (!avatarPhoto) {
        return null;
    }

    return createPhotoLink(restaurant.get('id'), avatarPhoto.get('filename'));
}

export function findFirstCoverPicture(restaurant) {
    if (!restaurant.get('photos').size) {
        return null;
    }
    const coverPhoto = restaurant.get('photos').find(photo => photo.get('photoType') === PHOTO_TYPE.COVER);
    if (!coverPhoto) {
        return null;
    }
    return createPhotoLink(restaurant.get('id'), coverPhoto.get('filename'));
}

export const splitSearchExpression = searchExpression => searchExpression.split(/(,|\s)/).filter(exp => exp && exp.trim() && exp !== ',');

export function matchesSomeFields(restaurant, searchExpressions, fields) {
    const orExpression = searchExpressions.join('|');
    const matcher = new RegExp(`(${orExpression})`, 'i');
    return fields.some(field => {
        const fieldValue = restaurant.getIn(field.split('.'));

        if (List.isList(fieldValue)) {
            return !!fieldValue.filter(value => matcher.test(value)).size;
        }

        return matcher.test(fieldValue);
    });
}

export function getHumanAddress(restaurant) {
    if (!restaurant) {
        return '';
    }
    const a = restaurant.get('address');
    return [a.get('street'), a.get('suburb'), a.get('postcode')]
        .map(value => `${value}`)
        .filter(value => value && value.trim())
        .join(', ');
}

const deg2rad = deg => deg * (Math.PI / 180);

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

export const hashCode = s => {
    return Math.abs(s.split('').reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0));
};

export const arrayUnique = a => a.filter((item, i, ar) => item && ar.indexOf(item) === i);

export function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
