import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getPosts } from "../../actions/postActions";
import './dashboard.css';

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
        <div className="landing-copy col s12 mainboxdiv">
          <h4>
            <b>Hey there,</b> {user.firstName}
            <p className="">
              Ready for some inspiration?
            </p>
          </h4>
          <button
            onClick={this.onLogoutClick}
            className="btn btn-primary logoutbtn"
          >
            Logout
          </button>
          <button
            onClick={this.onViewPostClick}
            className="btn btn-primary viewpostsbtn"
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
  postData: state.postData
});

export default connect(
  mapStateToProps,
  { logoutUser, getPosts}
)(Dashboard);
