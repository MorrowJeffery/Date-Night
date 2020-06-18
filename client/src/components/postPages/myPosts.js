import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentPost, getMyPosts, deletePost } from "../../actions/postActions";
import './posts.css';

class MyPosts extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onViewPostClick = e => {
    e.preventDefault();
    this.props.history.push("/posts")  };

  componentDidMount() {
      this.props.getMyPosts(this.props.auth.user.id);      
    }

  onPostClick(id) {
    this.props.setCurrentPost(id);
  }

  onXClick(id) {
    this.props.deletePost(id);
    window.location.reload();
  }

  render() {
    const { user } = this.props.auth;

    return (
        <div className="container" style={{padding: "5px"}}>
          <div className="container" style={{padding: "5px"}}>
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
                  className="btn upload"
                >
                  Logout
                </button>
                <button
                  onClick={this.onViewPostClick}
                  className="btn upload"
                >
                  View Posts
                </button>
                <Link to="/submitpost"><button className="btn upload">Upload</button></Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="landing-copy col s12">
            <div className="col">
              <h3 className="mypostheader">My Posts</h3>
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
                          <Link to="/post/test" onClick={ () => {this.onPostClick(post._id)}}><img className="postimage" src={post.image} alt="" /></Link>
                          <p className="postername"> {post.poster_name} </p>
                          <p>{post.description}</p>
                          <button className="delx delbtn" onClick={ () => {this.onXClick(post._id)}}>Delete Post</button>
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

MyPosts.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.postData.myPosts
});

export default connect(
  mapStateToProps,
  { getMyPosts, setCurrentPost, deletePost, logoutUser }
)(MyPosts);
