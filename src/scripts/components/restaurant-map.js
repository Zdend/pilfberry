import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import {SpinnerInline} from './spinner';

const API_KEY = 'AIzaSyAfvD6DhQe5P5ZprFHCXutWx-kB3DruSlU';

const AsyncGettingStartedExampleGoogleMap = withScriptjs(
    withGoogleMap(
        props => (
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={3}
                defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
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
            onMapLoad={() => {}}
            onMapClick={() => {}}
            markers={[]}
            onMarkerRightClick={() => {}}
        />
    );
};
