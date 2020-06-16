import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Jumbotron from '../Jumbotron';
import Keys from './imageKeys';
import { connect } from "react-redux";
import { savePic } from '../../actions/postActions';
import './dropzone.css';

class DropzoneForm extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          uploadedFileCloudinaryUrl: ''
        };
    }

    onImageDrop(files) {
      console.log(files);
        this.setState({
          uploadedFile: files[0]
        });
    
        this.handleImageUpload(files[0]);
      }

    handleImageUpload(file) {
        let upload = request.post(Keys.CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', Keys.CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
    
        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }
    
          if (response.body.secure_url !== '') {
            this.props.savePic(response.body.secure_url);
          }
        });
    }


    render() {

        if(this.props.savedPic === "") {
            return (
                <div className="outerbox">
                    <div className="FileUpload dropzonebox">
                        <Dropzone 
                        accept="image/*" 
                        multiple={false} 
                        onDrop={this.onImageDrop.bind(this)}
                        >
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Jumbotron>
                                    <p className="dropzonetext">Drag 'n' drop a picture here, or click to select picture</p>
                                </Jumbotron>
                            </div>
                            </section>
                        )}
                        </Dropzone>
                    </div>
                </div>
            )
        }

        else {
            return (
                <div>
                    <img src={this.props.savedPic} alt=""/>
                </div>
            )
        }

    }
}
  
  const mapStateToProps = state => ({
    savedPic: state.postData.heldPic
  });
  
  export default connect(
    mapStateToProps,
    { savePic }
  )(DropzoneForm);
  