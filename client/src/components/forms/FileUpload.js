import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = () => {

  const user = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    //   console.log(e.target.files)
    // Resize Image 
    let files = e.target.files;
    if(files) {
        for(let i = 0; i < files.length; i ++){
            Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                console.log(uri);
            }, 'base64');
        }
    }
    // Send to server to send to Cloudinary
    // Set URL to images[] in the parent component = Product Create
  };

  return (
    <div className='row'>
      <label className='btn btn-primary btn-raised'>
        Choose File
        <input
          type='file'
          name=''
          id=''
          multiple
          accept='images/*'
          onChange={fileUploadAndResize}
          hidden
        />
      </label>
    </div>
  );
};

export default FileUpload;
