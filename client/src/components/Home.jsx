import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addImage, postImage, removeUrls } from "../redux/actions";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import Logout from "./Logout";
import { AppBar, Input, Toolbar } from "@mui/material";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  const urls = useSelector((state) => state.urls);
  const arrayFiles = [
    [400, 300],
    [160, 120],
    [120, 120],
  ];

  const [enableCrop, setEnableCrop] = useState(false);

  const [input, setInput] = useState({ selectedFile: null });

  const [preview, setPreview] = useState();

  const [image, setImage] = useState();

  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!input.selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(input.selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [input]);
  //

  useEffect(() => {
    dispatch(removeUrls());
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    setImage(null);
    console.log("target value es", e.target.files[0]);
    setInput({ selectedFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log();
    formData.append("image", input.selectedFile, input.selectedFile.name);

    dispatch(postImage(formData));
    dispatch(addImage(input.selectedFile.name));
    alert("Imagen cargada correctamente");
  };

  const getCroppedImg = () => {
    let imagePreview = document.getElementById("preview");
    const canvas = document.createElement("canvas");
    const scaleX = imagePreview.naturalWidth / imagePreview.width;
    const scaleY = imagePreview.naturalHeight / imagePreview.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    // draw rotated image and store data.
    ctx.drawImage(
      imagePreview,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob((blob) => {
      setImage(URL.createObjectURL(blob));
      const file = new File([blob], input.selectedFile.name, {
        type: input.selectedFile.type,
      });
      setInput({ selectedFile: file });
    });
    console.log("INPUT EN CANVA ES: ", input.selectedFile);
  };

  if (isLoading) {
    return <h2>...Is Loading</h2>;
  }
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <AppBar>
            <Toolbar>
              <Logout></Logout>
            </Toolbar>
          </AppBar>
          <form
            style={{ marginTop: "5%", marginBottom: "2%" }}
            onSubmit={(e) => handleSubmit(e)}
            encType="multipart/form-data"
          >
            <input
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="contained-button-file">
              <Button
                // onClick={(e) => handleSubmit(e)}
                variant="contained"
                component="span"
              >
                Upload
              </Button>
            </label>
            <Button
              onClick={(e) => handleSubmit(e)}
              style={{ marginLeft: "2%" }}
              variant="contained"
              component="span"
            >
              Send
            </Button>
          </form>
          <div>
            {input.selectedFile && urls.length === 0 && (
              <div>
                <span>Original Image</span>
                <button onClick={() => setEnableCrop(!enableCrop)}>
                  {enableCrop ? "Disable Crop" : "Enable Crop"}
                </button>
                {enableCrop ? (
                  <div>
                    <ReactCrop crop={crop} onChange={setCrop}>
                      <img id="preview" src={preview} width="400px" />
                    </ReactCrop>
                    <button onClick={getCroppedImg}>Crop Image</button>
                  </div>
                ) : (
                  <div>
                    <img src={preview} width="400px" />
                  </div>
                )}
                {/* //{" "}
                <ReactCrop crop={crop} onChange={setCrop}>
                  // <img id="preview" src={preview} width="400px" />
                  //{" "}
                </ReactCrop>
                // <button onClick={getCroppedImg}>Crop Image</button> */}
                {image && (
                  <div>
                    <img src={image} alt="cropped image" />
                  </div>
                )}
              </div>
              // <ImageCropper src={preview}></ImageCropper>
            )}
          </div>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {input.selectedFile &&
              urls.length === 0 &&
              arrayFiles.map((x, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      marginBottom: "10%",
                      marginTop: "5%",
                    }}
                  >
                    <span
                      style={{
                        alignSelf: "center",
                      }}
                    >{`${x[0]} x ${x[1]} px`}</span>
                    <img
                      style={{ filter: "blur(4px)" }}
                      src={preview}
                      width={`${x[0]}px`}
                      height={`${x[1]}px`}
                    ></img>
                  </div>
                );
              })}
          </Box>
          {urls &&
            urls.length > 0 &&
            arrayFiles.map((x, i) => {
              return (
                <div
                  key={i}
                  style={{
                    marginBottom: "10%",
                    marginTop: "5%",
                  }}
                >
                  <span
                    style={{
                      alignSelf: "center",
                    }}
                  >{`${x[0]} x ${x[1]} px`}</span>
                  <img
                    src={urls[i].Location}
                    width={`${x[0]}px`}
                    height={`${x[1]}px`}
                  ></img>
                  <a
                    href={`http://localhost:3001/download/${urls[i].Key}`}
                    target="_blank"
                  >
                    Download the File
                  </a>
                </div>
              );
            })}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
