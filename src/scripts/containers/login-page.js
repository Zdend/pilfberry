import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/login-form';
import { loginAction, credentialsChange } from '../actions/login-actions';
import { Grid, Row, Col } from 'react-bootstrap';
import { getCredentials } from '../reducers/selectors';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

class LoginPage extends Component {
    componentDidMount() {
        if (this.props.credentials.get('isLogged')) {
            this.props.navigate('/secure');
        }
    }
    render() {
        const { credentials, loginRequestAction, credentialsChange } = this.props;
        return (
            <Grid>
                <Helmet>
                    <title>Pilfberry - Login</title>
                    <meta name="description" content="Login to Pilfberry" />
                    <meta name="keywords" content="diet, contact, vegetarian, gluten free, restaurant, login, sign in" />
                </Helmet>
                <Row className="margin-top-5x margin-bottom-5x">
                    <Col sm={6} smOffset={3} lg={4} lgOffset={4}>
                        <h1>Login</h1>
                        <LoginForm {...{ ...credentials.toJS(), credentialsChange, loginRequestAction }} />

                    </Col>
                </Row>
            </Grid>

        );
    }

}


LoginPage.propTypes = {
    credentials: PropTypes.object.isRequired,
    loginRequestAction: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    credentials: getCredentials(state)
});


export default connect(mapStateToProps, {
    loginRequestAction: loginAction.request,
    credentialsChange: credentialsChange,
    navigate: push
})(LoginPage);