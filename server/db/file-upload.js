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

    // form.on('fileBegin', function (name, file) {
        // mkdirp(`${RESTAURANTS_PATH}/${restaurantId}`, function (error) {
        // if (error) return console.error(error);
        // const filename = `${generate()}.${getExtension(file.name)}`;
        // file.name = filename;
        // file.path = `${RESTAURANTS_PATH}/${restaurantId}`;
        // fs.writeFile(`${RESTAURANTS_PATH}/${restaurantId}`, file, function (err) {
        //     if (err) return console.log(err);
        //     console.log('The file was saved!');
        // });

        // });
    // });

    form.on('file', function (name, file) {
        const filename = `${generate()}.${getExtension(file.name)}`;
        fs.rename(`${file.path}`, `${path}/${filename}`, function (err) {

            const newFile = {
                filename,
                photoType: 'square',
                contentType: file.type
            };
            saveRestaurant(restaurantId, { photos: [newFile] })
                .then(restaurant => res.json(restaurant))
                .catch(console.error);
            console.log('Uploaded ' + file.name);

            if (err) console.log('ERROR: ' + err);
        });
    });
}

function getExtension(filename) {
    return filename.substr(filename.lastIndexOf('.') + 1, filename.length);
}