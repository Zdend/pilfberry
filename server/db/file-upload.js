import { Restaurant, User } from './schema';
import { RESTAURANTS_PATH } from '../config';
import { generate } from 'shortid';
import { saveRestaurant } from './';

import formidable from 'formidable';

export function uploadPhotosToRestaurant(req, res) {
    const restaurantId = req.params.id;
    if (!restaurantId) {
        res.status(500);
        return;
    }
    const form = new formidable.IncomingForm();

    form.uploadDir = `${RESTAURANTS_PATH}/${restaurantId}`;

    form.parse(req);

    form.on('fileBegin', function (name, file) {
        file.path = file.name;
    });

    form.on('file', function (name, file) {

        saveRestaurant(restaurantId, { photos: [file.name] })
            .then(restaurant => res.json(restaurant))
            .catch(console.error);
        console.log('Uploaded ' + file.name);
    });
}