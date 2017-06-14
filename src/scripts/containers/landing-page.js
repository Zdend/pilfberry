import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { generate } from 'shortid';
import {
    ButtonToolbar, ButtonGroup, Button, DropdownButton,
    MenuItem, InputGroup, FormControl, OverlayTrigger, Tooltip,
    Row, Col, Grid
} from 'react-bootstrap';
import { fetchRestaurantsAction } from '../actions/restaurant-actions';
import { landingPageTagChange, checkCurrentLocationAction } from '../actions/ui-actions';
import { getRestaurants, getLandingPageUI, getTagToggle, getCurrentLocation } from '../reducers/selectors';
import RestaurantBlock from '../components/restaurant-block';
import RestaurantMap from '../components/restaurant-map';
import TagFilter from '../components/landing-tag-filter';
import SearchBox from '../components/landing-search';
import { push } from 'react-router-redux';
import throttle from '../../../shared/throttle';
import { matchesSomeFields, getDistanceFromLatLonInKm } from '../services/util';

function sortByDistance(restaurants, currentLocation) {
    if (!currentLocation.get('lat') || !currentLocation.get('lng')) {
        return restaurants;
    }
    return restaurants.sort((r1, r2) => {
        const d1 = getDistanceFromLatLonInKm(r1.getIn(['address', 'latitude']), r1.getIn(['address', 'longitude']), currentLocation.get('lat'), currentLocation.get('lng'));
        const d2 = getDistanceFromLatLonInKm(r2.getIn(['address', 'latitude']), r2.getIn(['address', 'longitude']), currentLocation.get('lat'), currentLocation.get('lng'));
        if (d1 === d2) return 0;
        return d1 < d2 ? -1 : 1;
    });
}

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.fetchRestaurants = props.fetchRestaurants;
        this.filterRestaurants = this.filterRestaurants.bind(this);
        this.state = {
            restaurants: props.restaurants,
            searchExpressions: [],
            closestFirst: false
        };
        this.handleScroll = throttle(this.handleScroll.bind(this), 100);
        this.toggleSortByDistance = this.toggleSortByDistance.bind(this);
    }

    handleScroll(e) {
        this.title.className = `hero-title animated ${window.scrollY > 100 ? 'fadeOutUp' : 'fadeInDown'}`;
    }

    componentDidMount() {
        this.fetchRestaurants();
        window.addEventListener('scroll', this.handleScroll);
        this.props.checkCurrentLocationAction();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            restaurants: nextProps.restaurants
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    toggleSortByDistance() {
        this.setState(state => ({ closestFirst: !state.closestFirst }));
    }

    filterRestaurants(values) {
        this.setState({ searchExpressions: values });
    }

    renderList(restaurants, navigate, currentLocation) {
        return restaurants
            ? <div>{restaurants.valueSeq().map(r => <RestaurantBlock restaurant={r} navigate={navigate} key={r.get('id')} currentLocation={currentLocation} />)}</div>
            : null;
    }

    render() {
        const { navigate, tagToggle, landingPageTagChange, currentLocation } = this.props;
        const { restaurants, searchExpressions, closestFirst } = this.state;
        const stringFilteredRestaurants = searchExpressions && searchExpressions.length
            ? restaurants.filter(restaurant => matchesSomeFields(restaurant, searchExpressions, [
                'name', 'address.postcode', 'address.suburb', 'address.city', 'address.street',
                'url', 'tags', 'cuisines', 'description'
            ]))
            : restaurants;
        const activeTags = tagToggle.filter(item => item).keySeq().toJS();
        const filteredRestaurantsByTag = activeTags.length
            ? stringFilteredRestaurants.filter(restaurant => {
                return activeTags.some(tag => restaurant.get('tags').filter(item => item === tag).size);
            })
            : stringFilteredRestaurants;
        const filteredRestaurants = closestFirst
            ? sortByDistance(filteredRestaurantsByTag, currentLocation)
            : filteredRestaurantsByTag;
        return (
            <div>
                <div className="hero">
                    <h1 className="hero-title animated fadeInDown" ref={ref => this.title = ref}>Eat without worries</h1>

                    <div className="text-align-center margin-top-5x">

                        <TagFilter tagToggle={tagToggle} onChange={landingPageTagChange} />

                        <Grid>
                            <Row>
                                <Col smOffset={2} sm={8} mdOffset={3} md={6}>
                                    <SearchBox handleSearch={this.filterRestaurants} tags={searchExpressions} />

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
                                {currentLocation.get('lat') && currentLocation.get('lng') &&
                                    <OverlayTrigger placement="top" overlay={<Tooltip id={generate()}>Sort by closest</Tooltip>}>
                                        <Button bsStyle="link" onClick={this.toggleSortByDistance} active={closestFirst}>
                                            <i className="fa fa-sort-amount-asc" />
                                        </Button>
                                    </OverlayTrigger>
                                }
                                <ButtonGroup className="pull-none">
                                    <OverlayTrigger placement="top" overlay={<Tooltip id={generate()}>Display map</Tooltip>}>
                                        <Button bsStyle="default" onClick={() => navigate('/map')}><i className="fa fa-map"></i></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={<Tooltip id={generate()}>Display list</Tooltip>}>
                                        <Button bsStyle="default" onClick={() => navigate('/list')}><i className="fa fa-list"></i></Button>
                                    </OverlayTrigger>
                                </ButtonGroup>
                            </ButtonToolbar>
                            <h4>We found {filteredRestaurants ? filteredRestaurants.size : 0} restaurants for you..</h4>
                        </Col>
                    </Row>
                </Grid>

                <div className="restaurant-list padding-bottom-3x padding-top-2x">
                    <div className="container">
                        <div className="row">
                            <Route exact path="/" render={() => this.renderList(filteredRestaurants, navigate, currentLocation)} />
                            <Route exact path="/list" render={() => this.renderList(filteredRestaurants, navigate, currentLocation)} />
                            <Route exact path="/map" render={() => <RestaurantMap restaurants={filteredRestaurants} />} />
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        restaurants: getRestaurants(state),
        tagToggle: getTagToggle(state),
        currentLocation: getCurrentLocation(state)
    };
}
const mapDispatchToProps = {
    fetchRestaurants: fetchRestaurantsAction.request,
    navigate: push,
    landingPageTagChange,
    checkCurrentLocationAction
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);