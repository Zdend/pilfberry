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
                    <LinkContainer to="/secure/restaurants" className="header-action">
                        <NavItem eventKey={1}>Restaurants</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/secure/posts" className="header-action">
                        <NavItem eventKey={2}>Posts</NavItem>
                    </LinkContainer>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={2} href="/api/logout" className="pull-right header-action">Logout</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
);