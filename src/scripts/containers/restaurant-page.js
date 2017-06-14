import React, { Component } from 'react';
import { fetchRestaurantAction } from '../actions/restaurant-actions';
import { getRestaurant } from '../reducers/selectors';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { findFirstAvatarPicture, findFirstCoverPicture, getHumanAddress } from '../services/util';
import { SpinnerInline } from '../components/spinner';
import RestaurantTag from '../components/restaurant-tag';
import { Link } from 'react-router-dom';
import RestaurantViewGallery from '../components/restaurant-view-gallery';
import RestaurantViewMap from '../components/restaurant-view-map';


class RestaurantPage extends Component {
    componentDidMount() {
        const { match: { params: { id } }, fetchRestaurant } = this.props;
        fetchRestaurant(id);
    }

    render() {
        const { restaurant } = this.props;
        if (!restaurant) {
            return (<Grid><Row><Col sm={12} className="padding-top-2x padding-bottom-2x"><SpinnerInline /></Col></Row></Grid>);
        }

        const avatarURL = findFirstAvatarPicture(restaurant);
        const coverPhotoURL = findFirstCoverPicture(restaurant);
        return (
            <div>
                {coverPhotoURL &&
                    <div className="restaurant-page__cover" style={{ backgroundImage: `url('${coverPhotoURL}')` }}>
                        <h1 className="restaurant-page__cover-title">{restaurant.get('name')}</h1>
                    </div>
                }
                <Grid>
                    <Row>
                        <Col sm={12} className="padding-top-2x padding-bottom-2x">
                            {avatarURL && <div className={`restaurant-page__avatar img-thumbnail ${coverPhotoURL && 'hidden-xs'}`}><div className="restaurant-page__avatar-pic" style={{ backgroundImage: `url('${avatarURL}')` }} /></div>}
                            <h1 className="margin-top-0x">{restaurant.get('name')}</h1>
                            <div>
                                {restaurant.get('tags').map(item => <RestaurantTag key={item} tag={item} />)}
                                {restaurant.get('cuisines').map(item => <RestaurantTag key={item} tag={item} type="info" />)}
                            </div>

                            <div className="margin-top-2x">
                                <div className="visible-xs-block visible-sm-inline-block visible-md-inline-block visible-lg-inline-block">{getHumanAddress(restaurant)}</div>
                                <RestaurantViewMap address={restaurant.get('address')} />
                            </div>
                            <div><a href={restaurant.get('url')} target="_blank">{restaurant.get('url')}</a></div>
                            <p className="margin-top-2x">{restaurant.get('description')}</p>

                            <div className="clearfix" />

                            <RestaurantViewGallery restaurant={restaurant} />

                            <div className="margin-top-2x"><Link to="/"><i className="fa fa-chevron-left margin-right-05x" /> Back</Link></div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const { match: { params: { id } } } = props;
    return {
        restaurant: getRestaurant(id)(state)
    };
}
const mapDispatchToProps = {
    fetchRestaurant: fetchRestaurantAction.request
};
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);