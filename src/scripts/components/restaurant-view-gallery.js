import React, { Component } from 'react';
import { PHOTO_TYPE } from '../../../shared/constants';
import { createPhotoLink } from '../services/util';
import Lightbox from 'react-images';

export default class RestaurantViewGallery extends Component {
    constructor() {
        super();
        this.state = {
            lightboxIsOpen: false,
            currentImage: 0
        };
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
    }

    closeLightbox() {
        this.setState({ lightboxIsOpen: false });
    }

    openLightbox(picturePosition) {
        this.setState({ lightboxIsOpen: true, currentImage: picturePosition });
    }

    gotoPrevious() {
        this.setState(prevState => ({ currentImage: prevState.currentImage - 1 }));
    }

    gotoNext() {
        this.setState(prevState => ({ currentImage: prevState.currentImage + 1 }));
    }

    getGalleryPhotos(restaurant) {
        return restaurant.get('photos')
            .filter(photo => photo.get('photoType') === PHOTO_TYPE.GALLERY)
            .valueSeq()
            .map(photo => ({ src: createPhotoLink(restaurant.get('id'), photo.get('filename')) }))
            .toJS();
    }

    renderGalleryPhotos(restaurant) {
        return restaurant.get('photos')
            .filter(photo => photo.get('photoType') === PHOTO_TYPE.GALLERY)
            .valueSeq()
            .map((photo, index) => {
                return <div key={photo.get('id')}
                    className="restaurant-page__gallery-pic"
                    onClick={() => this.openLightbox(index)}
                    style={{ backgroundImage: `url('${createPhotoLink(restaurant.get('id'), photo.get('filename'))}')` }}
                />;
            });

    }
    hasGallery(restaurant) {
        return !!restaurant.get('photos').filter(photo => photo.get('photoType') === PHOTO_TYPE.GALLERY).size;
    }

    render() {
        const { restaurant } = this.props;
        if (!this.hasGallery(restaurant)) {
            return null;
        }

        return (
            <fieldset>
                <legend>Gallery</legend>
                <Lightbox
                    images={this.getGalleryPhotos(restaurant)}
                    isOpen={this.state.lightboxIsOpen}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    onClose={this.closeLightbox}
                    currentImage={this.state.currentImage}
                />
                <div className="restaurant-page__gallery">
                    {this.renderGalleryPhotos(restaurant)}
                </div>
            </fieldset>
        );
    }

}