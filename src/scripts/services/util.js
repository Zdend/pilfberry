import { DEFAULT_AVATAR_URL, PHOTO_TYPE } from '../../../shared/constants';
import { List } from 'immutable';

export const createPhotoLink = (restaurantId, filename) => `/files/restaurants/${restaurantId}/${filename}`;

export function findFirstAvatarPicture(restaurant) {
    if (!restaurant.get('photos').size) {
        return DEFAULT_AVATAR_URL;
    }
    const avatarPhoto = restaurant.get('photos').find(photo => photo.get('photoType') === PHOTO_TYPE.AVATAR);
    if (!avatarPhoto) {
        return DEFAULT_AVATAR_URL;
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

export function matchesSomeFields(restaurant, matcher, fields) {
    return fields.some(field => {
        const fieldValue = restaurant.getIn(field.split('.'));
        
        if (List.isList(fieldValue)) {
            return !!fieldValue.filter(value => matcher.test(value)).size;
        }
        
        return matcher.test(fieldValue);
    });
}