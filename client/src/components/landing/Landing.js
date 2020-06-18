import React, { Component } from "react";
import { Link } from "react-router-dom";
import './landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="container divcontainer">
        <div className="row divcontainer">
          <div className="col s12 center-align maindiv">
            <h4 className="dnaname">
              Date Night App
            </h4>
            <p className="tagline">
              When you need a little inspiration.
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                className="btn btn-primary landingbtn"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                
                className="btn btn-primary landingbtn"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
