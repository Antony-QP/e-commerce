import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    //   console.log(e.target.files)
    // Resize Image

    let files = e.target.files;
    let allUploadedFiles = values.images;
    console.log(allUploadedFiles);
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios.post(
              `${process.env.REACT_APP_API}/uploadImages`,
              { image: uri },
              {
                headers: {
                  authtoken: user.token,
                },
              }
            )
            .then(res => {
                console.log('IMAGE UPLOAD RES DATA', res)
                setLoading(false)
                allUploadedFiles.push(res.data)
                setValues({ ...values, images: allUploadedFiles})
            })
            .catch(err => {
                setLoading(false)
                console.log('Cloudinary error', err)
            })
          },
          "base64"
        );
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
