import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './newPost.css';
import DropZoneForm from '../imageManipulation/dropzone';
import { savePost, updateUserPost } from '../../actions/postActions';
import { Link } from 'react-router-dom';

class newPost extends Component {
    constructor() {
        super();
        this.state = {
          dateName: "",
          dateDesc: ""
        };
      }

      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    onPostClick = e => {
        e.preventDefault()

        const dateData = {
            image: this.props.postData.heldPic,
            post_name: this.state.dateName,
            description: this.state.dateDesc,
            poster: this.props.auth.user.id,
            poster_name: (this.props.auth.user.username),
          };
          this.props.savePost(dateData);
    }

    render() {

      if (this.props.postData.successfulPost !== "false") {
        if (this.props.postData.userUpdate !== "true") {
          this.props.updateUserPost(this.props.auth.user.id, this.props.postData.successfulPost)
        }
        return(
          <div>
              <h1>Posted Successfully</h1>
              <Link to="/posts">Go to posts</Link>
          </div>

        )
      }

      else {
      
        return(
            <div className="container">
                <DropZoneForm className="dropholder" />
                <div className="formholderdiv">
                  <Form>
                      <Form.Group>
                          <Form.Label>Date Name</Form.Label>
                          <Form.Control id="dateName" onChange={this.onChange} value={this.state.dateName} type="text" placeholder="Name of date idea" />
                      </Form.Group>
                      <Form.Group>
                          <Form.Label>Description</Form.Label>
                          <Form.Control id="dateDesc" onChange={this.onChange} value={this.state.dateDesc} as="textarea" rows="3" placeholder="Describe the date"/>
                      </Form.Group>

                      <Form.Text className="text-muted submitlabel">
                          Anyone can see this post once submitted
                      </Form.Text>
                      <Link to="/posts" className="submitbutton" onClick={this.onPostClick}>Submit</Link>
                  </Form>
                </div>
            </div>
        )
    }
  }
}

newPost.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  postData: state.postData,
});

export default connect(
  mapStateToProps,
  { savePost, updateUserPost }
)(newPost);
