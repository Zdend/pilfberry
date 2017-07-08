import React from 'react';
import { Tooltip, OverlayTrigger, Label } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { generate } from 'shortid';
import RestaurantTag from './restaurant-tag';
import { findFirstAvatarPicture, getDistanceFromLatLonInKm, hashCode } from '../services/util';
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
            <div className="restaurant-block" onClick={() => navigate(`/${restaurant.get('path')}`)}>
                <BlockImage url={photoURL} name={restaurant.get('name')} />
                <div className="restaurant-block__content">
                    {renderDistance(restaurant, currentLocation)}
                    <Link className="restaurant-block__name" to={`/${restaurant.get('path')}`}>{restaurant.get('name')}</Link>
                    <ul className="restaurant-block__labels list-unstyled list-inline list-inline-compact">
                        {restaurant.get('tags').slice(0, 3).map(item => <li key={item}><RestaurantTag tag={item} /></li>)}
                        {restaurant.get('tags').size > 3 &&
                            <OverlayTrigger placement="top" overlay={tooltipElement}>
                                <li><Label bsStyle="success">more +</Label></li>
                            </OverlayTrigger>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};