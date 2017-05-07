import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../structure/footer';
import Header from '../structure/public-header';
import { Alert } from 'react-bootstrap';

export default ({ component: Component, activeLanguage, navigate, languages, globalMessage, resetMessageAction, languageChangeAction, ...rest }) => (
    <Route {...rest} render={matchProps => (
        <div>
            <Header {...{ navigate }} />

            {globalMessage.get('message') &&
                <Alert
                    bsStyle={globalMessage.get('type') || 'info'}
                    onDismiss={resetMessageAction}>
                    {globalMessage.get('message')}
                </Alert>
            }

            <Component {...matchProps} />

            <Footer {...{ activeLanguage, languages, languageChangeAction }} />
        </div>
    )} />
);