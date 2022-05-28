import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import fileDownload from "js-file-download";

function Image() {
  const image = useSelector((state) => state.image);
  const blob = useSelector((state) => state.blob);
  const { filename } = useParams();
  console.log(filename, "filename");
  const handleDownload = (e) => {
    e.preventDefault();
    const [fileName] = filename.split(".");
    fileDownload(blob.blob, `${fileName}-resized.${blob.data}`);
  };
  // const [fileName] = filename.split(".");
  // fileDownload(blob.blob, `${fileName}-resized.${blob.data}`);
  return (
    <div>
      <div>
        <img
          src={`http://localhost:3001/images/${image[0]}`}
          width="400px"
        ></img>
      </div>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default Image;
