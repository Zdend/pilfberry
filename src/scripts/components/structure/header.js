import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export default () => (
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
                    <LinkContainer to="/secure/restaurants"><NavItem className="header-action" eventKey={1}>Restaurants</NavItem></LinkContainer>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={2} href="/api/logout" className="pull-right header-action">Logout</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
);