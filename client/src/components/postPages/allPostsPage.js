import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../Jumbotron";
import { List, ListItem } from "../List";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts, setCurrentPost } from "../../actions/postActions";
import './posts.css';

class allPosts extends Component {

  componentDidMount() {
      this.props.getPosts();      
    }

  onPostClick(id) {
    this.props.setCurrentPost(id);
  }

  render() {
    return (
        <div className="container outerbox">
          <div className="row">
            <div className="landing-copy col s12">
            <div className="divcol1">
                  <h1>Posts: </h1>
                {this.props.posts.length ? (
                  <ul>
                    {this.props.posts.map((post) => (
                      <li key={`${post._id}`} >
                          <div className="container eachpostbox">
                          <div className="nameholderdiv">
                                <strong>
                                    {post.post_name}
                                </strong>
                              </div>
                            <div className="row">
                              <Link to="/post/test" onClick={ () => {this.onPostClick(post._id)}}><img className="postimage" src={post.image} alt="" /></Link>
                              <p className="desctext"> {post.description} </p>
                            </div>
                            <div className="row">
                              <p className="postername">{post.poster_name}</p>
                            </div>
                          </div>
                      </li>
                    ))}
                  </ul>
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.postData.posts
});

export default connect(
  mapStateToProps,
  { getPosts, setCurrentPost }
)(allPosts);
