import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../structure/footer';
import Header from '../structure/public-header';
import GlobalMessage from '../structure/global-message';

export default ({ component: Component, globalMessage, resetMessageAction, suburbs, ...rest }) => (
    <Route {...rest} render={matchProps => (
        <div>
            <Header {...{ suburbs }} />

            <GlobalMessage {...{ globalMessage, resetMessageAction }} />

            <Component {...matchProps} />

            <Footer />
        </div>
    )} />
);