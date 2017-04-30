import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {ButtonToolbar, ButtonGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import {fetchRestaurantsAction} from '../actions/restaurant-actions';
import {getRestaurants} from '../reducers/selectors';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.fetchRestaurants = props.fetchRestaurants;
    }
    componentDidMount() {
        console.log('asdasd');
        this.fetchRestaurants();
    }

    render () {
        const {restaurants} = this.props;
        return (
            <div className="">
                <div className="hero">
                    <h1 className="hero-title">Eat without worries</h1>



                    <div className="text-align-center margin-top-5x">
                        <ButtonToolbar>
                            <ButtonGroup bsSize="large" className="pull-none">
                                <Button bsStyle="primary">Vegan</Button>
                                <Button bsStyle="primary">Vegetarian</Button>
                                <Button bsStyle="primary">Gluten Free</Button>
                                <Button bsStyle="primary">Pregnant Friendly</Button>
                                <DropdownButton bsSize="large" title={<span><i className="fa fa-ellipsis-h" /> More</span>} id="bg-justified-dropdown" bsStyle="primary">
                                    <MenuItem eventKey="1">Dairy Free</MenuItem>
                                    <MenuItem eventKey="2">Nut Free</MenuItem>
                                </DropdownButton>
                            </ButtonGroup>
                        </ButtonToolbar>

                    </div>
                </div>


                <div className="restaurant-list padding-bottom-3x padding-top-3x">
                    <div className="container">
                        <div className="row">
                            {restaurants && restaurants.valueSeq().map(restaurant => (
                                <div className="col-sm-6">
                                    <div className="bg-primary padding-1x margin-1x" key={restaurant.get('id')}>{restaurant.get('name')}</div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

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
    fetchRestaurants: fetchRestaurantsAction.request
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);