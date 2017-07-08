import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { push } from 'react-router-redux';
import { words } from 'capitalize';
import { Link } from 'react-router-dom';
import MetaTag from '../../components/structure/meta';
import { fetchRestaurantsBySuburbAction } from '../../actions/restaurant-actions';
import { getRestaurantsBySuburb, getCurrentLocation } from '../../reducers/selectors';
import RestaurantBlock from '../../components/restaurant-block';
import { SpinnerInline } from '../../components/spinner';

class SuburbPage extends Component {
    componentDidMount() {
        const { match: { params: { area } }, restaurants, fetchRestaurants } = this.props;
        fetchRestaurants(area);
    }

    componentWillReceiveProps(nextProps) {
        const { match: { params: { area } }, fetchRestaurants } = nextProps;
        if (nextProps.match.params.area !== this.props.match.params.area) {
            fetchRestaurants(area);
        }
    }

    render() {
        const { restaurants, navigate, currentLocation, match: { params: { area } } } = this.props;
        const suburb = words(area.replace('-', ' '));
        return (
            <Grid>
                <MetaTag title={`Restaurants in ${suburb}`}
                    description={`Healthy restaurants in ${suburb}`}
                    keywords={`vegetarian restaurants ${suburb}, gluten free restaurants ${suburb}, vegan restaurants ${suburb}`}
                />
                <Row>
                    <Col sm={12}>
                        <h1>Restaurants in {suburb}</h1>
                        {restaurants
                            ? <Row>{restaurants.valueSeq().map(r => <RestaurantBlock restaurant={r} navigate={navigate} key={r.get('id')} currentLocation={currentLocation} />)}</Row>
                            : <SpinnerInline />
                        }

                        <div className="margin-top-2x margin-bottom-2x"><Link to="/areas"><i className="fa fa-chevron-left margin-right-05x" /> Back</Link></div>
                    </Col>
                </Row>
            </Grid>

        );
    }

}


const mapStateToProps = (state, props) => {
    const { match: { params: { area } } } = props;
    return {
        restaurants: getRestaurantsBySuburb(area)(state),
        currentLocation: getCurrentLocation(state)
    };
};


export default connect(mapStateToProps, {
    fetchRestaurants: fetchRestaurantsBySuburbAction.request,
    navigate: push
})(SuburbPage);