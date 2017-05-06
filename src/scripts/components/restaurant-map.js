import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { SpinnerInline } from './spinner';

const API_KEY = 'AIzaSyAfvD6DhQe5P5ZprFHCXutWx-kB3DruSlU';
const DEFAULT_LOCATION = { lat: -33.8578957, lng: 151.1209737 };

// Use google api to find markers
//http://maps.google.com/maps/api/geocode/json?address=Crows+Nest+Australia

const AsyncGettingStartedExampleGoogleMap = withScriptjs(
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
                    <Marker
                        {...marker}
                        onRightClick={() => props.onMarkerRightClick(marker)}
                    />
                ))}
            </GoogleMap>
        )
    )
);

export default () => {

    return (
        <AsyncGettingStartedExampleGoogleMap
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
            markers={[]}
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
    if (navigator.geolocation) {
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

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}