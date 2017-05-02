import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    ButtonToolbar, ButtonGroup, Button, DropdownButton,
    MenuItem, InputGroup, FormControl,
    Row, Col, Grid
} from 'react-bootstrap';
import {fetchRestaurantsAction} from '../actions/restaurant-actions';
import {getRestaurants} from '../reducers/selectors';
import RestaurantBlock from '../components/restaurant-block';
import {OrderedMap} from 'immutable';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.fetchRestaurants = props.fetchRestaurants;
        this.filterRestaurants = this.filterRestaurants.bind(this);
        this.state = {
            restaurants: props.restaurants,
            searchExpression: ''
        };
    }

    componentDidMount() {
        this.fetchRestaurants();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            restaurants: nextProps.restaurants
        });
    }


    render() {
        const {restaurants, searchExpression} = this.state;
        const matcher = new RegExp(searchExpression, 'i');
        const filteredRestaurants = searchExpression
            ? restaurants.filter(restaurant => {
                return matcher.test(restaurant.get('address').postcode);
            })
            : restaurants;
        return (
            <div className="">
                <div className="hero">
                    <h1 className="hero-title">Eat without worries</h1>


                    <div className="text-align-center margin-top-5x">
                        <Grid>
                            <Row>
                                <Col smOffset={2} sm={8} mdOffset={3} md={6}>
                                    <ButtonToolbar>
                                        <ButtonGroup className="pull-none">
                                            <Button bsStyle="primary">Vegan</Button>
                                            <Button bsStyle="primary">Vegetarian</Button>
                                            <Button bsStyle="primary">Gluten Free</Button>
                                            <Button bsStyle="primary">Pregnant Friendly</Button>
                                            <DropdownButton title={<span><i className="fa fa-ellipsis-h"/> More</span>}
                                                            id="bg-justified-dropdown" bsStyle="primary">
                                                <MenuItem eventKey="1">Dairy Free</MenuItem>
                                                <MenuItem eventKey="2">Nut Free</MenuItem>
                                            </DropdownButton>
                                        </ButtonGroup>
                                    </ButtonToolbar>


                                    <InputGroup className="margin-top-3x">
                                        <FormControl placeholder="Search restaurants by postcode" onChange={this.filterRestaurants}/>
                                        <InputGroup.Button>
                                            <Button bsStyle="primary"><i className="fa fa-search"/></Button>
                                        </InputGroup.Button>
                                    </InputGroup>

                                    <h2 className="hero-subtitle">Pilfberry helps people with dietary preferences find their next meal</h2>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>


                <div className="restaurant-list padding-bottom-3x padding-top-3x">
                    <div className="container">
                        <div className="row">
                            {filteredRestaurants && filteredRestaurants.valueSeq().map(RestaurantBlock)}
                        </div>

                    </div>

                </div>

            </div>
        );
    }

    filterRestaurants(e) {
        const searchExpression = e.target.value;
        this.setState({searchExpression});
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