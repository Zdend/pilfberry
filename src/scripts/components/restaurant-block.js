import React from 'react';
import RestaurantTag from './restaurant-tag';
import { findFirstAvatarPicture, getDistanceFromLatLonInKm, hashCode } from '../services/util';
import { Tooltip, OverlayTrigger, Label } from 'react-bootstrap';
import { generate } from 'shortid';
import { DEFAULT_AVATAR_COLOURS } from '../../../shared/constants/colours';

function renderDistance(restaurant, currentLocation) {
    const restaurantCoordinates = {
        lat: restaurant.getIn(['address', 'latitude']),
        lng: restaurant.getIn(['address', 'longitude'])
    };
    const currentCoordinates = currentLocation.toJS();
    if (!restaurantCoordinates.lat || !restaurantCoordinates.lng || !currentCoordinates.lat || !currentCoordinates.lng) {
        return null;
    }
    const distance = getDistanceFromLatLonInKm(
        restaurantCoordinates.lat,
        restaurantCoordinates.lng,
        currentCoordinates.lat,
        currentCoordinates.lng
    );
    const humanNumber = distance < 1 ? Math.round(distance * 1000) : Math.round(distance * 10) / 10;
    const distanceWithUnits = `${humanNumber} ${distance < 1 ? 'm' : 'km'}`;
    return (
        <OverlayTrigger placement="top" overlay={<Tooltip id={generate()}>{distanceWithUnits} away from you</Tooltip>}>
            <div className="restaurant-block__distance">{distanceWithUnits}</div>
        </OverlayTrigger>
    );
}

const BlockImage = ({ name, url }) => {
    if (!url) {
        const hash = hashCode(name);
        const randomIndex = `${hash}`.split('').find(number => number >= 0 && number < DEFAULT_AVATAR_COLOURS.length);
        const randomCoulour = DEFAULT_AVATAR_COLOURS[parseInt(randomIndex, 10)];
        return (
            <div className="restaurant-block__empty-image" style={{ backgroundColor: randomCoulour }}>
                <span className="restaurant-block__empty-letter">
                    {name.trim().slice(0, 1).toUpperCase()}
                </span>
            </div>
        );
    }
    return (
        <div className="restaurant-block__image" style={{ backgroundImage: `url('${url}')` }} />
    );
};


export default ({ restaurant, navigate, currentLocation }) => {
    const photoURL = findFirstAvatarPicture(restaurant);

    const tooltipElement = <Tooltip id={generate()}>{restaurant.get('tags').slice(3).join(', ').toLowerCase()}</Tooltip>;

    return (
        <div className="col-sm-6">
            <div className="restaurant-block" onClick={() => navigate(`/restaurant/${restaurant.get('id')}`)}>
                <BlockImage url={photoURL} name={restaurant.get('name')} />
                <div className="restaurant-block__content">
                    {renderDistance(restaurant, currentLocation)}
                    <div className="restaurant-block__name">{restaurant.get('name')}</div>
                    <div className="restaurant-block__labels">
                        {restaurant.get('tags').slice(0, 3).map(item => <RestaurantTag key={item} tag={item} />)}
                        {restaurant.get('tags').size > 3 &&
                            <OverlayTrigger placement="top" overlay={tooltipElement}>
                                <Label bsStyle="success">more +</Label>
                            </OverlayTrigger>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};