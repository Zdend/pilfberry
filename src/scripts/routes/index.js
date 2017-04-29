import React from 'react';
import App from '../containers/app';
import LoginPage from '../containers/login-page';
import SecurePage from '../containers/secure-page';
import PublicPage from '../containers/public-page';
import UserPage from '../containers/user-page';
import SecureLayoutRoute from '../components/layouts/secure-wrapper';
import PublicLayoutRoute from '../components/layouts/public-wrapper';


export default () => (
    <App>
        <PublicLayoutRoute exact path="/" component={PublicPage} />
        <PublicLayoutRoute path="/home" component={LoginPage}/>

        <SecureLayoutRoute path="/secure" component={SecurePage}/>
        <SecureLayoutRoute path="/user" component={UserPage}/>
    </App>
);


