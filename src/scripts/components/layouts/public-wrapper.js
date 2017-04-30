import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../structure/footer';
import Header from '../structure/public-header';

export default ({component: Component, activeLanguage, navigate, languages, languageChangeAction, ...rest}) => (
    <Route {...rest} render={matchProps => (
        <div>
            <Header {...{navigate}} />

            <Component {...matchProps} />

            <Footer {...{activeLanguage, languages, languageChangeAction}} />
        </div>
    )} />
);