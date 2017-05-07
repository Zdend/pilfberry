import React, { PropTypes } from 'react';
import { t } from 'i18next';
import { SpinnerInline } from './spinner';

const LoginForm = ({ login, password, isPending, loginRequestAction, credentialsChange }) => (
    <form className="margin-top-2x">
        <div className="form-group">
            <label className="control-label">{t('common.label.login')}</label>
            <input type="text" className="form-control" value={login}
                onChange={e => credentialsChange('login', e)} />
        </div>
        <div className="form-group">
            <label className="control-label">{t('common.label.password')}</label>
            <input type="password" className="form-control" value={password}
                onChange={e => credentialsChange('password', e)} />
        </div>

        <button type="button" onClick={loginRequestAction} className="btn btn-primary btn-block">

            {isPending ? <SpinnerInline text="Logging in" /> : t('common.action.login')}
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