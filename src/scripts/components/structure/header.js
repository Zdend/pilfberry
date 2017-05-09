import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default ({ navigate }) => (
    <header>
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/secure">pilfberry</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} onClick={() => navigate('/secure/restaurants')}>Restaurants</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1} href="/api/logout" className="pull-right">Logout</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </header>
);