import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Checkbox, FormControl, Row, Col } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { getSavedRestaurants } from '../../reducers/selectors';
import { fetchRestaurantsAction, createRestaurantAction, deleteRestaurantAction } from '../../actions/restaurant-actions';
import { NEW_ID, STATUS_ACTIVE, STATUS_DELETED } from '../../../../shared/constants';
import { matchesSomeFields, splitSearchExpression } from '../../services/util';
import MetaTag from '../../components/structure/meta';
import CheckValue from '../../components/check-value';

class RestaurantListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayDeleted: false,
            searchQuery: ''
        };
        this.displayDeleted = this.displayDeleted.bind(this);
        this.onSeachQueryChange = this.onSeachQueryChange.bind(this);
        this.navigateToNewRestaurant = () => props.navigate(`/secure/restaurant/${NEW_ID}`);
    }
    componentDidMount() {
        this.props.fetchRestaurants();
    }

    displayDeleted(e) {
        const displayDeleted = e.target.checked;
        this.setState({ displayDeleted }, () => this.props.fetchRestaurants({ status: displayDeleted ? STATUS_DELETED : STATUS_ACTIVE }));
    }

    onSeachQueryChange(e) {
        this.setState({ searchQuery: e.target.value });
    }

    renderRow(restaurant, navigate, deleteRestaurantAction) {
        const id = restaurant.get('id');

        return (
            <tr key={id} className="clickable" onClick={() => navigate(`/secure/restaurant/${id}`)}>
                <td>{restaurant.get('name')}</td>
                <td><CheckValue hasValue={restaurant.get('description')} /></td>
                <td><CheckValue hasValue={restaurant.getIn(['address', 'postcode']) && restaurant.getIn(['address', 'street'])} /></td>
                <td><CheckValue hasValue={!!restaurant.get('cuisines').size} /></td>
                <td><CheckValue hasValue={!!restaurant.get('tags').size} /></td>
                <td><CheckValue hasValue={restaurant.get('url')} /></td>
                <td><CheckValue hasValue={!!restaurant.get('photos').size} /></td>
                <td><CheckValue hasValue={restaurant.getIn(['address', 'latitude']) && restaurant.getIn(['address', 'longitude'])} /></td>
                <td>{restaurant.get('status')}</td>
                <td>
                    {restaurant.get('status') === STATUS_ACTIVE &&
                        <Button
                            bsSize="xs"
                            bsStyle="danger"
                            className="margin-right-05x margin-bottom-05x"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteRestaurantAction(id);
                            }}>
                            Delete
                        </Button>
                    }
                </td>
            </tr>
        );
    }

    renderRestaurants(restaurants, navigate, deleteRestaurantAction, displayDeleted, searchExpression) {
        if (restaurants) {
            const filteredRestaurants = searchExpression
                ? restaurants.filter(restaurant => matchesSomeFields(restaurant, splitSearchExpression(searchExpression), [
                    'name', 'address.postcode', 'address.suburb', 'address.city', 'address.street',
                    'url', 'tags', 'cuisines', 'description'
                ]
                ))
                : restaurants;
            return filteredRestaurants
                .filter(r => displayDeleted ? true : r.get('status') === STATUS_ACTIVE)
                .valueSeq()
                .map(r => this.renderRow(r, navigate, deleteRestaurantAction));
        }
    }

    render() {
        const { restaurants, navigate, deleteRestaurantAction } = this.props;
        return (
            <div className="padding-top-2x padding-bottom-2x">
                <MetaTag title="Manage restaurants" />

                <Row className="margin-bottom-1x margin-top-1x">
                    <Col sm={8}>
                        <FormControl
                            placeholder="Type in to filter.."
                            onChange={this.onSeachQueryChange} />
                    </Col>
                    <Col sm={4} className="margin-top-1x margin-top-0x-sm">
                        <Button bsStyle="primary" block onClick={this.navigateToNewRestaurant}>
                            <i className="fa fa-plus" /> Create Restaurant
                        </Button>
                    </Col>
                </Row>

                <h1 className="page-title">Restaurants</h1>


                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Cuisines</th>
                            <th>Tags</th>
                            <th>Web</th>
                            <th>Photos</th>
                            <th>Map</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRestaurants(restaurants, navigate, deleteRestaurantAction, this.state.displayDeleted, this.state.searchQuery)}
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
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListPage);