import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../structure/footer';
import {Grid, Row, Col} from 'react-bootstrap';


export default ({component: Component, activeLanguage, languages, languageChangeAction, ...rest}) => (
    <Route {...rest} render={matchProps => (
        <div>
            <Grid fluid>
                <Row>
                    <Col sm={12}>
                        <Component {...matchProps} />
                    </Col>
                </Row>
            </Grid>

            <Footer {...{activeLanguage, languages, languageChangeAction}} />
        </div>
    )} />
);