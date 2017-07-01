import React from 'react';
import { List, Map, OrderedSet, OrderedMap } from 'immutable';
import { renderToString } from 'react-dom/server';
import Root from '../../src/scripts/containers/root';
import configureStore from '../../src/scripts/stores/configure-store';
import rootSaga from '../../src/scripts/sagas/index';
import routes from '../../src/scripts/routes/index';
import { findRestaurant, findRestaurantByPath, getRestaurantPaths, findAllRestaurants } from '../db';
import { isDev } from '../config';
import { transformNestedRecordObject, arrayToMapById } from '../../src/scripts/services';
import { Restaurant, restaurantDef } from '../../src/scripts/models';
import { fromJS } from 'immutable';
import Helmet from 'react-helmet';
import { minify } from 'html-minifier';
import {
    minifierOptions,
    layout
} from './templates';
import { dashify } from '../../shared/utils/string';



const initialState = {
    ui: {
        pages: {
            login: {
                credentials: {
                    login: isDev ? 'zdenek.vecek@gmail.com' : '',
                    password: isDev ? 'password' : ''
                }
            }
        },
        components: {
        }
    },
    domain: {
        restaurants: {}
    }
};
function getSuburbsRoutes(restaurants) {
    const urlObject = restaurants.reduce((result, restaurant) => {
        const url = dashify(restaurant.address.suburb);
        const count = result[url];
        return { ...result, [url]: count ? count + 1 : 1 };
    }, {});
    return Object.keys(urlObject)
        .filter(key => key)
        .map(key => new Map({ url: key, count: urlObject[key] }));
}
export const renderView = (data = fromJS(initialState)) => (req, res) => {
    getRestaurantPaths()
        .then(restaurantObjects => {
            const dynamicRoutes = restaurantObjects.map(r => r.path);
            const dataWithPaths = data.set('routes', new Map({
                suburbs: new OrderedSet(getSuburbsRoutes(restaurantObjects)),
                dynamicRoutes: new List(dynamicRoutes)
            }));
            const store = configureStore(dataWithPaths);
            const rootComp = <Root store={store} Routes={routes} isClient={false} location={req.url} context={{}} dynamicRoutes={new List(dynamicRoutes)} />;

            store.runSaga(rootSaga).done.then(() => {
                const bodyHtml = renderToString(rootComp);
                const helmet = Helmet.renderStatic();

                const rawHtml = layout(
                    bodyHtml,
                    JSON.stringify(store.getState()),
                    helmet
                );

                const finalHtml = isDev ? rawHtml : minify(rawHtml, minifierOptions);

                res.status(200).send(finalHtml);
            }).catch((e) => {
                res.status(500).send(e.message);
            });

            store.close();
        })
        .catch(console.error);


};

export const renderRestaurant = (req, res) => {
    findRestaurant(req.params.id)
        .then(restaurant => transformNestedRecordObject(restaurant.toObject(), Restaurant, restaurantDef))
        .then(restaurant => renderView(
            fromJS(initialState).mergeIn(['domain', 'restaurants'], restaurant)
        )(req, res))
        .catch(console.error);
};

export const renderAllRestaurants = (req, res) => {
    findAllRestaurants()
        .then(restaurants => arrayToMapById(restaurants, Restaurant, OrderedMap, restaurantDef))
        .then(restaurants => renderView(
            fromJS(initialState).mergeIn(['domain', 'restaurants'], restaurants)
        )(req, res))
        .catch(console.error);
};

export const renderRestaurantByShortUrl = (req, res) => {
    findRestaurantByPath(req.params.shortUrl)
        .then(restaurant => transformNestedRecordObject(restaurant.toObject(), Restaurant, restaurantDef))
        .then(restaurant => renderView(
            fromJS(initialState).mergeIn(['domain', 'restaurants'], restaurant)
        )(req, res))
        .catch(console.error);
};

export default renderView(fromJS(initialState));