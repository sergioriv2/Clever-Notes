import React, { useContext } from "react";

import { Container, Image, Navbar, Nav, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginContext from "../context/LoginContext";

import logo from "../images/logo.png";
import "./Header.css";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const { storedValue } = useContext(LoginContext);

  return (
    <Navbar className="headerContainer">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image src={logo} fluid style={{ maxWidth: "200px" }} />
        </Navbar.Brand>
        <Navbar.Collapse>
          <Container fluid>
            <Nav>
              <Container>
                <Row>
                  <Col className="d-none d-md-flex" sm={8}>
                    <Nav.Link as={Link} to="/" className="navLink">
                      Active Notes
                    </Nav.Link>
                    <Nav.Link as={Link} to="archived" className="navLink">
                      Archived Notes
                    </Nav.Link>
                  </Col>
                  <Col className="d-flex justify-content-end">
                    {!storedValue ? (
                      <LoginButton></LoginButton>
                    ) : (
                      <LogoutButton></LogoutButton>
                    )}
                  </Col>
                </Row>
              </Container>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
