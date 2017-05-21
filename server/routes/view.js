import React from 'react';
import { renderToString } from 'react-dom/server';
import Root from '../../src/scripts/containers/root';
import { matchPath } from 'react-router';
import configureStore from '../../src/scripts/stores/configure-store';
import rootSaga from '../../src/scripts/sagas/index';
import routes from '../../src/scripts/routes/index';
import { findAllRestaurants } from '../db';

const layout = (body, initialState) => (`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Special Diet</title>
            <meta name="description" content="Special Diet">
            <meta name="author" content="ZDV">
           
        </head>
        <body>
            <div id="root"><div>${body}</div></div>
            <script type="text/javascript" charset="utf-8">
              window.__INITIAL_STATE__ = ${initialState};
            </script>
            <script src="/static/app.js"></script>
        </body>
    </html>
`);


const initialState = {
    ui: {
        pages: {
            login: {
                credentials: {
                    login: 'zdenek.vecek@gmail.com',
                    password: 'password'
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

export default function (req, res) {
    const store = configureStore(initialState);
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
}