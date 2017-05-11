import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { getRestaurants } from '../reducers/selectors';
import { fetchRestaurantsAction } from '../actions/restaurant-actions';

class RestaurantPage extends Component {
    componentDidMount() {
        this.props.fetchRestaurants();
    }

    renderRow(restaurant, navigate) {
        return (
            <tr key={restaurant.get('id')}>
                <td>{restaurant.get('name')}</td>
                <td>
                    <Button
                        bsSize="sm"
                        bsStyle="success"
                        className="margin-right-1x"
                        onClick={() => navigate(`/secure/restaurants/${restaurant.get('id')}`)}>
                        Edit
                    </Button>
                    <Button bsSize="sm" bsStyle="danger">Delete</Button>
                </td>
            </tr>
        );
    }

    render() {
        const { restaurants, navigate } = this.props;
        return (
            <div className="padding-bottom-2x">
                <h1>Restaurants</h1>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants && restaurants.valueSeq().map(r => this.renderRow(r, navigate))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        restaurants: getRestaurants(state)
    };
}
const mapDispatchToProps = {
    fetchRestaurants: fetchRestaurantsAction.request,
    navigate: push
};
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);