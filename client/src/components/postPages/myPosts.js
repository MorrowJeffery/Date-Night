import React, { Component } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../Jumbotron";
import { List, ListItem } from "../List";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentPost, getMyPosts, deletePost } from "../../actions/postActions";

class MyPosts extends Component {

  componentDidMount() {
      console.log("started ")
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
    return (
        <div className="container">
          <div className="row">
            <div className="landing-copy col s12">
            <Link to="/dashboard">Back To Dashboard</Link>
            <div className="col">
              <Jumbotron>
                  <h1>Posts: </h1>
                </Jumbotron>
                {this.props.posts.length ? (
                  <List>
                    {this.props.posts.map((post) => (
                      <ListItem key={`${post._id}`} >
                          <div className="container">
                            <strong>
                                {post.post_name}
                            </strong>
                          </div>
                          <Link to="/post/test" onClick={ () => {this.onPostClick(post._id)}}><img src={post.image} alt="" /></Link>
                          <p> {post.poster_name} </p>
                          <p>{post.description}</p>
                          <h1 className="delx" onClick={ () => {this.onXClick(post._id)}}>X</h1>
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

MyPosts.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.postData.myPosts
});

export default connect(
  mapStateToProps,
  { getMyPosts, setCurrentPost, deletePost }
)(MyPosts);
