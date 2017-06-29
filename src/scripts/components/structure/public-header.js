import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { words } from 'capitalize';
// import { t } from 'i18next';

export default ({ navigate, suburbs }) => {
    const sortedSuburbs = suburbs.sort();
    return (
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
                        {suburbs &&
                            <NavDropdown eventKey={3} title="Suburbs" id="basic-nav-dropdown">
                                {sortedSuburbs.valueSeq().map(suburb => <MenuItem key={suburb} eventKey={suburb} onClick={() => navigate(`/area/${suburb}`)}>{words(suburb.replace('-', ' '))}</MenuItem>)}
                            </NavDropdown>
                        }
                        <NavItem eventKey={1} className="header-action" onClick={() => navigate('/login')}>Login</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};