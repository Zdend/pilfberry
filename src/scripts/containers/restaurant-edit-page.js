import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Grid, Row, Col } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { getRestaurant } from '../reducers/selectors';
import { fetchRestaurantAction, restaurantValueChangeAction } from '../actions/restaurant-actions';
import InputHOC from '../components/connected-input-hoc';


class RestaurantPage extends Component {
    componentDidMount() {
        const { match: { params: { id } } } = this.props;
        this.props.fetchRestaurant(id);
    }

    render() {
        const { match: { params: { id } }, restaurant, restaurantValueChangeAction } = this.props;
        const handleChange = (field, e) => restaurantValueChangeAction(id, field, e.target.value);
        const ConnectedInput = InputHOC(handleChange);
        const RestaurantInput = ({ value, field, ...rest }) => <ConnectedInput value={restaurant.getIn([...field.split('.')])} {...{ ...rest, field }} />;

        return (
            <Grid className="padding-bottom-2x">
                {restaurant &&
                    <div>
                        <h1>{restaurant.get('name')}</h1>

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


                    </div>
                }


            </Grid>
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
    navigate: push
};
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);