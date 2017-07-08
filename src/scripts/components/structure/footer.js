import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="footer">
        <Grid>
            <Row>
                <Col xs={6}>
                    <Link to="/" className="footer__logo margin-top-1x">pilfberry</Link>
                </Col>
                <Col xs={6}>
                    <div className="text-align-right margin-top-1x">
                        <a href="https://www.facebook.com/Pilfberry-1307425432712367/" className="text-muted" target="_blank"><i className="fa fa-facebook-square fa-2x" /></a>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <ul className="margin-top-1x list-unstyled list-inline text-align-center">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/areas">Suburbs</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/terms">Terms and Conditions</Link></li>
                        <li><Link to="/privacy">Privacy</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <div className="text-center margin-top-2x">© 2017 Pilfberry</div>
                </Col>
            </Row>

        </Grid>
    </footer>
);

export default Footer;