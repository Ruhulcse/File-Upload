import React, { Component } from 'react';
import axios from 'axios';
export default class Upload extends Component {
    constructor(props) {
        super(props);
     
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
     
        this.state = {
            image: ''
        }
      }
     
      onFileChange(e) {
          this.setState({ image: e.target.files[0] })
      }
     
      onSubmit(e) {
          e.preventDefault()
          const formData = new FormData()
          formData.append('image', this.state.image)
          console.log(formData);
          axios.post("http://localhost:7001/upload", formData, {
          }).then(res => {
              console.log(res)
          })
      }
    
    
     
      render() {
        return (
          <div className="container">
            <h3>Upload file</h3>
            <hr/>
            <div className="row" style={{marginTop:'40px'}}>
            <div className="col-md-4 offset-md-4">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="file" onChange={this.onFileChange} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Upload</button>
                </div>
              </form>
            </div>
            </div>
          </div>
        )
      }
}
