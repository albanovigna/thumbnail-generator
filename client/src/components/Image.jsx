import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import fileDownload from "js-file-download";
import { addImage, removeImage } from "../redux/actions";

function Image() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image);
  const blob = useSelector((state) => state.blob);
  const { filename } = useParams();
  const handleDownload = (e, name) => {
    e.preventDefault();
    // navigate(`http://localhost:3001/images/${name}`);
    // const [fileName] = filename.split(".");
    // fileDownload(blob.blob, `${fileName}-resized.${blob.data}`);
  };
  useEffect(() => {
    dispatch(addImage(filename));
    return () => {
      dispatch(removeImage(filename));
    };
  }, []);
  return (
    <div>
      <p>THUMBNAILS</p>
      {blob ? (
        blob.map((b) => {
          return (
            <div>
              <div>
                <img src={`http://localhost:3001/images/${b.name}`}></img>
              </div>
              <div>
                <span>{`size ${b.width}`}</span>
                <Link
                  to={`http://localhost:3001/images/${b.name}`}
                  target="_blank"
                  download
                >
                  Download
                </Link>
                {/* <button onClick={(e) => handleDownload(e, b.name)}>
                  Download
                </button> */}
              </div>
            </div>
          );
        })
      ) : (
        <div>...LOADING</div>
      )}
    </div>
  );
}

export default Image;
