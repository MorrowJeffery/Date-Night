import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class AppNav extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    return (
      <Navbar className="navMax" expand="lg">
        <Navbar.Brand className="brandLogoName" href="/dashboard">Date Night</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Go To My Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.onLogoutClick}>Logout</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Posts" id="basic-nav-dropdown">
              <NavDropdown.Item href="/posts">See All Posts</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">See Saved Posts</NavDropdown.Item>
              <NavDropdown.Item href="/myposts">My Posts</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/submitpost">Submit A Post</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

AppNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AppNav);