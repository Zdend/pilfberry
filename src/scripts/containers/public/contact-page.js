import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MetaTag from '../../components/structure/meta';

export default () => (
    <Grid>
        <MetaTag title="Contact Us" description="Send us an enquiry regarding to features you would like to see here, if you found a bug or if you wish your restaurant to appear here." />
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