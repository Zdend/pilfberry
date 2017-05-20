import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { t } from 'i18next';

export default ({ navigate }) => (
    <header>
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">pilfberry <i className="fa fa-pagelines" /></Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} className="header-action" onClick={() => navigate('/login')}>Login</NavItem>
                    {/*<NavItem eventKey={2} onClick={() => navigate('/user')}>{t('common.link.userDetails')}</NavItem>*/}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
);