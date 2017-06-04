import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, FormControl, FormGroup, ControlLabel, InputGroup } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { getRestaurant, getRestaurantPhotos } from '../reducers/selectors';
import {
    fetchRestaurantAction,
    restaurantValueChangeAction,
    saveRestaurantAction,
    createRestaurantAction,
    prefillAddressAction,
    fileChangeAction,
    deletePhotoAction
} from '../actions/restaurant-actions';
import InputHOC from '../components/connected-input-hoc';
import { NEW_ID, STATUSES, DATE_FORMAT, TAGS, CUISINES } from 'constants';
import RestaurantEditTag from '../components/restaurant-edit-tag';
import RestaurantEditLocation from '../components/restaurant-edit-location';
import RestaurantPhoto from '../components/restaurant-photo';
import RestaurantGallery from '../components/restaurant-gallery';
import moment from 'moment';
import { bindActionCreators } from 'redux';


class RestaurantPage extends Component {
    componentDidMount() {
        const { match: { params: { id } }, restaurant, createRestaurantAction } = this.props;
        if (id !== NEW_ID) {
            this.props.fetchRestaurant(id);
        } else if (!restaurant) {
            createRestaurantAction();
        }
    }

    render() {
        const { match: { params: { id } }, restaurant, restaurantValueChangeAction, saveRestaurant, prefillAddress, navigate, fileChange, files, deletePhotoAction } = this.props;
        const handleChange = (field, value) => restaurantValueChangeAction(id, field, value);
        const handleChangeForEvent = (field, e) => handleChange(field, e.target.value);
        const ConnectedInput = InputHOC(handleChangeForEvent);
        const RestaurantInput = ({ value, field, ...rest }) => <ConnectedInput value={restaurant.getIn([...field.split('.')])} {...{ ...rest, field }} />;

        return (
            <div className="padding-bottom-2x">
                {restaurant &&
                    <div>
                        <h1 className="margin-top-1x">{restaurant.get('name') || '<Restaurant Name>'}</h1>

                        <RestaurantInput label="Restaurant name" field="name" />

                        <Row>
                            <Col sm={12}>
                                <RestaurantInput label="Description" field="description" type="textarea" />
                            </Col>
                        </Row>

                        <fieldset>
                            <legend>Address</legend>
                            <RestaurantInput label="Street" field="address.street" />

                            <Row>
                                <Col sm={6}>
                                    <RestaurantInput label="Suburb" field="address.suburb" />
                                </Col>
                                <Col sm={6}>
                                    <RestaurantInput label="Postcode" field="address.postcode" />
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={6}>
                                    <RestaurantInput label="City" field="address.city" />
                                </Col>
                                <Col sm={6}>
                                    <RestaurantInput label="Country" field="address.country" />
                                </Col>
                            </Row>


                            <Row>
                                <Col sm={4}>
                                    <RestaurantInput label="Latitude" field="address.latitude" />
                                </Col>
                                <Col sm={4}>
                                    <RestaurantInput label="Longitude" field="address.longitude" />
                                </Col>
                                <Col sm={2} className="text-align-center">
                                    <RestaurantEditLocation
                                        address={restaurant.get('address')}
                                        handleChange={handleChange}
                                    />
                                </Col>
                                <Col sm={2} className="text-align-center">
                                    <Button bsStyle="link" className="margin-top-2x-sm" onClick={() => prefillAddress(restaurant.get('id'))}>
                                        <i className="fa fa-search margin-right-05x" /> Prefill address
                                    </Button>
                                </Col>
                            </Row>
                        </fieldset>


                        <fieldset>
                            <Row>
                                <Col sm={6}>
                                    <legend>Tags</legend>
                                    <RestaurantEditTag
                                        handleChange={(value) => handleChange('tags', value)}
                                        tags={restaurant.get('tags').toJS()}
                                        definedTags={TAGS}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <legend>Cuisines</legend>
                                    <RestaurantEditTag
                                        handleChange={(value) => handleChange('cuisines', value)}
                                        tags={restaurant.get('cuisines').toJS()}
                                        definedTags={CUISINES}
                                    />
                                </Col>
                            </Row>

                        </fieldset>

                        <Row className="margin-top-2x">
                            <Col sm={4}>
                                <RestaurantInput label="Status" field="status" type="select" selectValues={STATUSES} />
                            </Col>
                            <Col sm={4}>
                                <RestaurantInput label="Website" field="url" />
                            </Col>
                            <Col sm={4}>
                                <ControlLabel>Date created</ControlLabel>
                                <FormControl.Static>
                                    {restaurant.get('created') ? moment(restaurant.get('created')).format(DATE_FORMAT) : 'Not Specified'}
                                </FormControl.Static>
                            </Col>
                        </Row>

                        <fieldset>
                            <Row>
                                <Col sm={12}>
                                    <legend>Photo</legend>
                                    <RestaurantPhoto files={files} handleChange={fileChange} />
                                    <RestaurantGallery restaurantId={id} photos={restaurant.get('photos')} deleteAction={deletePhotoAction} handleTypeChange={handleChangeForEvent} />
                                </Col>
                            </Row>
                        </fieldset>


                        <Button bsStyle="primary" className="margin-top-3x margin-right-1x" onClick={() => saveRestaurant(id)}>
                            <i className="fa fa-save margin-right-05x" />Save
                        </Button>

                        <Button bsStyle="default" className="margin-top-3x" onClick={() => navigate('/secure/restaurants')}>
                            Back
                        </Button>

                    </div>
                }


            </div>
        );
    }
}
function mapStateToProps(state, props) {
    const { match: { params: { id } } } = props;
    return {
        restaurant: getRestaurant(id)(state),
        files: getRestaurantPhotos(id)(state)
    };
}
const mapDispatchToProps = (dispatch, props) => {
    const { match: { params: { id } } } = props;
    return {
        fetchRestaurant: bindActionCreators(fetchRestaurantAction.request, dispatch),
        restaurantValueChangeAction: bindActionCreators(restaurantValueChangeAction, dispatch),
        navigate: bindActionCreators(push, dispatch),
        saveRestaurant: bindActionCreators(saveRestaurantAction.request, dispatch),
        createRestaurantAction: bindActionCreators(createRestaurantAction, dispatch),
        prefillAddress: bindActionCreators(prefillAddressAction.request, dispatch),
        fileChange: bindActionCreators(fileChangeAction(id), dispatch),
        deletePhotoAction: bindActionCreators(deletePhotoAction(id), dispatch),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);