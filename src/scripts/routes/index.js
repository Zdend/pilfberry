import React from 'react';
import App from '../containers/app';
import LoginPage from '../containers/login-page';
import SecurePage from '../containers/secure-page';
import LandingPage from '../containers/landing-page';
import SecureLayoutRoute from '../components/layouts/secure-wrapper';
import PublicLayoutRoute from '../components/layouts/public-wrapper';


export default () => (
    <App>
        <PublicLayoutRoute exact path="/" component={LandingPage} />
        <PublicLayoutRoute path="/home" component={LoginPage}/>

        <SecureLayoutRoute path="/secure" component={SecurePage}/>
    
    </App>
);


