import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Jumbotron from '../Jumbotron';
import Keys from './imageKeys';

export default class DropzoneForm extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          uploadedFileCloudinaryUrl: ''
        };
    }

    onImageDrop(files) {
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
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url
            });
          }
        });
    }


    render() {
        return (
            <>

            <div>
            <div className="FileUpload">
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
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </Jumbotron>
                </div>
                </section>
            )}
            </Dropzone>
            </div>
      
            <div>
              {this.state.uploadedFileCloudinaryUrl === '' ? null :
              <div>
                <p>{this.state.uploadedFile.name}</p>
                <img src={this.state.uploadedFileCloudinaryUrl} />
              </div>}
            </div>
          </div>
          </>
        )
    }
}
