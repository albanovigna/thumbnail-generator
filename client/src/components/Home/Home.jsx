import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "../Login/Login";
import { Box } from "@mui/material";
import { Oval } from "react-loader-spinner";
import styles from "../Home/Home.module.css";
import UploadButton from "./UploadButton";
import NavBar from "./NavBar";
import ImageEditor from "./ImageEditor";
import Thumbnails from "./Thumbnails";
import InitialImage from "./InitialImage";
import NewThumbnailButton from "./NewThumbnailButton";
import { removeImages } from "../../redux/actions";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();

  const { isAuthenticated, isLoading } = useAuth0();

  const [sendThumbnail, setSendThumbnail] = useState(false);

  const [enableCrop, setEnableCrop] = useState(false);

  const [input, setInput] = useState({ selectedFile: null });

  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    dispatch(removeImages());
    if (!input.selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(input.selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [input]);

  useEffect(() => {
    setSendThumbnail(false);
  }, []);

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
          {!sendThumbnail && (
            <UploadButton
              setSendThumbnail={setSendThumbnail}
              setInput={setInput}
            />
          )}
          {!input.selectedFile && <InitialImage />}
          <Box
            sx={{
              height: { xs: "100%", lg: "80vh" },
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              justifyContent: { xs: "center", lg: "space-evenly" },
              alignItems: "center",
              marginTop: sendThumbnail ? "100px" : "0px",
            }}
          >
            {!sendThumbnail && (
              <ImageEditor
                preview={preview}
                enableCrop={enableCrop}
                setEnableCrop={setEnableCrop}
                input={input}
                setInput={setInput}
                setSendThumbnail={setSendThumbnail}
              />
            )}

            <Thumbnails
              sendThumbnail={sendThumbnail}
              input={input}
              preview={preview}
            />
          </Box>
          {sendThumbnail && (
            <NewThumbnailButton
              setInput={setInput}
              setSendThumbnail={setSendThumbnail}
            />
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Home;
