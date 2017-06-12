import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
    ButtonToolbar, ButtonGroup, Button, DropdownButton,
    MenuItem, InputGroup, FormControl,
    Row, Col, Grid
} from 'react-bootstrap';
import { fetchRestaurantsAction } from '../actions/restaurant-actions';
import { landingPageTagChange, updateLocationAction } from '../actions/ui-actions';
import { getRestaurants, getLandingPageUI, getTagToggle, getCurrentLocation } from '../reducers/selectors';
import RestaurantBlock from '../components/restaurant-block';
import RestaurantMap from '../components/restaurant-map';
import TagFilter from '../components/landing-tag-filter';
import { push } from 'react-router-redux';
import throttle from '../../../shared/throttle';
import { matchesSomeFields } from '../services/util';


class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.fetchRestaurants = props.fetchRestaurants;
        this.filterRestaurants = this.filterRestaurants.bind(this);
        this.state = {
            restaurants: props.restaurants,
            searchExpression: ''
        };
        this.handleScroll = throttle(this.handleScroll.bind(this), 100);
    }

    handleScroll(e) {
        this.title.className = `hero-title animated ${window.scrollY > 100 ? 'fadeOutUp' : 'fadeInDown'}`;
    }

    componentDidMount() {
        this.fetchRestaurants();
        window.addEventListener('scroll', this.handleScroll);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            restaurants: nextProps.restaurants
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    renderList(restaurants, navigate) {
        return restaurants
            ? <div>{restaurants.valueSeq().map(r => <RestaurantBlock restaurant={r} navigate={navigate} key={r.get('id')} />)}</div>
            : null;
    }

    render() {
        const { navigate, tagToggle, landingPageTagChange } = this.props;
        const { restaurants, searchExpression } = this.state;
        const stringFilteredRestaurants = searchExpression
            ? restaurants.filter(restaurant => matchesSomeFields(restaurant, searchExpression, [
                'name', 'address.postcode', 'address.suburb', 'address.city', 'address.street',
                'url', 'tags', 'cuisines', 'description'
            ]))
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
                    <h1 className="hero-title animated fadeInDown" ref={ref => this.title = ref}>Eat without worries</h1>

                    <div className="text-align-center margin-top-5x">

                        <TagFilter tagToggle={tagToggle} onChange={landingPageTagChange} />

                        <Grid>
                            <Row>
                                <Col smOffset={2} sm={8} mdOffset={3} md={6}>

                                    <InputGroup className="margin-top-3x">
                                        <FormControl placeholder="Filter restaurants by address, name or dieatary" onChange={this.filterRestaurants} />
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
                            <Route exact path="/" render={() => this.renderList(filteredRestaurants, navigate)} />
                            <Route exact path="/list" render={() => this.renderList(filteredRestaurants, navigate)} />
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
        tagToggle: getTagToggle(state),
        currentLocation: getCurrentLocation(state)
    };
}
const mapDispatchToProps = {
    fetchRestaurants: fetchRestaurantsAction.request,
    navigate: push,
    landingPageTagChange,
    updateLocationAction
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);