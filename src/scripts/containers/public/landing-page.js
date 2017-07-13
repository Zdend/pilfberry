import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { generate } from 'shortid';
import {
    ButtonToolbar, ButtonGroup, Button, OverlayTrigger, Tooltip,
    Row, Col, Grid
} from 'react-bootstrap';
import { push } from 'react-router-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { fetchRestaurantsAction } from '../../actions/restaurant-actions';
import { landingPageChangeFilter, toggleClosestFirst, checkCurrentLocationAction } from '../../actions/ui-actions';
import { getRestaurants, getClosestFirst, getSearchExpressions, getCurrentLocation } from '../../reducers/selectors';
import RestaurantBlock from '../../components/restaurant-block';
import RestaurantMap from '../../components/restaurant-map';
import TagFilter from '../../components/landing-tag-filter';
import SearchBox from '../../components/landing-search';
import throttle from '../../../../shared/throttle';
import { matchesSomeFieldsAnd, getDistanceFromLatLonInKm } from '../../services/util';
import { SpinnerInline } from '../../components/spinner';
import MetaTag from '../../components/structure/meta';

function sortByDistance(restaurants, currentLocation) {
    if (!currentLocation.get('lat') || !currentLocation.get('lng')) {
        return restaurants;
    }
    return restaurants.sort((r1, r2) => {
        const d1 = getDistanceFromLatLonInKm(r1.getIn(['address', 'latitude']), r1.getIn(['address', 'longitude']), currentLocation.get('lat'), currentLocation.get('lng'));
        const d2 = getDistanceFromLatLonInKm(r2.getIn(['address', 'latitude']), r2.getIn(['address', 'longitude']), currentLocation.get('lat'), currentLocation.get('lng'));
        if (d1 === d2) return 0;
        return !d2 || d1 < d2 ? -1 : 1;
    });
}

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.fetchRestaurants = props.fetchRestaurants;
        this.state = {
            restaurants: props.restaurants
        };
        this.handleScroll = throttle(this.handleScroll.bind(this), 100);
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

    filterRestaurants(restaurants, currentLocation, closestFirst, searchExpressions) {
        const stringFilteredRestaurants = searchExpressions.size
            ? restaurants.filter(restaurant => matchesSomeFieldsAnd(restaurant, searchExpressions, [
                'name', 'address.postcode', 'address.suburb', 'address.city', 'address.street',
                'url', 'tags', 'cuisines', 'description'
            ]))
            : restaurants;
        return closestFirst
            ? sortByDistance(stringFilteredRestaurants, currentLocation)
            : stringFilteredRestaurants;
    }

    renderList(restaurants, navigate, currentLocation) {
        return restaurants
            ? <div>{restaurants.valueSeq().map(r => <RestaurantBlock restaurant={r} navigate={navigate} key={r.get('id')} currentLocation={currentLocation} />)}</div>
            : null;
    }

    render() {
        const { navigate, currentLocation, searchExpressions, closestFirst, landingPageChangeFilter, toggleClosestFirst } = this.props;
        const { restaurants } = this.state;

        const filteredRestaurants = this.filterRestaurants(restaurants, currentLocation, closestFirst, searchExpressions);
        return (
            <div>
                <MetaTag />

                <div className="hero">
                    <h1 className="hero-title animated fadeInDown" ref={ref => this.title = ref}>Eat without worries</h1>

                    <div className="text-align-center margin-top-5x">

                        <TagFilter
                            handleSearch={landingPageChangeFilter}
                            searchExpressions={searchExpressions} />

                        <Grid>
                            <Row>
                                <Col smOffset={2} sm={8} mdOffset={3} md={6}>
                                    <SearchBox handleSearch={landingPageChangeFilter}
                                        values={searchExpressions}
                                        restaurants={filteredRestaurants}
                                    />

                                    <h2 className="hero-subtitle"><span className="spartan-bold">pilfberry</span> helps people with dietary preferences find their next meal</h2>
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
                                        <Button bsStyle="link" onClick={toggleClosestFirst} active={closestFirst}>
                                            <i className="fa fa-sort-amount-asc" />
                                        </Button>
                                    </OverlayTrigger>
                                }
                                <ButtonGroup className="pull-none">
                                    <OverlayTrigger placement="top" overlay={<Tooltip id={generate()}>Display map</Tooltip>}>
                                        <LinkContainer to="/map"><Button bsStyle="default"><i className="fa fa-map"></i></Button></LinkContainer>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={<Tooltip id={generate()}>Display list</Tooltip>}>
                                        <LinkContainer to="/list"><Button bsStyle="default"><i className="fa fa-list"></i></Button></LinkContainer>
                                    </OverlayTrigger>
                                </ButtonGroup>
                            </ButtonToolbar>
                            {!restaurants.size
                                ? <h4><SpinnerInline text="Loading restaurants.." /></h4>
                                : <h4>We found {filteredRestaurants ? filteredRestaurants.size : 0} restaurants for you..</h4>
                            }
                        </Col>
                    </Row>
                </Grid>

                <div className="restaurant-list padding-bottom-3x padding-top-2x">
                    <div className="container">
                        <div className="row">
                            <Route exact path="/" render={() => this.renderList(filteredRestaurants, navigate, currentLocation, closestFirst, searchExpressions)} />
                            <Route exact path="/list" render={() => this.renderList(filteredRestaurants, navigate, currentLocation, closestFirst, searchExpressions)} />
                            <Route exact path="/map" render={() => <RestaurantMap restaurants={filteredRestaurants} currentLocation={currentLocation} />} />
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
        currentLocation: getCurrentLocation(state),
        closestFirst: getClosestFirst(state),
        searchExpressions: getSearchExpressions(state)
    };
}
const mapDispatchToProps = {
    fetchRestaurants: fetchRestaurantsAction.request,
    navigate: push,
    checkCurrentLocationAction,
    toggleClosestFirst,
    landingPageChangeFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);