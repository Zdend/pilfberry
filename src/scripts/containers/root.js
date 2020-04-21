import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { StaticRouter } from 'react-router-dom';

const Root = ({ store, Routes, history, isClient = true, location, context, dynamicRoutes, postDynamicRoutes }) => (
    <Provider store={store}>
        {isClient
            ?
            <ConnectedRouter history={history} store={store}>
                <Routes dynamicRoutes={dynamicRoutes} postDynamicRoutes={postDynamicRoutes} />
            </ConnectedRouter>
            :
            <StaticRouter location={location} context={context}>
                <Routes dynamicRoutes={dynamicRoutes} postDynamicRoutes={postDynamicRoutes} />
            </StaticRouter>
        }

    </Provider>
);


Root.propTypes = {
    store: PropTypes.object.isRequired,
    Routes: PropTypes.func.isRequired
};

export default Root;