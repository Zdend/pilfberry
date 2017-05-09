import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../structure/header';
import Footer from '../structure/footer';
import { Grid, Row, Col } from 'react-bootstrap';


export default ({
    component: Component,
    activeLanguage,
    languages,
    languageChangeAction,
    navigate,
    isIndex,
    ...rest }) => {
    return (
        <Route exact {...rest} render={matchProps => (
            <div>

                <Header {...{ navigate }} />

                <Grid>
                    <Row>
                        <Col sm={12}>
                            <Component {...matchProps} />
                        </Col>
                    </Row>
                </Grid>

                <Footer {...{ activeLanguage, languages, languageChangeAction }} />
            </div>
        )}
        />
    );
};