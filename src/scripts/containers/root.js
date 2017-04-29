import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';


const Root = ({store, Routes, history}) => (
    <Provider store={store}>
        <ConnectedRouter history={history} store={store}>
            <Routes />
        </ConnectedRouter>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
    Routes: PropTypes.func.isRequired
};

export default Root;