import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { words } from 'capitalize';

export default ({ suburbs }) => {
    const sortedSuburbs = suburbs.filter(suburb => suburb.get('count') >= 3)
        .sort(suburb => suburb.get('url'));
    return (
        <header>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">
                            <span className="margin-right-1x">pilfberry</span>
                            <i className="fa fa-heart" />
                            <i className="fa fa-circle" style={{
                                fontSize: '12px',
                                position: 'relative',
                                left: '-21px',
                                top: '-3px',
                                color: 'white'
                            }} /><i className="fa fa-circle" style={{
                                fontSize: '9px',
                                position: 'relative',
                                left: '-32px',
                                top: '-3px'
                            }} /></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {suburbs &&
                            <NavDropdown eventKey={3} title="Suburbs" id="basic-nav-dropdown">
                                {sortedSuburbs.valueSeq().map(suburb => <LinkContainer key={suburb.get('url')} to={`/area/${suburb.get('url')}`}><MenuItem eventKey={suburb.get('url')}>{words(suburb.get('url').replace('-', ' '))}</MenuItem></LinkContainer>)}
                                <LinkContainer key="areas" to="/areas"><MenuItem eventKey="areas">More...</MenuItem></LinkContainer>
                            </NavDropdown>
                        }
                        <LinkContainer to="/login"><NavItem eventKey={1} className="header-action">Login</NavItem></LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        </header >
    );
};