import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
    ButtonToolbar, ButtonGroup, Button, DropdownButton,
    MenuItem, InputGroup, FormControl,
    Row, Col, Grid
} from 'react-bootstrap';
import { fetchRestaurantsAction } from '../actions/restaurant-actions';
import { landingPageChangeFilter, landingPageTagChange } from '../actions/ui-actions';
import { getRestaurants, getLandingPageUI, getTagToggle } from '../reducers/selectors';
import RestaurantBlock from '../components/restaurant-block';
import RestaurantMap from '../components/restaurant-map';
import TagFilter from '../components/landing-tag-filter';
import { push } from 'react-router-redux';


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

    renderList(restaurants) {
        return restaurants ? <div>{restaurants.valueSeq().map(RestaurantBlock)}</div> : null;
    }

    render() {
        const { navigate, tagToggle, landingPageTagChange } = this.props;
        const { restaurants, searchExpression } = this.state;
        const matcher = new RegExp(searchExpression, 'i');
        const stringFilteredRestaurants = searchExpression
            ? restaurants.filter(restaurant => {
                return matcher.test(restaurant.get('address').postcode);
            })
            : restaurants;
        const activeTags = tagToggle.filter(item => item).keySeq().toJS();
        const filteredRestaurants = activeTags.length
            ? stringFilteredRestaurants.filter(restaurant => {
                return activeTags.some(tag => restaurant.get('tags').filter(item => item === tag).size);
            })
            : stringFilteredRestaurants;
        return (
            <div>
                <div className="hero">
                    <h1 className="hero-title">Eat without worries</h1>


                    <div className="text-align-center margin-top-5x">

                        <TagFilter tagToggle={tagToggle} onChange={landingPageTagChange} />

                        <Grid>
                            <Row>
                                <Col smOffset={2} sm={8} mdOffset={3} md={6}>

                                    <InputGroup className="margin-top-3x">
                                        <FormControl placeholder="Search restaurants by postcode" onChange={this.filterRestaurants} />
                                        <InputGroup.Button>
                                            <Button bsStyle="primary"><i className="fa fa-search" /></Button>
                                        </InputGroup.Button>
                                    </InputGroup>

                                    <h2 className="hero-subtitle"><span className="magra-bold">pilfberry</span> helps people with dietary preferences find their next meal</h2>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </div>


                <Grid className="margin-top-1x">
                    <Row>
                        <Col sm={12}>
                            <ButtonToolbar className="pull-right margin-top-1x-sm">
                                <ButtonGroup className="pull-none">
                                    <Button bsStyle="default" onClick={() => navigate('/map')}><i className="fa fa-map"></i></Button>
                                    <Button bsStyle="default" onClick={() => navigate('/list')}><i className="fa fa-list"></i></Button>
                                </ButtonGroup>
                            </ButtonToolbar>
                            <h4>We found {filteredRestaurants ? filteredRestaurants.size : 0} restaurants for you..</h4>
                        </Col>
                    </Row>
                </Grid>

                <div className="restaurant-list padding-bottom-3x padding-top-2x">
                    <div className="container">
                        <div className="row">
                            <Route exact path="/" render={() => this.renderList(filteredRestaurants)} />
                            <Route exact path="/list" render={() => this.renderList(filteredRestaurants)} />
                            <Route exact path="/map" render={() => <RestaurantMap restaurants={filteredRestaurants} />} />
                        </div>
                    </div>
                </div>



            </div>
        );
    }

    filterRestaurants(e) {
        const searchExpression = e.target.value;
        this.setState({ searchExpression });
    }
}

function mapStateToProps(state) {
    return {
        restaurants: getRestaurants(state),
        tagToggle: getTagToggle(state)
    };
}
const mapDispatchToProps = {
    fetchRestaurants: fetchRestaurantsAction.request,
    navigate: push,
    landingPageTagChange
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);