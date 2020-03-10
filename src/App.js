import React from 'react';
import './App.css';
import FileUpload from './Components/FileUpload';
import FileDownload from './Components/FileDownload';
function App() {
  return (
    <div className="App">
      <FileUpload/>
      <FileDownload/>
    </div>
  );
}

export default App;
