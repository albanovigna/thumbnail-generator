import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addImage, postImage } from "../redux/actions";
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

  const blob = useSelector((state) => state.blob);
  const arrayFiles = [
    [400, 300],
    [160, 120],
    [120, 120],
  ];

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

  // useEffect(() => {
  //   dispatch(addImage(input.selectedFile.name));
  //   return () => {
  //     dispatch(removeImage(input.selectedFile.name));
  //   };
  // }, []);
  const handleChange = (e) => {
    e.preventDefault();
    setInput({ selectedFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", input.selectedFile, input.selectedFile.name);

    dispatch(postImage(formData));
    dispatch(addImage(input.selectedFile.name));
    alert("Imagen enviada correctamente");
    setPreview(null);
    // navigate(`/image/${input.selectedFile.name}`);
  };

  if (isLoading) {
    return <h2>...Is Loading</h2>;
  }
  return (
    <div>
      {/* {isAuthenticated ? <Logout /> : <Login />} */}
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
            {/* <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleChange(e)}
            /> */}
            {/* <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleChange(e)}
            />
            <Button onClick={(e) => handleSubmit(e)} variant="contained">
              Upload
            </Button> */}
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
            {input.selectedFile && (
              <div>
                <span>Original Image</span>
                <ReactCrop crop={crop} onChange={setCrop}>
                  <img src={preview} width="400px" />
                </ReactCrop>
              </div>
            )}
          </div>
          {console.log(arrayFiles, "array files")}
          <Box
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            {input.selectedFile &&
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
                      src={preview}
                      width={`${x[0]}px`}
                      height={`${x[1]}px`}
                    ></img>
                  </div>
                );
              })}
          </Box>
        </div>
      ) : (
        <Login />
      )}
      {/* <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleChange(e)}
        />
        <Button onClick={(e) => handleSubmit(e)} variant="contained">
          Upload
        </Button>
      </form>
      <div>
        {input.selectedFile && (
          <div>
            <span>Original Image</span>
            <ReactCrop crop={crop} onChange={setCrop}>
              <img src={preview} width="400px" />
            </ReactCrop>
          </div>
        )}
      </div>
      {console.log(arrayFiles, "array files")}
      <Box
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {input.selectedFile &&
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
                  src={preview}
                  width={`${x[0]}px`}
                  height={`${x[1]}px`}
                ></img>
              </div>
            );
          })}
      </Box>
    </div> */}
    </div>
  );
}

export default Home;
