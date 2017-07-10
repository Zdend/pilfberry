import React from 'react';
import { List, Map, OrderedSet, OrderedMap, fromJS } from 'immutable';
import { renderToString } from 'react-dom/server';
import { minify } from 'html-minifier';
import Helmet from 'react-helmet';
import Root from '../../src/scripts/containers/root';
import configureStore from '../../src/scripts/stores/configure-store';
import rootSaga from '../../src/scripts/sagas/index';
import routes from '../../src/scripts/routes/index';
import { findRestaurant, getRestaurantPaths, findAllRestaurantsLean, findAllPostsLean, getPostPaths } from '../db';
import { isDev } from '../config';
import { transformNestedRecordObject, arrayToMapById } from '../../src/scripts/services';
import { Restaurant, restaurantDef, Post } from '../../src/scripts/models';
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
export const renderView = (data = fromJS(initialState)) => async (req, res) => {
    const restaurantObjects = await getRestaurantPaths();
    const postObjects = await getPostPaths();

    const dynamicRoutes = restaurantObjects.map(r => r.path).filter(k => k);
    const postDynamicRoutes = postObjects.map(r => r.path).filter(k => k);

    const dataWithPaths = data.set('routes', new Map({
        suburbs: new OrderedSet(getSuburbsRoutes(restaurantObjects)),
        dynamicRoutes: new List(dynamicRoutes),
        postDynamicRoutes: new List(postDynamicRoutes)
    }));
    const store = configureStore(dataWithPaths);

    const rootComp = <Root store={store} Routes={routes} isClient={false} location={req.url} context={{}}
        dynamicRoutes={new List(dynamicRoutes)}
        postDynamicRoutes={new List(postDynamicRoutes)} />;

    await store.runSaga(rootSaga);

    try {
        const bodyHtml = renderToString(rootComp);
        const head = Helmet.renderStatic();

        const rawHtml = layout(
            bodyHtml,
            JSON.stringify(store.getState()),
            head
        );

        const finalHtml = isDev ? rawHtml : minify(rawHtml, minifierOptions);

        res.status(200).send(finalHtml);
    } catch (e) {
        console.error(e);
        res.status(500).send(e.message);
    }

    store.close();
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
    findAllRestaurantsLean()
        .then(restaurants => arrayToMapById(restaurants, Restaurant, OrderedMap, restaurantDef))
        .then(restaurants => renderView(
            fromJS(initialState).mergeIn(['domain', 'restaurants'], restaurants)
        )(req, res))
        .catch(console.error);
};

export const renderAllPosts = async (req, res) => {
    const posts = await findAllPostsLean();
    const transformedPosts = arrayToMapById(posts, Post, OrderedMap);
    renderView(fromJS(initialState).mergeIn(['domain', 'posts'], transformedPosts))(req, res);
};

export const renderRestaurantByShortUrl = restaurant => (req, res) => {
    const transformedRestaurant = transformNestedRecordObject(restaurant.toObject(), Restaurant, restaurantDef);
    renderView(fromJS(initialState)
        .mergeIn(['domain', 'restaurants'], transformedRestaurant))(req, res);

};

export const renderPostByShortUrl = post => (req, res) => {
    const transformedPost = transformNestedRecordObject(post.toObject(), Post);
    renderView(fromJS(initialState)
        .mergeIn(['domain', 'posts'], transformedPost))(req, res);

};

export default renderView(fromJS(initialState));