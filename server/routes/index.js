import {
    findAllRestaurants,
    findRestaurant,
    saveRestaurant,
    deleteRestaurant,
    // fillInPaths,
    getRestaurantPaths,
    findRestaurantByPath,
    findRestaurantsBySuburb
} from '../db';
import { deletePhoto } from '../db/file-upload';
import view, { renderRestaurant, renderRestaurantByShortUrl } from './view';
import passport from 'passport';
import { STATUS_ACTIVE } from '../../shared/constants';

const logError = message => e => console.error(`${message ? message + ':' : ''}${e && e.message && e.message.substr(0, 300)}`);


export default function (app) {
    const secured = passport.authenticationMiddleware();

    app.all('/secure', secured, (req, res, next) => next());
    app.all('/secure/*', secured, (req, res, next) => next());

    app.get('/api/restaurants', function (req, res) {
        findAllRestaurants({ status: req.query.status ? req.query.status : STATUS_ACTIVE })
            .then(restaurants => res.json(restaurants))
            .catch(logError('findAllRestaurants failed'));
    });

    app.get('/api/restaurants/findBySuburb=:suburb', function (req, res) {
        findRestaurantsBySuburb(req.params.suburb)
            .then(restaurants => res.json(restaurants))
            .catch(logError('findRestaurantsBySuburb failed'));
    });

    app.get('/api/restaurant/findByPath=:shortUrl', secured, function (req, res) {
        findRestaurantByPath(req.params.shortUrl)
            .then(restaurant => res.json(restaurant))
            .catch(logError(`findRestaurant with id ${req.params.shortUrl} failed`));
    });

    app.get('/api/restaurant/:id', secured, function (req, res) {
        findRestaurant(req.params.id)
            .then(restaurant => res.json(restaurant))
            .catch(logError(`findRestaurant with id ${req.params.id} failed`));
    });


    app.put('/api/restaurant/:id', secured, function (req, res) {
        saveRestaurant(req.params.id, req.body)
            .then(restaurant => res.json(restaurant))
            .catch(console.error);
    });

    app.put('/api/restaurant/:id/photos', secured, function (req, res) {
        fillInPaths()
            .then(() => res.send())
            .catch(console.error);
    });

    app.delete('/api/restaurant/:id/photo/:photoId', secured, deletePhoto);

    app.delete('/api/restaurant/:id', secured, function (req, res) {
        deleteRestaurant(req.params.id)
            .then(restaurant => res.json(restaurant))
            .catch(logError(`delete restaurant with id ${req.params.id} failed`));
    });

    // app.get('/api/887799', secured, fillInPaths);

    app.post('/api/login',
        passport.authenticate('local'),
        function (req, res) {
            console.log(`User ${req.user.email} was successfully logged in`);
            res.json({
                id: req.user._id,
                email: req.user.email,
                roles: req.user.roles
            });
        });

    app.get('/api/logout', secured, function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/secure', view);
    app.get('/restaurant/:id', renderRestaurant);
    app.get('/area/:area', view);

    getRestaurantPaths()
        .then(paths => app.get(`/:shortUrl(${paths})`, renderRestaurantByShortUrl))
        .catch(console.error);

    app.get('*', view);
}