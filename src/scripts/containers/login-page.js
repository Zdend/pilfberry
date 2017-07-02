import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/login-form';
import { loginAction, credentialsChange } from '../actions/login-actions';
import { Grid, Row, Col } from 'react-bootstrap';
import { getCredentials } from '../reducers/selectors';
import { push } from 'react-router-redux';
import MetaTag from '../components/structure/meta';

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
                <MetaTag title="Login to Pilfberry" />
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