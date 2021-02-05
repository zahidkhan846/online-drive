import React from "react";
import { Navbar as Navigation, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Navigation bg="light" expand="sm">
      <Navigation.Brand as={Link} to="/">
        CWZ Drive
      </Navigation.Brand>
      <Nav>
        <Nav.Link as={Link} to="/profile">
          Profile
        </Nav.Link>
      </Nav>
    </Navigation>
  );
}

export default Navbar;
