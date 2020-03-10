import React, { Component } from 'react'
import "./Style.css";

class FileDownload extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            imageName: '',
            file: null,
            url: '',
            data: null,
            load :false
        };
        this.onChangeName = this.onChangeName.bind(this);
    }

    onChangeName(e) {
        this.setState({ name: e.target.value, imageName: e.target.value});
    }

    searchFile(name){
        fetch(`http://localhost:7001/upload/${name}`)
        .then(res=>res.blob())
        .then(res=>{
            console.log("response");
            console.log(res);
            if(res.error){
                console.log(res.error);
                throw res.errow
            }else{
                const objectUrl = URL.createObjectURL(res);
                this.setState({ file: objectUrl, data: res });
                this.setState({name: ''});
            }
        })
    }

    DownloadFile(name){
        const fileURL = window.URL.createObjectURL(this.state.data);
        const tempLink = document.createElement("a");
        tempLink.href = fileURL;
        tempLink.setAttribute("download", name);
        tempLink.click();
    }
    
    render() {
            return (
                <div className="body">
                    <h1>Download an image by search</h1>
                    <div className="container">
                     <form onSubmit={this.onSubmit}>
                         <input type="text" value={this.state.name} onChange={this.onChangeName} placeholder="Type file name" aria-label="Search"/>
                         <button type="button" name="search" className="btn-success" onClick={()=>this.searchFile(this.state.name)}>Search image</button>
                    </form>
                    {this.state.file && (
                        <div>
                            <img src={this.state.file} alt="Image not found" />
                            <div>
                            <button type="button" name="search" className="button" onClick={()=>this.DownloadFile(this.state.imageName)}>download this image</button>
                            </div>
                        </div>
                    )}
                    
                    </div>
                </div>
            )

    }
}
export default FileDownload