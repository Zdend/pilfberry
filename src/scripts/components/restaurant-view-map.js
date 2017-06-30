import React, { Component } from 'react';
import { Modal, Button, FormControl, InputGroup, InputGroupButton } from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
import { SpinnerInline } from './spinner';
import { API_KEY, DEFAULT_LOCATION } from '../../../shared/constants';
import { generate } from 'shortid';

const AsyncGoogleMap = withScriptjs(
    withGoogleMap(
        props => (
            <GoogleMap
                defaultZoom={17}
                defaultCenter={props.location}
                defaultOptions={{
                    scrollwheel: false
                }}

            >
                {props.markers.map(marker => (
                    <Marker key={generate()}
                        {...marker}
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
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        const { latitude, longitude } = this.props.address;
        if (!latitude || !longitude) {
            return null;
        }

        const position = { lat: latitude, lng: longitude };
        return (
            <div className="margin-left-1x inline-block">
                <a className="margin-left-1x-sm" onClick={() => this.open()} href="javascript:void(0)">
                    Show on map
                </a>
                <Modal show={this.state.showModal} onHide={() => this.close()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select location of the restaurant</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
