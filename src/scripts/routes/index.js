import React from 'react';
import App from '../containers/app';
import LoginPage from '../containers/login-page';
import SecurePage from '../containers/secure-page';
import LandingPage from '../containers/landing-page';
import RestaurantPage from '../containers/restaurant-page';
import RestaurantListPage from '../containers/restaurant-list-page';
import RestaurantEditPage from '../containers/restaurant-edit-page';
import PrivacyPage from '../containers/privacy-page';
import TermsPage from '../containers/terms-page';
import ContactPage from '../containers/contact-page';
import SecureLayoutRoute from '../components/layouts/secure-wrapper';
import PublicLayoutRoute from '../components/layouts/public-wrapper';


export default ({ dynamicRoutes }) => (
    <App>
        <PublicLayoutRoute exact path="/" component={LandingPage} />
        <PublicLayoutRoute exact path="/list" component={LandingPage} />
        <PublicLayoutRoute exact path="/map" component={LandingPage} />
        <PublicLayoutRoute path="/login" component={LoginPage} />
        <PublicLayoutRoute path="/privacy" component={PrivacyPage} />
        <PublicLayoutRoute path="/terms" component={TermsPage} />
        <PublicLayoutRoute path="/contact" component={ContactPage} />
        <PublicLayoutRoute path="/restaurant/:id" component={RestaurantPage} />
        <PublicLayoutRoute path={`/:path(${dynamicRoutes.toArray().join('|')})`} component={RestaurantPage} />

        <SecureLayoutRoute path="/secure" component={SecurePage} />
        <SecureLayoutRoute path="/secure/restaurants" component={RestaurantListPage} />
        <SecureLayoutRoute path="/secure/restaurants/:id" component={RestaurantEditPage} />
    </App>
);


