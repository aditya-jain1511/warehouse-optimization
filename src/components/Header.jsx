import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';

const Header = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    return (
        <div className="align-items-center">
        <div className="row align-items-center">
            <div className='col-12'>
                <Navbar expand="md" dark className="nav-bar" color='secondary'>
                    <div className="navigation-top">
                        <NavbarBrand className='logo' href="/">WareHouse Optimization</NavbarBrand>
                    </div>
                    <NavbarToggler onClick={toggleNav} />
                    <Collapse isOpen={isNavOpen} navbar>
                        <Nav className="ms-auto" navbar>
                            <NavItem>
                                <Link className='nav-link' to="/">MUAR-WAREHOUSE</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        </div>
    </div>
    )
}

export default Header
