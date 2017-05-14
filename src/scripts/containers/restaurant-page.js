import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Checkbox } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { getSavedRestaurants } from '../reducers/selectors';
import { fetchRestaurantsAction, createRestaurantAction, deleteRestaurantAction } from '../actions/restaurant-actions';
import { NEW_ID, STATUS_ACTIVE } from 'constants';

class RestaurantPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDeleted: false
        };
        this.displayDeleted = this.displayDeleted.bind(this);
    }
    componentDidMount() {
        this.props.fetchRestaurants();
        this.navigateToNewRestaurant = () => this.props.navigate(`/secure/restaurants/${NEW_ID}`);
    }

    displayDeleted(e) {
        this.setState({ displayDeleted: e.target.checked });
    }

    renderRow(restaurant, navigate, deleteRestaurantAction) {
        const address = restaurant.get('address');
        const id = restaurant.get('id');
        return (
            <tr key={id}>
                <td>{restaurant.get('name')}</td>
                <td>{address.get('postcode')}</td>
                <td>{address.get('suburb')}</td>
                <td>{address.get('street')}</td>
                <td>{restaurant.get('status')}</td>
                <td>
                    <Button
                        bsSize="sm"
                        bsStyle="success"
                        className="margin-right-1x"
                        onClick={() => navigate(`/secure/restaurants/${id}`)}>
                        Edit
                    </Button>
                    {restaurant.get('status') === STATUS_ACTIVE &&
                        <Button
                            bsSize="sm"
                            bsStyle="danger"
                            onClick={() => deleteRestaurantAction(id)}>
                            Delete
                        </Button>
                    }
                </td>
            </tr>
        );
    }

    renderRestaurants(restaurants, navigate, deleteRestaurantAction, displayDeleted) {
        if (restaurants) {
            return restaurants
                .filter(r => displayDeleted ? true : r.get('status') === STATUS_ACTIVE)
                .valueSeq()
                .map(r => this.renderRow(r, navigate, deleteRestaurantAction));
        }
    }

    render() {
        const { restaurants, navigate, deleteRestaurantAction } = this.props;
        return (
            <div className="padding-bottom-2x">
                <Button bsStyle="primary" onClick={this.navigateToNewRestaurant} className="pull-right">
                    <i className="fa fa-plus" /> Create Restaurant
                </Button>
                <h1>Restaurants</h1>


                <Table responsive>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Postcode</th>
                            <th>Suburb</th>
                            <th>Street</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRestaurants(restaurants, navigate, deleteRestaurantAction, this.state.displayDeleted)}
                    </tbody>
                </Table>

                <Checkbox checked={this.state.displayDeleted} readOnly onClick={this.displayDeleted}>
                    Display deleted
                </Checkbox>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        restaurants: getSavedRestaurants(state)
    };
}
const mapDispatchToProps = {
    fetchRestaurants: fetchRestaurantsAction.request,
    createRestaurantAction,
    navigate: push,
    deleteRestaurantAction
};
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);