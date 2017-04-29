import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from '../components/login-form';
import { loginAction, credentialsChange } from '../actions/login-actions';
import {t} from 'i18next';
import {Row, Col} from 'react-bootstrap';
import {getCredentials} from '../reducers/selectors';

const LoginPage = ({ credentials, loginRequestAction, credentialsChange }) => (

    <Row className="margin-top-5x">
        <Col sm={6} smOffset={3} lg={4} lgOffset={4}>
            <h1>{t('page.login.h1')}</h1>
            <LoginForm {...{...credentials.toJS(), credentialsChange, loginRequestAction}} />

            <hr className="margin-top-2x margin-bottom-2x" />

            <Link to="/">{t('common.link.home')}</Link>
        </Col>
    </Row>

);


LoginPage.propTypes = {
    credentials: PropTypes.object.isRequired,
    loginRequestAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    credentials: getCredentials(state)
});


export default connect(mapStateToProps, {
    loginRequestAction: loginAction.request,
    credentialsChange: credentialsChange
})(LoginPage);