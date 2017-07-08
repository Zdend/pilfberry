import React, { Component } from 'react';
import { fetchRestaurantAction } from '../actions/restaurant-actions';
import { getRestaurantByPath } from '../reducers/selectors';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { findFirstAvatarPicture, findFirstCoverPicture, getHumanAddress, hashCode } from '../services/util';
import { SpinnerInline } from '../components/spinner';
import RestaurantTag from '../components/restaurant-tag';
import { Link } from 'react-router-dom';
import RestaurantViewGallery from '../components/restaurant-view-gallery';
import RestaurantViewMap from '../components/restaurant-view-map';
import { DEFAULT_AVATAR_COLOURS } from '../../../shared/constants/colours';
import { HOSTNAME } from '../../../shared/constants';
import MetaTag from '../components/structure/meta';
import { convertText, getBlockStyle, convertToPlainText } from '../services/rich-utils';
import { Editor } from 'draft-js';
import { generate } from 'shortid';
import FBShareButton from '../components/fb-share-button';

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
const priceRange = (priceLevel) => {
    switch (priceLevel) {
        case 1: return 'Less than $15';
        case 2: return '$10 - $20';
        case 3: return '$15 - $30';
        case 4: return '$30+';
        default: return 'Not Available';
    }
}
const PriceIndicator = ({ priceLevel }) => {
    return (
        <OverlayTrigger placement="top" overlay={<Tooltip id={generate()}>{priceRange(priceLevel)}</Tooltip>}>
            <small>{[...Array(priceLevel)].map(() => <i key={generate()} className="fa fa-dollar" />)}</small>
        </OverlayTrigger>
    );
};

const ZeroPanel = () => <span>We are working on the missing content. Help us by <a href="mailto:contact@pilfberry.com">sending us</a> details for your restaurant!</span>;
const OptionalIconValue = ({ value, icon, children, className }) => (value ? <div className={className}><i className={`fa fa-${icon} width-1r margin-right-1x text-muted`} /> {children ? children : value}</div> : null);
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

        const plainTextDescription = convertToPlainText(restaurant.get('description')).replace(/[\n\r]/g, '');
        const avatarURL = findFirstAvatarPicture(restaurant);
        const coverPhotoURL = findFirstCoverPicture(restaurant);
        const shareURL = `${HOSTNAME}/${restaurant.get('path')}`;
        const restaurantDescription = plainTextDescription && plainTextDescription.length > 20 ? plainTextDescription.substr(0, 250) : `${restaurant.get('name')} serves meals for people with special dietary requirements`;
        return (
            <div>
                <MetaTag title={`${restaurant.get('name')}${restaurant.getIn(['address', 'suburb']) ? ', ' + restaurant.getIn(['address', 'suburb']) : ''}`}
                    description={restaurantDescription}
                    keywords={[
                        restaurant.get('name'),
                        `${restaurant.getIn(['address', 'suburb']) ? 'restaurants in ' + restaurant.getIn(['address', 'suburb']) : ''}`,
                        `${restaurant.getIn(['address', 'street']) ? 'restaurants in ' + restaurant.getIn(['address', 'street']) : ''}`,
                        `${restaurant.getIn(['address', 'postcode']) ? 'restaurants in ' + restaurant.getIn(['address', 'postcode']) : ''}`,
                    ].filter(keyword => keyword && keyword.trim()).join(',')}
                    social
                    url={shareURL}
                />
                {coverPhotoURL &&
                    <div className="restaurant-page__cover" style={{ backgroundImage: `url('${coverPhotoURL}')` }}>
                        <h1 className="restaurant-page__cover-title">{restaurant.get('name')}</h1>
                    </div>
                }
                <Grid>
                    <Row>
                        <Col sm={12} className="padding-top-2x padding-bottom-2x">
                            <AvatarPhoto avatarURL={avatarURL} coverPhotoURL={coverPhotoURL} name={restaurant.get('name')} />
                            <h1 className="margin-top-0x">
                                {restaurant.get('name')} {restaurant.get('price') && <PriceIndicator priceLevel={restaurant.get('price')} />}
                            </h1>
                            <ul className="restaurant-block__labels list-unstyled list-inline list-inline-compact">
                                {restaurant.get('tags').map(item => <li key={item}><RestaurantTag key={item} tag={item} /></li>)}
                                {restaurant.get('cuisines').map(item => <li key={item}><RestaurantTag key={item} tag={item} type="info" /></li>)}
                            </ul>

                            <OptionalIconValue value={getHumanAddress(restaurant)} icon="map-marker" className="margin-top-2x">
                                <span>{getHumanAddress(restaurant)}</span>
                                <RestaurantViewMap address={restaurant.get('address')} />
                            </OptionalIconValue>
                            <OptionalIconValue value={restaurant.get('url')} icon="globe"><a href={restaurant.get('url')} target="_blank">{restaurant.get('url')}</a></OptionalIconValue>
                            <OptionalIconValue value={restaurant.get('phoneNumber')} icon="phone"><a href={`tel:${restaurant.get('phoneNumber')}`}>{restaurant.get('phoneNumber')}</a></OptionalIconValue>
                            <OptionalIconValue value={restaurant.get('email')} icon="envelope"><a href={`mailto:${restaurant.get('email')}`}>{restaurant.get('email')}</a></OptionalIconValue>


                            <div className="margin-top-2x">
                                {restaurant.get('description')
                                    ? <Editor blockStyleFn={getBlockStyle}
                                        readOnly
                                        editorState={convertText(restaurant.get('description'))} />
                                    : <ZeroPanel />
                                }
                            </div>

                            <div className="clearfix" />

                            <RestaurantViewGallery restaurant={restaurant} />

                            <FBShareButton url={shareURL} description={restaurantDescription} className="margin-top-1x" />

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