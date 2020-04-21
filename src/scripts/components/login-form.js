import React, { PropTypes } from 'react';
import { SpinnerInline } from './spinner';

const LoginForm = ({ login, password, isPending, loginRequestAction, credentialsChange }) => (
    <form>
        <div className="form-group">
            <label className="control-label">Login</label>
            <input type="text" className="form-control" value={login}
                onChange={e => credentialsChange('login', e)} autoFocus
                onKeyPress={e => e.which === 13 && loginRequestAction()} />
        </div>
        <div className="form-group">
            <label className="control-label">Password</label>
            <input type="password" className="form-control" value={password}
                onChange={e => credentialsChange('password', e)} 
                onKeyPress={e => e.which === 13 && loginRequestAction()} />
        </div>

        <button type="button" onClick={loginRequestAction} className="btn btn-primary btn-block">

            {isPending ? <SpinnerInline text="Logging in" /> : 'Login'}
        </button>
    </form>
);
LoginForm.propTypes = {
    login: PropTypes.string,
    password: PropTypes.string,
    isPending: PropTypes.bool,
    loginRequestAction: PropTypes.func.isRequired,
    credentialsChange: PropTypes.func.isRequired
};

export default LoginForm;