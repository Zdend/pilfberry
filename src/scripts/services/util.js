import { DEFAULT_AVATAR_URL, PHOTO_TYPE } from '../../../shared/constants';

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