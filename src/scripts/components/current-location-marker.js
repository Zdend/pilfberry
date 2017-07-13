/* global google */
import React from 'react';
import { Marker } from 'react-google-maps';
import { generate } from 'shortid';

export default ({ currentLocation }) => {
    if (!currentLocation || !currentLocation.get('lat') || !currentLocation.get('lng')) {
        return null;
    }
    return (
        <Marker key={generate()} position={currentLocation.toJS()} icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#4285f4',
            fillOpacity: 0.8,
            strokeWeight: 1,
            strokeColor: '#356dca'
        }} />
    );
};