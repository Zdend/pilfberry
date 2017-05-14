import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Grid, Row, Col } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { getRestaurant } from '../reducers/selectors';
import { fetchRestaurantAction, restaurantValueChangeAction, saveRestaurantAction, createRestaurantAction } from '../actions/restaurant-actions';
import InputHOC from '../components/connected-input-hoc';
import { NEW_ID, STATUSES } from 'constants';


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
        const { match: { params: { id } }, restaurant, restaurantValueChangeAction, saveRestaurant } = this.props;
        const handleChange = (field, e) => restaurantValueChangeAction(id, field, e.target.value);
        const ConnectedInput = InputHOC(handleChange);
        const RestaurantInput = ({ value, field, ...rest }) => <ConnectedInput value={restaurant.getIn([...field.split('.')])} {...{ ...rest, field }} />;

        return (
            <div className="padding-bottom-2x">
                {restaurant &&
                    <div>
                        <h1 className="margin-top-1x">{restaurant.get('name') || '<Restaurant Name>'}</h1>

                        <RestaurantInput label="Restaurant name" field="name" />

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
                        </fieldset>
                        <Row>
                            <Col sm={6}>
                                <RestaurantInput label="Status" field="status" selectValues={STATUSES} />
                            </Col>
                        </Row>


                        <Button bsStyle="primary" onClick={() => saveRestaurant(id)}>
                            <i className="fa fa-save margin-right-05x" />Save
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
        restaurant: getRestaurant(id)(state)
    };
}
const mapDispatchToProps = {
    fetchRestaurant: fetchRestaurantAction.request,
    restaurantValueChangeAction,
    navigate: push,
    saveRestaurant: saveRestaurantAction.request,
    createRestaurantAction
};
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);