import { findAllRestaurants, findUserByEmail } from '../db';
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

// function requireLogin(req, res, next) {
//     if (req.isAuthenticated()) {
//         // if (req.session.loggedIn) {
//         next(); // allow the next route to run
//     } else {
//         // require the user to log in
//         res.redirect('/login'); // or render a form, etc.
//     }
// }


export default function (app) {
    app.all('/secure/*', passport.authenticationMiddleware(), function (req, res, next) {
        next();
        // if the middleware allowed us to get here,
        // just move on to the next route handler
    });

    app.get('/api/restaurants', passport.authenticationMiddleware(), function (req, res) {
        findAllRestaurants()
            .then(restaurants => res.json(restaurants))
            .catch(console.error);
    });

    // app.post('/api/login',
    //     passport.authenticate('local', {
    //         successRedirect: '/secure',
    //         failureRedirect: '/login',
    //         failureFlash: false
    //     }));
    app.post('/api/login',
        passport.authenticate('local'),
        function (req, res) {
            console.log(`User ${req.user.email} was successfully logged in`);
            res.json({
                id: req.user._id,
                email: req.user.email,
                roles: req.user.roles
            });

            // res.redirect('/secure');
        });

    app.get('/api/logout', passport.authenticationMiddleware(), function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/secure', passport.authenticationMiddleware(), view);

    app.get('*', view);
}