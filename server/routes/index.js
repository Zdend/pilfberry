import { findAllRestaurants, findRestaurant, findUserByEmail } from '../db';
import view from './view';
import passport from 'passport';

export const PUBLIC_ROUTES = [
    '/',
    '/favicon.ico',
    '/static',
    '/login',
    '/api/login',
    '/api/restaurants',

];



export default function (app) {
    const secured = passport.authenticationMiddleware();

    app.all('/secure', secured, (req, res, next) => next());
    app.all('/secure/*', secured, (req, res, next) => next());

    app.get('/api/restaurants', function (req, res) {
        findAllRestaurants()
            .then(restaurants => res.json(restaurants))
            .catch(console.error);
    });

    app.get('/api/restaurant/:id', secured, function (req, res) {
        findRestaurant(req.params.id)
            .then(restaurant => res.json(restaurant))
            .catch(console.error);
    });

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

    app.get('/api/logout', passport.authenticationMiddleware(), function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/secure', view);

    app.get('*', view);
}