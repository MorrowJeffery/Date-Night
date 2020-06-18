import React, { Component } from "react";
import { Link } from "react-router-dom";
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
            <h3 className="mypostheader">All Posts</h3>
              <hr/>
                {this.props.posts.length ? (
                  <ul>
                    {this.props.posts.map((post) => (
                      <>
                      <li className="postitem" key={`${post._id}`} >
                          <div className="container postcontainer" style={{padding: "5px"}}>
                            <strong className="postname">
                                {post.post_name}
                            </strong>
                          </div>
                          <Link to="/post/detail" onClick={ () => {this.onPostClick(post._id)}}><img className="postimage" src={post.image} alt="" /></Link>
                          <p className="postername"> {post.poster_name} </p>
                          <p className="allpostsitem">{post.description}</p>
                      </li>
                      <hr/>
                      </>
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
