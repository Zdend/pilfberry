import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { SpinnerInline } from './spinner';
import { API_KEY, DEFAULT_LOCATION } from 'constants';
import { generate } from 'shortid';

// Use google api to find markers
// http://maps.google.com/maps/api/geocode/json?address=Crows+Nest+Australia

const AsyncGoogleMap = withScriptjs(
    withGoogleMap(
        props => (
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={12}
                defaultCenter={DEFAULT_LOCATION}
                defaultOptions={{
                    scrollwheel: false
                }}
                onClick={props.onMapClick}
            >
                {props.markers.map(marker => (
                    <Marker key={generate()}
                        {...marker}
                        onRightClick={() => props.onMarkerRightClick(marker)}
                    >
                        <InfoWindow 
                            showingInfoWindow={true}
                            >
                            <span>{marker.title}</span>
                        </InfoWindow>
                    </Marker>
                ))}
            </GoogleMap>
        )
    )
);

export default ({ restaurants }) => {

    const markers = restaurants
        .valueSeq()
        .filter(r => r.getIn(['address', 'latitude']) && r.getIn(['address', 'longitude']))
        .map(r => {
            return {
                position: {
                    lat: r.getIn(['address', 'latitude']),
                    lng: r.getIn(['address', 'longitude'])
                },
                title: r.get('name'),
                label: r.get('name').slice(0, 1).toUpperCase()
            };
        }).toJS();

    return (
        <AsyncGoogleMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${API_KEY}`}
            loadingElement={
                <div style={{ height: `100%` }}>
                    <SpinnerInline />
                </div>
            }
            containerElement={
                <div style={{ height: `500px`, width: '100%' }} />
            }
            mapElement={
                <div style={{ height: `100%` }} />
            }
            onMapLoad={handleMapLoad}
            onMapClick={() => { }}
            markers={markers}
            onMarkerRightClick={() => { }}
        />
    );
};


function handleMapLoad(map) {
    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: { lat: -34.397, lng: 150.644 },
    //     zoom: 6
    // });
    // infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (map && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            // this.setState({center: pos});
            map.panTo(pos);
        }, function () {
            // handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter());
    }
}
