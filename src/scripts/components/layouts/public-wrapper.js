import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../structure/footer';
import Header from '../structure/public-header';
import GlobalMessage from '../structure/global-message';

export default ({ component: Component, activeLanguage, navigate, languages, globalMessage, resetMessageAction, languageChangeAction, ...rest }) => (
    <Route {...rest} render={matchProps => (
        <div>
            <Header {...{ navigate }} />

            <GlobalMessage {...{ globalMessage, resetMessageAction }} />

            <Component {...matchProps} />

            <Footer {...{ activeLanguage, languages, languageChangeAction }} />
        </div>
    )} />
);