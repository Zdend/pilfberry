import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { generate } from 'shortid';

const createLink = (restaurantId, filename) => `/files/restaurants/${restaurantId}/${filename}`;
const makeTooltip = text => <Tooltip id={generate()}>{text}</Tooltip>;

export default ({ restaurantId, photos, deleteAction }) => {
    if (!photos || !photos.length) {
        return <div className="margin-top-2x">No photos uploaded yet.</div>;
    }
    return (
        <div>
            {photos.map(photo => (
                <div key={photo.filename} className="rs-photo img-thumbnail">
                    <img className="rs-photo__image" src={createLink(restaurantId, photo.filename)} />
                    <div className="rs-photo__btn-toolbar">
                        <OverlayTrigger placement="top" overlay={makeTooltip('Delete')}>
                            <i className="fa fa-remove text-danger rs-photo__btn" onClick={() => deleteAction(photo._id)} />
                        </OverlayTrigger>
                        <OverlayTrigger placement="top" overlay={makeTooltip('Edit type')}>
                            <i className="fa fa-pencil text-success rs-photo__btn" />
                        </OverlayTrigger>
                    </div>
                </div>
            ))}
        </div>
    );
};