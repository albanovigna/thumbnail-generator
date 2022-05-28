import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import fileDownload from "js-file-download";
import { addImage, removeImage } from "../redux/actions";

function Image() {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image);
  const blob = useSelector((state) => state.blob);
  const { filename } = useParams();
  const handleDownload = (e) => {
    e.preventDefault();
    const [fileName] = filename.split(".");
    fileDownload(blob.blob, `${fileName}-resized.${blob.data}`);
  };
  useEffect(() => {
    dispatch(addImage(filename));
    return () => {
      dispatch(removeImage(filename));
    };
  }, []);
  return (
    <div>
      <div>
        <img
          src={`http://localhost:3001/images/${image[0]}`}
          width="400px"
        ></img>
      </div>
      <div>
        <span>512x512</span>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}

export default Image;
