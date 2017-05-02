import React from 'react';


export default (restaurant) => {

    const restaurantType = 'japanese';

    const labels = ['vegan', 'gluten free', 'pregnant women'];
    return (
        <div className="col-sm-6" key={restaurant.get('id')}>
            <div className="restaurant-block">
                <img className="restaurant-block__image" src={`/static/images/restaurant-type/${restaurantType}.jpg`} />
                <div className="restaurant-block__content">
                    <div className="restaurant-block__name">{restaurant.get('name')}</div>
                    <div className="restaurant-block__labels">
                        {labels.map(label => <span key={label} className="label label-success margin-right-05x">{label}</span> )}
                    </div>
                </div>
            </div>
        </div>
    );
};