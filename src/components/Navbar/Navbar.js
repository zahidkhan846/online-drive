import React from "react";
import { Navbar as Navigation, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../Navbar/Navbar.css";

function Navbar() {
  return (
    <Navigation bg="dark" expand="sm">
      <Navigation.Brand as={Link} to="/">
        <img className="logo" src={logo} alt="CWZ Drive" />
        <span className="text-light p-2">CWZ Drive</span>
      </Navigation.Brand>
      <Nav>
        <Nav.Link
          className="btn btn-primary px-3 text-light"
          as={Link}
          to="/profile"
        >
          Profile
        </Nav.Link>
      </Nav>
    </Navigation>
  );
}

export default Navbar;
