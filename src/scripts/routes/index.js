import React from 'react';
import App from '../containers/app';
import SecurePage from '../containers/secure/secure-page';
import RestaurantListPage from '../containers/secure/restaurant-list-page';
import RestaurantEditPage from '../containers/secure/restaurant-edit-page';
import PostListPage from '../containers/secure/post-list-page';
import LoginPage from '../containers/public/login-page';
import LandingPage from '../containers/public/landing-page';
import RestaurantPage from '../containers/public/restaurant-page';
import PrivacyPage from '../containers/public/privacy-page';
import TermsPage from '../containers/public/terms-page';
import ContactPage from '../containers/public/contact-page';
import SuburbPage from '../containers/public/suburb-page';
import AreasPage from '../containers/public/areas-page';
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
        <PublicLayoutRoute exact path="/areas" component={AreasPage} />
        <PublicLayoutRoute path="/area/:area" component={SuburbPage} />
        <PublicLayoutRoute path="/restaurant/:id" component={RestaurantPage} />
        <PublicLayoutRoute path={`/:path(${dynamicRoutes.join('|')})`} component={RestaurantPage} />

        <SecureLayoutRoute path="/secure" component={SecurePage} />
        <SecureLayoutRoute path="/secure/restaurants" component={RestaurantListPage} />
        <SecureLayoutRoute path="/secure/restaurants/:id" component={RestaurantEditPage} />
        <SecureLayoutRoute path="/secure/posts" component={PostListPage} />
    </App>
);