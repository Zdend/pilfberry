import React, { Component } from 'react';
import { Tooltip, OverlayTrigger, FormControl } from 'react-bootstrap';
import { generate } from 'shortid';
import { PHOTO_TYPES } from '../../../shared/constants';
import { createPhotoLink } from '../services/util';

const makeTooltip = text => <Tooltip id={generate()}>{text}</Tooltip>;


class GalleryPhoto extends Component {
    constructor() {
        super();
        this.state = {
            isTypeEditing: false
        };
        this.toggleTypeEditing = this.toggleTypeEditing.bind(this);
    }
    toggleTypeEditing () {
        this.setState((prevState) => ({
            isTypeEditing: !prevState.isTypeEditing
        }));
    }
    render() {
        const { restaurantId, photos, photo, handleChange, deleteAction } = this.props;
        const { isTypeEditing } = this.state;
        return (
            <div key={photo.get('id')} className={`rs-photo ${isTypeEditing && 'rs-photo--editing'}`}>
                <div className="rs-photo__frame img-thumbnail">
                    <img className="rs-photo__image" src={createPhotoLink(restaurantId, photo.get('filename'))} />
                    <div className="rs-photo__btn-toolbar">
                        <OverlayTrigger placement="top" overlay={makeTooltip('Delete')}>
                            <i className="fa fa-remove text-danger rs-photo__btn" onClick={() => deleteAction(photo.get('id'))} />
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={makeTooltip('Edit type')}>
                            <i className="fa fa-pencil text-success rs-photo__btn" onClick={this.toggleTypeEditing} />
                        </OverlayTrigger>
                    </div>
                    {this.state.isTypeEditing && 
                        <FormControl className="margin-top-1x rs-photo__selector"
                            componentClass="select"
                            defaultValue={photo.get('photoType')}
                            onChange={handleChange(`photos.${photo.get('id')}.photoType`)}>
                            {PHOTO_TYPES.map(item => <option key={item} value={item}>{item}</option>)}
                        </FormControl>
                    }
                </div>
            </div>
        );
    }

}

export default ({ photos, handleTypeChange, ...rest }) => {
    if (!photos || !photos.size) {
        return <div className="margin-top-2x">No photos uploaded yet.</div>;
    }
    const handleChange = field => e => handleTypeChange(field, e);
    return (
        <div>
            {photos.valueSeq().map(photo => <GalleryPhoto key={photo.get('id')} {...{ ...rest, photo, handleChange }} />)}
        </div>
    );
};