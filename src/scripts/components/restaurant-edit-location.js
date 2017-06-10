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
                ref={props.onMapLoad}
                defaultZoom={12}
                defaultCenter={DEFAULT_LOCATION}
                defaultOptions={{
                    scrollwheel: false
                }}
                onClick={props.onMapClick}
            >
                {/*<div>*/}
                {/*<SearchBox
                        inputPlaceholder="Search"
                        controlPosition={google.maps.ControlPosition.TOP_RIGHT}
                        inputClassName="form-control gmap-search"
                        onPlacesChanged={bla => console.log(bla)}
                    />*/}

                {props.markers.map(marker => (
                    <Marker key={generate()}
                        {...marker}
                        onRightClick={() => props.onMarkerRightClick(marker)}
                    />
                ))}
                {/*</div>*/}
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

        const position = latitude && longitude && { lat: latitude, lng: longitude };
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
                        <input type="text" ref={input => this.searchBox = input} className="formControl" />
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
                            onMapLoad={map => handleMapLoad(map, position, this.searchBox)}
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


function handleMapLoad(map, position, searchBox) {
    if (map && position && position.lat && position.lng) {
        map.panTo(position);
    }
    if (map && searchBox) {
        initAutocomplete(map, searchBox);
    }
}

function initAutocomplete(mapComponent, input) {
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   center: {lat: -33.8688, lng: 151.2195},
    //   zoom: 13,
    //   mapTypeId: 'roadmap'
    // });

    const map = mapComponent.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    // const map = mapComponent.props.refs.map;

    
    // Create the search box and link it to the UI element.
    // var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}