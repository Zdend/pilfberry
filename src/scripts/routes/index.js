import React from 'react';
import App from '../containers/app';
import LoginPage from '../containers/login-page';
import SecurePage from '../containers/secure-page';
import LandingPage from '../containers/landing-page';
import RestaurantPage from '../containers/restaurant-page';
import RestaurantEditPage from '../containers/restaurant-edit-page';
import SecureLayoutRoute from '../components/layouts/secure-wrapper';
import PublicLayoutRoute from '../components/layouts/public-wrapper';


export default () => (
    <App>
        <PublicLayoutRoute exact path="/" component={LandingPage} />
        <PublicLayoutRoute path="/login" component={LoginPage} />

        <SecureLayoutRoute path="/secure" component={SecurePage} />
        <SecureLayoutRoute path="/secure/restaurants" component={RestaurantPage} />
        <SecureLayoutRoute path="/secure/restaurants/:id/edit" component={RestaurantEditPage} />
    </App>
);


