import React from 'react';
import RestaurantTag from './restaurant-tag';

export default (restaurant) => {

    const restaurantType = 'japanese';
    return (
        <div className="col-sm-6" key={restaurant.get('id')}>
            <div className="restaurant-block">
                <img className="restaurant-block__image" src={`/static/images/restaurant-type/${restaurantType}.jpg`} />
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