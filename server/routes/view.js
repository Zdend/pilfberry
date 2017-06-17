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

const styleDefinitions = `
    <link rel="stylesheet" type="text/css" href="/static/vendor.css" />
    <link rel="stylesheet" type="text/css" href="/static/app.css" />
`;

const scriptDefinitionsDev = `
    <script src="/static/app.js"></script>
`;

const scriptDefinitionsProd = `
    <script src="/static/vendor.js"></script>
    <script src="/static/app.js"></script>
`;
const googleTagManagerScript = `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NNLJW2P');</script>
    <!-- End Google Tag Manager -->
`;
const googleTagManagerNoScript = `
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NNLJW2P"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
`;

const layout = (body, initialState) => (`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Pilfberry</title>
            <meta name="description" content="Pilfberry helps people with dieatary preferences">
            <meta name="author" content="ZDV">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${isDev ? '' : styleDefinitions}
            ${googleTagManagerScript}
        </head>
        <body>
            ${googleTagManagerNoScript}
            <div id="root"><div>${body}</div></div>
            <script type="text/javascript" charset="utf-8">
              window.__INITIAL_STATE__ = ${initialState};
            </script>
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
        res.status(200).send(
            layout(
                renderToString(rootComp),
                JSON.stringify(store.getState())
            )
        );
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