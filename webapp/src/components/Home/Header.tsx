import React from 'react';

import { Container, Navbar } from "react-bootstrap";
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <Navbar>
            <Navbar.Brand as={Link} to="/">
                <p>Clever Notes</p>
            </Navbar.Brand>
        </Navbar>
    )
}

export default Header;