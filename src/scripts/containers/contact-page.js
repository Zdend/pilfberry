import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Helmet from 'react-helmet';

export default () => (
    <Grid>
        <Helmet>
            <title>Pilfberry - Contact Us</title>
            <meta name="description" content="Feel free to contact us" />
            <meta name="keywords" content="diet, contact, vegetarian, gluten free, restaurant, allergy" />
        </Helmet>

        <Row>
            <Col sm={12} className="padding-top-2x padding-bottom-2x">
                <h1>Contact Us</h1>

                <p>Let us know if there is anything we can do better or if you wish to see your favourite restaurant on the list.</p>

                <p>You can reach us here <a href="mailto:contact@pilfberry.com">contact@pilfberry.com</a></p>

                <b>We would like to hear from you!!</b>
                <p>Team Pilfberry</p>
            </Col>
        </Row>
    </Grid>
);