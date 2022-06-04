import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage, postImage, removeUrls } from "../redux/actions";
import Button from "@mui/material/Button";
import { Add, CloudUpload, Done } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import Logout from "./Logout";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ImageCropper from "./ImageCropper";
import PreviewImages from "./PreviewImages";
import Thumbnails from "./Thumbnails";

function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useAuth0();

  const urls = useSelector((state) => state.urls);
  const arrayFiles = [
    [400, 300],
    [160, 120],
    [120, 120],
  ];

  const [sendThumbnail, setSendThumbnail] = useState(false);

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

  useEffect(() => {
    setSendThumbnail(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log();
    formData.append("image", input.selectedFile, input.selectedFile.name);

    dispatch(postImage(formData));
    dispatch(addImage(input.selectedFile.name));
    setSendThumbnail(true);
    alert("Imagen cargada correctamente");
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
          {/* <form
            style={{ marginTop: "5%", marginBottom: "2%" }}
            onSubmit={(e) => handleSubmit(e)}
            encType="multipart/form-data"
          > */}
          <Box sx={{ marginTop: 10 }}>
            <Typography variant="h3">Thumbnail Generator</Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
              marginTop={5}
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
                  variant="contained"
                  component="span"
                  startIcon={<CloudUpload />}
                >
                  Upload image
                </Button>
              </label>
            </Stack>
          </Box>
          {/* </form> */}
          {urls.length === 0 && sendThumbnail ? (
            <div>
              <h3>...Loading</h3>
            </div>
          ) : (
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  justifyContent: "center",
                }}
              >
                {input.selectedFile && urls.length === 0 && (
                  <div>
                    <ImageCropper
                      src={preview}
                      enableCrop={enableCrop}
                      setEnableCrop={setEnableCrop}
                      crop={crop}
                      setCrop={setCrop}
                      input={input}
                      setInput={setInput}
                      setImage={setImage}
                    ></ImageCropper>
                    {/* {image && (
                    <div>
                      <img src={image} alt="cropped image" />
                    </div>
                  )} */}
                    <Button
                      onClick={(e) => handleSubmit(e)}
                      style={{ marginLeft: "2%" }}
                      variant="contained"
                      component="span"
                    >
                      Create thumbnail
                    </Button>
                  </div>
                )}
                <PreviewImages
                  input={input}
                  urls={urls}
                  arrayFiles={arrayFiles}
                  preview={preview}
                />
              </Box>
            </div>
          )}
          <Thumbnails urls={urls} arrayFiles={arrayFiles} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
