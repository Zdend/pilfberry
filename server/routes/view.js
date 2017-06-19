import React from 'react';
import { renderToString } from 'react-dom/server';
import Root from '../../src/scripts/containers/root';
import configureStore from '../../src/scripts/stores/configure-store';
import rootSaga from '../../src/scripts/sagas/index';
import routes from '../../src/scripts/routes/index';
import { findRestaurant } from '../db';
import { isDev } from '../config';
import { transformNestedRecordObject } from '../../src/scripts/services';
import { Restaurant, restaurantDef } from '../../src/scripts/models';
import { fromJS } from 'immutable';
import Helmet from 'react-helmet';
import { minify } from 'html-minifier';
import {
    minifierOptions,
    spinnerStyle,
    googleTagManagerScript,
    googleTagManagerNoScript,
    styleDefinitions,
    scriptDefinitionsDev,
    scriptDefinitionsProd
} from './templates';

const layout = (body, initialState, helmet) => (`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            
            <meta name="author" content="ZDV">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${spinnerStyle}
            ${googleTagManagerScript}
        </head>
        <body>
            ${googleTagManagerNoScript}
            <div class="spinner-overlay"><div class="spinner"></div></div>
            <div id="root"><div>${body}</div></div>
            <script type="text/javascript" charset="utf-8">
              window.__INITIAL_STATE__ = ${initialState};
            </script>
            ${isDev ? '' : styleDefinitions}
            ${isDev ? scriptDefinitionsDev : scriptDefinitionsProd}
        </body>
    </html>
`);


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

export const renderView = (data = fromJS(initialState)) => (req, res) => {
    const store = configureStore(data);
    const rootComp = <Root store={store} Routes={routes} isClient={false} location={req.url} context={{}} />;

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
};

export const renderRestaurant = (req, res) => {
    findRestaurant(req.params.id)
        .then(restaurant => transformNestedRecordObject(restaurant.toObject(), Restaurant, restaurantDef))
        .then(restaurant => renderView(
            fromJS(initialState).mergeIn(['domain', 'restaurants'], restaurant)
        )(req, res))
        .catch(console.error);

};

export default renderView(fromJS(initialState));