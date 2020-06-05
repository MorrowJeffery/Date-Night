import React, { Component } from "react";
import Jumbotron from "../Jumbotron";
import { List, ListItem } from "../List";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getPosts } from "../../actions/postActions";

class allPosts extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         posts: []
    //     };
    //   }

  componentDidMount() {
      this.props.getPosts();      
    }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  backToDash = e => {
    e.preventDefault();
    window.location.href = "./dashboard";
  };

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
                onClick={this.backToDash}
                className="btn btn-primary"
              >
                Back to Dashboard
              </button>
            <div className="col">
              <Jumbotron>
                  <h1>Posts: </h1>
                </Jumbotron>
                {this.props.posts.length ? (
                  <List>
                    {this.props.posts.map((post, i) => (
                      <ListItem key={`${post._id}`} >
                          <img src={post.image} />
                          <p>{post._id}</p>
                        <a href={"/api/posts/:" + post._id}>
                          <strong>
                            {post.post_name}
                          </strong>
                          <p>
                            {post.description}
                          </p>
                        </a>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <h3>No Results to Display</h3>
                )}
            </div>
  
            </div>
          </div>
        </div>
      )
  }
}

allPosts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { logoutUser, getPosts }
)(allPosts);
