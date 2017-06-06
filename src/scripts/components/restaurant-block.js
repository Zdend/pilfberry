import React from 'react';
import RestaurantTag from './restaurant-tag';
import { PHOTO_TYPE } from '../../../shared/constants';
import { createPhotoLink } from '../services/util';

const DEFAULT_IMAGE_URL = '/static/images/restaurant-type/japanese.jpg';

function findFirstAvatarPicture(restaurant) {
    if (!restaurant.get('photos').size) {
        return DEFAULT_IMAGE_URL;
    }
    const avatarPhoto = restaurant.get('photos').find(photo => photo.get('photoType') === PHOTO_TYPE.AVATAR);
    if (!avatarPhoto) {
        return DEFAULT_IMAGE_URL;
    }

    return createPhotoLink(restaurant.get('id'), avatarPhoto.get('filename'));
}


export default (restaurant) => {
    const photoURL = findFirstAvatarPicture(restaurant);
    return (
        <div className="col-sm-6" key={restaurant.get('id')}>
            <div className="restaurant-block">
                <div className="restaurant-block__image" style={{ backgroundImage: `url('${photoURL}')` }} />
                <div className="restaurant-block__content">
                    <div className="restaurant-block__name">{restaurant.get('name')}</div>
                    <div className="restaurant-block__labels">
                        {restaurant.get('tags').map(item => <RestaurantTag key={item} tag={item} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};