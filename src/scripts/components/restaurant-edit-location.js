import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
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
                    />
                ))}
            </GoogleMap>
        )
    )
);

export default class RestaurantEditLocation extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
        this.onMapClick = this.onMapClick.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    onMapClick(args) {
        const lat = args.latLng.lat();
        const lng = args.latLng.lng();
        this.props.handleChange('address.latitude', lat);
        this.props.handleChange('address.longitude', lng);
    }

    render() {
        const { address, handleChange } = this.props;
        const { latitude, longitude, street, postcode, city, state, country } = address;

        const position = { lat: latitude, lng: longitude };
        return (
            <div>
                <Button bsStyle="link" className="margin-top-2x-sm" onClick={() => this.open()}>
                    <i className="fa fa-map margin-right-05x" />Select on map
                </Button>
                <Modal show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select location of the restaurant</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                            onMapLoad={map => handleMapLoad(map, position)}
                            onMapClick={this.onMapClick}
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


function handleMapLoad(map, position) {
    if (map && position && position.lat && position.lng) {
        map.panTo(position);
    }
}
