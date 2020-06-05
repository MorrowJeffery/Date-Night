import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getPosts } from "../../actions/postActions";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onViewPostClick = e => {
    e.preventDefault();
    this.props.history.push("/posts")  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="container">
      <div className="row">
        <div className="landing-copy col s12">
          <h4>
            <b>Hey there,</b> {user.firstName}
            <p className="">
              You are logged in!
            </p>
          </h4>
          <button
            onClick={this.onLogoutClick}
            className="btn btn-primary"
          >
            Logout
          </button>
          <button
            onClick={this.onViewPostClick}
            className="btn btn-primary"
          >
            View Posts
          </button>
        </div>
      </div>
    </div>
    )
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { logoutUser, getPosts}
)(Dashboard);
