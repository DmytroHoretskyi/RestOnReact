import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

export const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">HOME</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/add">Add</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
