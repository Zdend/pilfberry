import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { generate } from 'shortid';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SpinnerInline } from './spinner';
import { API_KEY, DEFAULT_LOCATION } from '../../../shared/constants';
import { getHumanAddress } from '../services/util';
import CurrentLocationMarker from './current-location-marker';

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
        const { markers, currentLocation } = this.props;
        const { activeMarker } = this.state;

        return (
            <div>
                <CurrentLocationMarker currentLocation={currentLocation} />
                {markers.map(marker => (
                    <Marker key={generate()}
                        {...marker}
                        onClick={() => this.onMarkerClick(marker)}
                    >
                        {activeMarker && activeMarker.id === marker.id &&
                            <InfoWindow>
                                <div>
                                    <div><b>{marker.title}</b></div>
                                    <div>{marker.humanAddress}</div>
                                    <div className="margin-top-1x margin-left-2x text-center"><Link to={`/${marker.path}`}>View more</Link></div>
                                </div>
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
                <MarkersContainer markers={props.markers} currentLocation={props.currentLocation} />
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
            humanAddress: getHumanAddress(r),
            path: r.get('path'),
            id: r.get('id')
        };
    }).toJS();


function handleMapLoad(map, currentLocation) {
    if (map && currentLocation && currentLocation.get('lat') && currentLocation.get('lng')) {
        map.panTo(currentLocation.toJS());
    }
}

export default ({ restaurants, currentLocation }) => {
    const markers = getMarkers(restaurants);

    return (
        <AsyncGoogleMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${API_KEY}`}
            loadingElement={
                <Col sm={12}>
                    <SpinnerInline />
                </Col>
            }
            containerElement={
                <Col style={{ height: `500px`, width: '100%' }} sm={12} />
            }
            mapElement={
                <div style={{ height: `100%` }} />
            }
            onMapLoad={map => handleMapLoad(map, currentLocation)}
            onMapClick={() => { }}
            markers={markers}
            currentLocation={currentLocation}
            onMarkerRightClick={() => { }}
        />
    );
};