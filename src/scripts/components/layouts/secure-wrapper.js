import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../structure/header';
import Footer from '../structure/footer';
import { Grid, Row, Col } from 'react-bootstrap';
import GlobalMessage from '../structure/global-message';


export default ({
    component: Component,
    navigate,
    globalMessage,
    resetMessageAction,
    ...rest }) => {
    return (
        <Route exact {...rest} render={matchProps => (
            <div>

                <Header {...{ navigate }} />

                <GlobalMessage {...{ globalMessage, resetMessageAction }} />

                <Grid>
                    <Row>
                        <Col sm={12}>
                            <Component {...matchProps} />
                        </Col>
                    </Row>
                </Grid>

                <Footer />
            </div>
        )}
        />
    );
};