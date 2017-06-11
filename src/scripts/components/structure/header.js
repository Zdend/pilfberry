import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                <Nav>
                    <NavItem className="header-action" eventKey={1} onClick={() => navigate('/secure/restaurants')}>Restaurants</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={2} href="/api/logout" className="pull-right header-action">Logout</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
);