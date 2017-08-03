/* global google */
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { generate } from 'shortid';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { SpinnerInline } from './spinner';
import { API_KEY } from '../../../shared/constants';
import CurrentLocationMarker from './current-location-marker';

const AsyncGoogleMap = withScriptjs(
    withGoogleMap(
        props => (
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={17}
                defaultCenter={props.location}
                defaultOptions={{
                    scrollwheel: false
                }}
            >
                <CurrentLocationMarker currentLocation={props.currentLocation} />
                {props.markers.map(marker => (
                    <Marker key={generate()}
                        {...marker}
                    />
                ))}

            </GoogleMap>
        )
    )
);

function handleMapLoad(map, currentLocation, currentLocButton, restaurantLocation, restaurantButton) {
    if (map) {
        currentLocButton.onclick = () => map.panTo(currentLocation.toJS());
        restaurantButton.onclick = () => map.panTo(restaurantLocation);

        const rawMap = map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

        const controlContainer = rawMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM];
        const notInitialised = !controlContainer.getLength();
        if (notInitialised) {
            if (currentLocation.get('lat') && currentLocation.get('lng')) {
                currentLocButton.style = '';
            }
            restaurantButton.style = '';
            controlContainer.push(restaurantButton);
            controlContainer.push(currentLocButton);
        }
    }
}

export default class RestaurantViewLocation extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        const { currentLocation, address } = this.props;

        if (!address.get('latitude') || !address.get('longitude')) {
            return null;
        }

        const position = { lat: address.get('latitude'), lng: address.get('longitude') };
        return (
            <div className="inline-block">
                <a className="margin-left-1x-sm" onClick={() => this.open()} href="javascript:void(0)">
                    Show on map
                </a>
                <Modal show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Restaurant location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <button type="button"
                            className="google-button google-button__current-location margin-bottom-1x"
                            ref={ref => this.currentLocBtn = ref}
                            style={{ display: 'none' }}>
                            <i className="fa fa-crosshairs" />
                        </button>
                        <button type="button"
                            className="google-button google-button__current-location"
                            ref={ref => this.restaurantLocBtn = ref}
                            style={{ display: 'none' }}>
                            <i className="fa fa-map-marker" />
                        </button>
                        <AsyncGoogleMap
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${API_KEY}&libraries=places`}
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
                            location={position}
                            currentLocation={currentLocation}
                            onMapLoad={map => handleMapLoad(map, currentLocation, this.currentLocBtn, position, this.restaurantLocBtn)}
                            markers={[{ position }]}
                            onMarkerRightClick={() => { }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
