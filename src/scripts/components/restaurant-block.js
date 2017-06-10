import React from 'react';
import RestaurantTag from './restaurant-tag';
import { findFirstAvatarPicture } from '../services/util';

export default ({ restaurant, navigate }) => {
    const photoURL = findFirstAvatarPicture(restaurant);
    return (
        <div className="col-sm-6">
            <div className="restaurant-block" onClick={() => navigate(`/restaurant/${restaurant.get('id')}`)}>
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