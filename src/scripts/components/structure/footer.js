import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Footer = (props) => (
    <footer className="footer">
        <Grid>
            <Row>
                <Col xs={12} md={3}>
                    <h2 className="footer__logo">pilfberry</h2>
                </Col>
                <Col xs={12} md={6}>
                    <ul className="margin-top-2x list-unstyled list-inline text-align-center text-align-left-sm">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><a href="/terms">Terms and Conditions</a></li>
                        <li><a href="/privacy">Privacy</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </Col>
                <Col xs={12} md={3}>
                    <div className="text-align-right text-align-left-sm margin-top-2x">© 2017 Pilfberry</div>
                </Col>
            </Row>

        </Grid>
    </footer>
);

export default Footer;