import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { t } from 'i18next';

export default ({ navigate }) => (
    <header>
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">pilfberry</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} className="header-action" onClick={() => navigate('/login')}>{t('common.link.login')}</NavItem>
                    {/*<NavItem eventKey={2} onClick={() => navigate('/user')}>{t('common.link.userDetails')}</NavItem>*/}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
);