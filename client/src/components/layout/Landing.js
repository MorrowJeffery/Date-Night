import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              Date Night App
            </h4>
            <p className="">
              When you need a little inspiration.
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                className="btn btn-primary"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                
                className="btn btn-primary"
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
