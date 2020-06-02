import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <a
              href="/"
              className="navbar-brand right"
            >
              Navbar
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
