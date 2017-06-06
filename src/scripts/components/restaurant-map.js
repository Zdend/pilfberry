import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { SpinnerInline } from './spinner';
import { API_KEY, DEFAULT_LOCATION } from '../../../shared/constants';
import { generate } from 'shortid';

// Use google api to find markers
// http://maps.google.com/maps/api/geocode/json?address=Crows+Nest+Australia

class MarkersContainer extends Component {
    constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.state = { activeMarker: null };
    }
    onMarkerClick(marker) {
        this.setState({
            activeMarker: marker
        });
    }

    render() {
        const { markers } = this.props;
        const { activeMarker } = this.state;
        return (
            <div>
                {markers.map(marker => (
                    <Marker key={generate()}
                        {...marker}
                        onClick={() => this.onMarkerClick(marker)}
                    >
                        {activeMarker && activeMarker.id === marker.id &&
                            <InfoWindow>
                                <span>{marker.title}</span>
                            </InfoWindow>
                        }
                    </Marker>
                ))}
            </div>
        );
    }
}

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
                <MarkersContainer markers={props.markers} />
            </GoogleMap>
        )
    )
);

const getMarkers = (restaurants) => restaurants.valueSeq()
    .filter(r => r.getIn(['address', 'latitude']) && r.getIn(['address', 'longitude']))
    .map(r => {
        return {
            position: {
                lat: r.getIn(['address', 'latitude']),
                lng: r.getIn(['address', 'longitude'])
            },
            title: r.get('name'),
            label: r.get('name').slice(0, 1).toUpperCase(),
            id: r.get('id')
        };
    }).toJS();

export default class RestaurantMapContainer extends Component {


    render() {
        const { restaurants } = this.props;
        const markers = getMarkers(restaurants);

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
    }
}


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
