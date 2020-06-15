import React, { Component } from "react";
import Jumbotron from "../Jumbotron";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";

class PostDetail extends Component {

  componentDidMount() {
      this.props.getPost(this.props.currentPost);      
    }

  render() {
    const { user } = this.props.auth;
    return (
        <div className="container">
          <div className="row">
            <div className="landing-copy col s12">
            <Link to="/posts">Back To Posts</Link>
            <div className="col">
                {this.props.posts.length ? (
                    <Jumbotron>
                        <h1>{this.props.posts[0].post_name}</h1>
                        <img src={this.props.posts[0].image} alt=""/>
                        <p> {this.props.posts[0].poster_name} </p>
                        <p> {this.props.posts[0].description} </p>
                    </Jumbotron>
                ) : (
                  <h3>Loading...</h3>
                )}
            </div>
  
            </div>
          </div>
        </div>
      )
  }
}

PostDetail.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.postData.postDetail,
  currentPost: state.postData.currentPost
});

export default connect(
  mapStateToProps,
  { getPost }
)(PostDetail);
