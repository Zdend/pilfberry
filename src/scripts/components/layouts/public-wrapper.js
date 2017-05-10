import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../structure/footer';
import Header from '../structure/public-header';
import { Alert, Grid, Row, Col } from 'react-bootstrap';

export default ({ component: Component, activeLanguage, navigate, languages, globalMessage, resetMessageAction, languageChangeAction, ...rest }) => (
    <Route {...rest} render={matchProps => (
        <div>
            <Header {...{ navigate }} />

            {globalMessage.get('message') &&
                <Grid>
                    <Row>
                        <Col sm={12}>
                            <Alert 
                                className="margin-top-2x"
                                bsStyle={globalMessage.get('type') || 'info'}
                                onDismiss={resetMessageAction}>
                                {globalMessage.get('message')}
                            </Alert>
                        </Col>
                    </Row>
                </Grid>
                
            }

            <Component {...matchProps} />

            <Footer {...{ activeLanguage, languages, languageChangeAction }} />
        </div>
    )} />
);