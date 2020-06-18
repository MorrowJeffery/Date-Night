import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import brandImage from './DateNightlogo7.png';
import { Link } from 'react-router-dom';


class AppNav extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    if (this.props.auth.isAuthenticated === true) {
      return (
        <Navbar className="navMax">
          <Navbar.Brand className="brandLogoName" href="/dashboard"><img className="logo" alt="logo" src={brandImage}></img></Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="navitem" href="/dashboard">Home</Nav.Link>
              <NavDropdown className="navitem" title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item href="/settings">Go To My Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.onLogoutClick}>Logout</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown className="navitem" title="Posts" id="basic-nav-dropdown">
                <NavDropdown.Item href="/posts">See All Posts</NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.2">See Saved Posts</NavDropdown.Item> */}
                <NavDropdown.Divider />
                <NavDropdown.Item href="/submitpost">Submit A Post</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
    else {
      return (
        <Navbar className="navMax">
          <Navbar.Brand className="brandLogoName" href="/dashboard"><img className="logo" alt="logo" src={brandImage}></img></Navbar.Brand>          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link ><Link className="navitem" to="/login">Login</Link></Nav.Link>
              <Nav.Link ><Link className="navitem" to="/register">Register</Link></Nav.Link>x`
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )
    }
  
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