import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addImage, postImage } from "../../redux/actions";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Login/Login";
import { AppBar, Box, Card, Stack, Toolbar, Typography } from "@mui/material";
import ImageCropper from "../ImageCropper/ImageCropper";
import PreviewImages from "../PreviewImages/PreviewImages";
import { Oval } from "react-loader-spinner";
import imageCompression from "browser-image-compression";
import styles from "../Home/Home.module.css";
import UploadButton from "./UploadButton";
import NavBar from "./NavBar";

function Home() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useAuth0();

  const urls = useSelector((state) => state.urls);
  const filesDimensions = [
    [400, 300],
    [160, 120],
    [120, 120],
  ];

  const [sendThumbnail, setSendThumbnail] = useState(false);

  const [enableCrop, setEnableCrop] = useState(false);

  const [input, setInput] = useState({ selectedFile: null });

  const [preview, setPreview] = useState();

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
    setSendThumbnail(false);
  }, []);

  const compressImage = async () => {
    const options = {
      maxSizeMB: 4,
    };
    const compressedFile = await imageCompression(input.selectedFile, options);
    const file = new File([compressedFile], input.selectedFile.name, {
      type: input.selectedFile.type,
    });
    return file;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = await compressImage();
    setInput({ selectedFile: file });
    if (file) {
      const formData = new FormData();
      formData.append("image", file, file.name);
      dispatch(postImage(formData));
      dispatch(addImage(input.selectedFile.name));
      setSendThumbnail(true);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loaderDiv}>
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
          <NavBar />
          <UploadButton
            setSendThumbnail={setSendThumbnail}
            setInput={setInput}
          />
          <Box
            sx={{
              height: { xs: "100%", lg: "80vh" },
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              justifyContent: { xs: "center", lg: "space-around" },
              alignItems: "center",
            }}
          >
            {input.selectedFile && (
              <div className={styles.contentDiv}>
                <Card
                  sx={{
                    maxWidth: 345,
                    marginBottom: { xs: "20px", lg: "0px" },
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
                  ></ImageCropper>
                  <Button
                    sx={{ marginTop: "10px", marginBottom: "10px" }}
                    onClick={(e) => handleSubmit(e)}
                    variant="contained"
                    component="span"
                  >
                    Create thumbnail
                  </Button>
                </Card>
              </div>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {preview && (
                <div>
                  <Typography
                    sx={{ display: { lg: "none" }, color: "#fff" }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    Thumbnails
                  </Typography>
                  <Card sx={{ marginBottom: "50px", padding: "20px" }}>
                    <PreviewImages
                      sendThumbnail={sendThumbnail}
                      input={input}
                      urls={urls}
                      filesDimensions={filesDimensions}
                      preview={preview}
                    />
                  </Card>
                </div>
              )}
            </Box>
          </Box>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
