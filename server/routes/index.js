import passport from 'passport';
import {
    findAllRestaurants,
    findRestaurant,
    saveRestaurant,
    deleteRestaurant,
    findRestaurantByPath,
    findRestaurantsBySuburb,
    savePost,
    findAllPosts,
    findPost,
    findPostByPath,
    deletePost

} from '../db';
import { deletePhoto, uploadPhotosToRestaurant } from '../db/file-upload';
import view, {
    renderRestaurant,
    renderRestaurantByShortUrl,
    renderPostByShortUrl,
    renderAllRestaurants,
    renderAllPosts
} from './view';
import { STATUS_ACTIVE, STATUS_DELETED } from '../../shared/constants';

const logErrorFactory = message => e => console.error(`${message ? message + ':' : ''}${e && e.stack}`);
const logError = (message, e) => logErrorFactory(message)(e);

export default function (app) {
    const secured = passport.authenticationMiddleware();

    app.all('/secure', secured, (req, res, next) => next());
    app.all('/secure/*', secured, (req, res, next) => next());

    app.get('/api/restaurants', async function (req, res) {
        try {
            const restaurants = await findAllRestaurants({ status: req.query.status || STATUS_ACTIVE });
            res.json(restaurants);
        } catch (e) {
            logError('findAllRestaurants failed', e);
            res.status(500).send('Fetching of restaurants failed.');
        }
    });

    app.get('/api/posts', async function (req, res) {
        try {
            let posts;
            if (req.user) {
                posts = await findAllPosts({ status: req.query.status || { $ne: STATUS_DELETED } });
            } else {
                posts = await findAllPosts({ status: STATUS_ACTIVE });
            }
            res.json(posts);
        } catch (e) {
            logError('findAllPosts failed', e);
            res.status(500).send('Fetching of posts failed.');
        }
    });

    app.get('/api/restaurants/findBySuburb=:suburb', async function (req, res) {
        try {
            const restaurants = await findRestaurantsBySuburb(req.params.suburb);
            res.json(restaurants);
        } catch (e) {
            logError('findRestaurantsBySuburb failed', e);
            res.status(500).send('Fetching of restaurants by suburb failed.');
        }
    });

    app.get('/api/restaurant/findByPath=:shortUrl', async function (req, res) {
        try {
            const restaurant = await findRestaurantByPath(req.params.shortUrl);
            res.json(restaurant);
        } catch (e) {
            logError(`findRestaurant with id ${req.params.shortUrl} failed`, e);
            res.status(500).send('Fetching of a restaurant by path failed.');
        }
    });

    app.get('/api/restaurant/:id', secured, async function (req, res) {
        try {
            const restaurant = await findRestaurant(req.params.id);
            res.json(restaurant);
        } catch (e) {
            logError(`findRestaurant with id ${req.params.id} failed`, e);
            res.status(500).send('Fetching of a restaurant by id failed.');
        }
    });

    app.get('/api/post/findByPath=:shortUrl', async function (req, res) {
        try {
            const post = await findPostByPath(req.params.shortUrl);
            res.json(post);
        } catch (e) {
            logError(`findPostByPath with id ${req.params.shortUrl} failed`, e);
            res.status(500).send('Fetching of a post by path failed.');
        }
    });

    app.get('/api/post/:id', secured, async function (req, res) {
        try {
            const post = await findPost(req.params.id);
            res.json(post);
        } catch (e) {
            logError(`findPost with id ${req.params.id} failed`, e);
            res.status(500).send('Fetching of a post by id failed.');
        }
    });


    app.put('/api/restaurant/:id', secured, async function (req, res) {
        try {
            const restaurant = await saveRestaurant(req.params.id, req.body);
            res.json(restaurant);
        } catch (e) {
            logError(`saveRestaurant with id ${req.params.id} failed`, e);
            res.status(500).send('Saving of a restaurant failed.');
        }
    });

    app.put('/api/restaurant/:id/photos', secured, uploadPhotosToRestaurant);

    app.delete('/api/restaurant/:id/photo/:photoId', secured, deletePhoto);

    app.delete('/api/restaurant/:id', secured, async function (req, res) {
        try {
            const restaurant = await deleteRestaurant(req.params.id);
            res.json(restaurant);
        } catch (e) {
            logError(`delete of a restaurant with id ${req.params.id} failed`, e);
            res.status(500).send(`Delete of a restaurant with id ${req.params.id} failed.`);
        }
    });

    app.delete('/api/post/:id', secured, async function (req, res) {
        try {
            const post = await deletePost(req.params.id);
            res.json(post);
        } catch (e) {
            logError(`delete of a post with id ${req.params.id} failed`, e);
            res.status(500).send(`Delete of a post with id ${req.params.id} failed.`);
        }
    });

    app.put('/api/post/:id', secured, async function (req, res) {
        try {
            const post = await savePost(req.params.id, req.body);
            res.json(post);
        } catch (e) {
            logError(`savePost with id ${req.params.id} failed`, e);
            res.status(500).send('Saving of a post failed.');
        }
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

    app.get('/api/logout', secured, function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/secure', view);
    app.get('/restaurant/:id', renderRestaurant);
    app.get('/area/:area', view);
    app.get('/posts', renderAllPosts);
    app.get('/', renderAllRestaurants);
    app.get('/list', renderAllRestaurants);
    app.get('/map', renderAllRestaurants);

    app.get('/:shortUrl', async function (req, res) {
        try {
            const restaurant = await findRestaurantByPath(req.params.shortUrl);
            if (restaurant) {
                return renderRestaurantByShortUrl(restaurant)(req, res);
            }
            const post = await findPostByPath(req.params.shortUrl);
            if (post) {
                return renderPostByShortUrl(post)(req, res);
            }

            view(req, res);
        } catch (e) {
            logError(`Server side render of a restaurant with "${req.params.shortUrl}" path failed`, e);
            res.status(500).send('Render of a restaurant failed.');
        }
    });

    app.get('*', view);
}