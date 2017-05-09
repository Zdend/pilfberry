import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { getRestaurant } from '../reducers/selectors';
import { fetchRestaurantAction } from '../actions/restaurant-actions';

class RestaurantPage extends Component {
    componentDidMount() {
        const { match: { params: { id } } } = this.props;
        this.props.fetchRestaurant(id);
    }

    render() {
        const { restaurant } = this.props;

        return (
            <div className="padding-top-2x padding-bottom-2x">
                <h1>{restaurant && restaurant.get('name')}</h1>

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
    navigate: push
};
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);