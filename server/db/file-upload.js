import { Restaurant, User } from './schema';
import { RESTAURANTS_PATH, ROOT_PATH } from '../config';
import { generate } from 'shortid';
import { saveRestaurant } from './';
import mkdirp from 'mkdirp';
import fs from 'fs';

import formidable from 'formidable';

export function uploadPhotosToRestaurant(req, res) {
    const restaurantId = req.params.id;
    if (!restaurantId) {
        res.status(500);
        return;
    }
    const form = new formidable.IncomingForm();

    const path = `${RESTAURANTS_PATH}/${restaurantId}`;
    mkdirp(path);

    form.uploadDir = path;
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.keepExtensions = true;

    form.parse(req);

    form.on('file', function (name, file) {
        const filename = `${generate()}.${getExtension(file.name)}`;
        fs.rename(`${file.path}`, `${path}/${filename}`, function (err) {

            const newFile = {
                filename,
                photoType: 'square',
                contentType: file.type
            };
            saveRestaurant(restaurantId, { $push: { photos: newFile } })
                .then(restaurant => res.json(restaurant))
                .catch(console.error);

            if (err) console.log('ERROR: ' + err);
        });
    });
}

export function deletePhoto(req, res) {
    const restaurantId = req.params.id;
    const photoId = req.params.photoId;

    Restaurant.findOne({ _id: restaurantId }).exec()
        .then(restaurant => deleteFile(`${RESTAURANTS_PATH}/${restaurantId}/${restaurant.photos.id(photoId).filename}`))
        .then(() => saveRestaurant(restaurantId, { $pull: { photos: { _id: photoId } } }))
        .then(restaurant => res.json(restaurant))
        .catch(console.error);
}

function getExtension(filename) {
    return filename.substr(filename.lastIndexOf('.') + 1, filename.length);
}

function deleteFile(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, function (err, stats) {
            console.log(stats);
            if (err) {
                return reject(err);
            }

            fs.unlink(path, function (error) {
                if (error) return reject(error);
                resolve();
                console.log('file deleted successfully');
            });
        });

    });
}