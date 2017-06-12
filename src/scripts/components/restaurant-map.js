import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { SpinnerInline } from './spinner';
import { API_KEY, DEFAULT_LOCATION } from '../../../shared/constants';
import { generate } from 'shortid';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getHumanAddress } from '../services/util';

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
                                <div>
                                    <div><b>{marker.title}</b></div>
                                    <div>{marker.humanAddress}</div>
                                    <div className="margin-top-1x margin-left-2x text-center"><Link to={`/restaurant/${marker.id}`}>View more</Link></div>
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
            humanAddress: getHumanAddress(r),
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
                onMapLoad={handleMapLoad}
                onMapClick={() => { }}
                markers={markers}
                onMarkerRightClick={() => { }}
            />
        );
    }
}


function handleMapLoad(map) {
    if (map && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.panTo(pos);
        });
    }
}
