import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage, postImage, removeUrls } from "../redux/actions";
import { Link } from "react-router-dom";
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
import { Oval } from "react-loader-spinner";
import imageCompression from "browser-image-compression";
import Image from "./Image";

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

  const compressImage = async () => {
    console.log(input.selectedFile, "file en onchange al principio es ");
    const options = {
      maxSizeMB: 5,
      // maxWidthOrHeight: 1920,
    };
    const compressedFile = await imageCompression(input.selectedFile, options);
    const file = new File([compressedFile], input.selectedFile.name, {
      type: input.selectedFile.type,
    });
    setInput({ selectedFile: file });
    console.log(input.selectedFile, "file en onchange es");
  };

  useEffect(() => {
    if (!input.selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(input.selectedFile);
    setPreview(objectUrl);
    console.log(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [input]);
  //

  useEffect(() => {
    setSendThumbnail(false);
  }, []);

  const validateImage = (file) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetypes = filetypes.test(file.type);
    const filesize = file.size < 3000000;
    if (mimetypes && filesize) {
      return true;
    } else {
      if (!mimetypes)
        return alert("El archivo tiene que ser de tipo jpg o png");
      if (!filesize) return alert("El archivo tiene que pesar menos de 5Mb");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(removeUrls());
    setSendThumbnail(false);
    setImage(null);
    console.log("target value es", e.target.files[0]);

    e.target.files[0] !== undefined && validateImage(e.target.files[0])
      ? setInput({ selectedFile: e.target.files[0] })
      : // : setInput({ selectedFile: null });
        null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 4,
      // maxWidthOrHeight: 1920,
    };
    const compressedFile = await imageCompression(input.selectedFile, options);
    const file = new File([compressedFile], input.selectedFile.name, {
      type: input.selectedFile.type,
    });
    console.log(file, "file es");
    setInput({ selectedFile: file });
    if (file) {
      const formData = new FormData();
      // formData.append("image", input.selectedFile, input.selectedFile.name);
      formData.append("image", file, file.name);
      dispatch(postImage(formData));
      dispatch(addImage(input.selectedFile.name));
      setSendThumbnail(true);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Oval
          ariaLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={5}
          color="blue"
          secondaryColor="white"
        />
      </div>
    );
  }
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <AppBar>
            <Toolbar
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">Thumbnail Generator</Typography>
              <Logout></Logout>
            </Toolbar>
          </AppBar>
          {/* <form
            style={{ marginTop: "5%", marginBottom: "2%" }}
            onSubmit={(e) => handleSubmit(e)}
            encType="multipart/form-data"
          > */}
          <Box sx={{ marginTop: 10 }}>
            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              // spacing={2}
              // marginTop={5}
            >
              <input
                type="file"
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

          <Box
            sx={{
              // backgroundColor: "red",
              height: { xs: "100%", lg: "80vh" },
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              justifyContent: { xs: "center", lg: "space-around" },
              alignItems: "center",
            }}
          >
            {/* {input.selectedFile && urls.length === 0 && ( */}
            {input.selectedFile && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <ImageCropper
                  disabled={false}
                  src={preview}
                  enableCrop={enableCrop}
                  setEnableCrop={setEnableCrop}
                  crop={crop}
                  setCrop={setCrop}
                  input={input}
                  setInput={setInput}
                  setImage={setImage}
                ></ImageCropper>
                {/* <Image
                  src={preview}
                  enableCrop={enableCrop}
                  setEnableCrop={setEnableCrop}
                  crop={crop}
                  setCrop={setCrop}
                  input={input}
                  setInput={setInput}
                  setImage={setImage}
                /> */}
                {/* <Box marginTop={2}> */}
                <Button
                  onClick={(e) => handleSubmit(e)}
                  variant="contained"
                  component="span"
                >
                  Create thumbnail
                </Button>
                {/* </Box> */}
              </div>
            )}

            {/* )} */}
            <PreviewImages
              sendThumbnail={sendThumbnail}
              input={input}
              urls={urls}
              arrayFiles={arrayFiles}
              preview={preview}
            />
          </Box>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
