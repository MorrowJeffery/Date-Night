import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import './register.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      username: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      window.location.href("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      age: this.state.age,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container divcontainer" style={{backgroundColor: "#0b7d99", paddingBottom: "10px"}}>
        <div className="row">
          <div className="col s8 offset-s2">

            <div className="col firstcontentholder" >
              <h4>
                <b>Register</b> below
              </h4>

              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
      
            </div>

            <form noValidate onSubmit={this.onSubmit}>

              <div className="form-group col s12 registerform">
                <input
                  onChange={this.onChange}
                  value={this.state.firstName}
                  error={errors.name}
                  id="firstName"
                  type="text"
                  className={classnames("inlineitem", {
                    invalid: errors.firstName
                  })}
                />
                <label className="labelitem" htmlFor="firstName">First Name</label>
                <span className="red-text">{errors.firstName}</span>
              </div>

              <div className="form-group col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.lastName}
                  error={errors.lastName}
                  id="lastName"
                  type="text"
                  className={classnames("inlineitem", {
                    invalid: errors.lastName
                  })}
                />
                <label className="labelitem" htmlFor="lastName">Last Name</label>
                <span className="red-text">{errors.lastName}</span>
              </div>

              <div className="form-group col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("inlineitem", {
                    invalid: errors.email
                  })}
                />
                <label className="labelitem" htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>

              <div className="form-group col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.age}
                  error={errors.age}
                  id="age"
                  type="text"
                  className={classnames("inlineitem", {
                    invalid: errors.age
                  })}
                />
                <label className="labelitem" htmlFor="age">Age</label>
                <span className="red-text">{errors.age}</span>
              </div>

              <div className="form-group col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  className={classnames("inlineitem", {
                    invalid: errors.username
                  })}
                />
                <label className="labelitem" htmlFor="username">Username</label>
                <span className="red-text">{errors.username}</span>
              </div>

              <div className="form-group col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("inlineitem", {
                    invalid: errors.password
                  })}
                />
                <label className="labelitem" htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>

              <div className="form-group col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("inlineitem", {
                    invalid: errors.password2
                  })}
                />
                <label className="labelitem" htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>

              <div className="col s12">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
