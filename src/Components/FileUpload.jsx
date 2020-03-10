import React, { Component } from "react";
import "./Style.css";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
 
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    console.log(this.state.file);
    formData.append("myFile", this.state.file);
    console.log(formData);

    fetch("http://localhost:7001/upload",{
      method: "POST",
      mode:'no-cors',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
 
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
 
  render() {
    return (
      <div className="background">
        <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 mt-3 mb-3">
            <p className="h1 mt-3">File Upload</p>
          </div>
 
          <div className="input-group w-50">
            <div className="input-group-prepend"></div>
 
            <form
              method="POST"
              onSubmit={this.onFormSubmit}
              encType="multipart/form-data"
              className="md-form"
            >
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  name="myFile"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={this.onChange}
                  // onChange={e => this.onChangeHandler(e)}
                multiple />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Uplaod your file
                </label>
                <button className="btn btn-success" type="submit">Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
 
 