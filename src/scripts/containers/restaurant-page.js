import React, { Component } from 'react';
import { fetchRestaurantAction } from '../actions/restaurant-actions';
import { getRestaurantByPath } from '../reducers/selectors';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { findFirstAvatarPicture, findFirstCoverPicture, getHumanAddress, hashCode } from '../services/util';
import { SpinnerInline } from '../components/spinner';
import RestaurantTag from '../components/restaurant-tag';
import { Link } from 'react-router-dom';
import RestaurantViewGallery from '../components/restaurant-view-gallery';
import RestaurantViewMap from '../components/restaurant-view-map';
import { DEFAULT_AVATAR_COLOURS } from '../../../shared/constants/colours';
import Helmet from 'react-helmet';

const AvatarPhoto = ({ coverPhotoURL, avatarURL, name }) => {
    if (avatarURL) {
        return (
            <div className={`restaurant-page__avatar ${coverPhotoURL && 'hidden-xs'}`}>
                <div className="restaurant-page__avatar-pic" style={{ backgroundImage: `url('${avatarURL}')` }} />
            </div>
        );
    }
    const hash = hashCode(name);
    const randomIndex = `${hash}`.split('').find(number => number >= 0 && number < DEFAULT_AVATAR_COLOURS.length);
    const randomCoulour = DEFAULT_AVATAR_COLOURS[parseInt(randomIndex, 10)];

    return (
        <div className={`restaurant-page__avatar ${coverPhotoURL && 'hidden-xs'}`}>
            <div className="restaurant-page__avatar-empty" style={{ backgroundColor: randomCoulour }}>
                <span className="restaurant-page__empty-letter">
                    {name.trim().slice(0, 1).toUpperCase()}
                </span>
            </div>

        </div>
    );
};

const ZeroPanel = () => <span>We are working on the missing content. Help us by <a href="mailto:contact@pilfberry.com">sending us</a> details for your restaurant!</span>

class RestaurantPage extends Component {
    componentDidMount() {
        const { match: { params: { path } }, fetchRestaurant, restaurant } = this.props;
        if (!restaurant || !restaurant.get('id')) {
            fetchRestaurant({ path });
        }
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
                <Helmet>
                    <title>Pilfberry - {restaurant.get('name')}</title>
                    <meta name="description" content={`${restaurant.get('description') ? restaurant.get('description') : restaurant.get('name') + ' serves meals for people with special dietary requirements'}`} />
                    <meta name="keywords" content={`${restaurant.get('name')},${restaurant.getIn(['address', 'suburb']) ? restaurant.getIn(['address', 'suburb']) + ',' : ''}diet,${restaurant.getIn(['address', 'street']) ? restaurant.getIn(['address', 'street']) + ',' : ''}${restaurant.getIn(['address', 'postcode']) ? restaurant.getIn(['address', 'postcode']) + ',' : ''}vegetarian,gluten free,restaurant,healthy food sydney`} />
                </Helmet>
                {coverPhotoURL &&
                    <div className="restaurant-page__cover" style={{ backgroundImage: `url('${coverPhotoURL}')` }}>
                        <h1 className="restaurant-page__cover-title">{restaurant.get('name')}</h1>
                    </div>
                }
                <Grid>
                    <Row>
                        <Col sm={12} className="padding-top-2x padding-bottom-2x">
                            <AvatarPhoto avatarURL={avatarURL} coverPhotoURL={coverPhotoURL} name={restaurant.get('name')} />
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
                            <p className="margin-top-2x">{restaurant.get('description') ? restaurant.get('description') : <ZeroPanel />}</p>

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
    const { match: { params: { path } } } = props;
    return {
        restaurant: getRestaurantByPath(path)(state)
    };
}
const mapDispatchToProps = {
    fetchRestaurant: fetchRestaurantAction.request
};
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantPage);