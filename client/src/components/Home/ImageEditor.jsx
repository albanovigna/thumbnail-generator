import { Button, Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import ImageCropper from "../ImageCropper/ImageCropper";
import styles from "../Home/Home.module.css";
import { useDispatch } from "react-redux";
import { addImage, postImage } from "../../redux/actions";
import imageCompression from "browser-image-compression";

function ImageEditor({
  preview,
  enableCrop,
  setEnableCrop,
  input,
  setInput,
  setSendThumbnail,
  sendThumbnail,
}) {
  const dispatch = useDispatch();
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
      setEnableCrop(false);
    }
  };
  return (
    <div>
      {input.selectedFile && (
        <div className={styles.contentDiv}>
          <Card
            sx={{
              maxWidth: 345,
              marginBottom: { xs: "20px", lg: "0px" },
              boxShadow: "0px 3px 15px  grey",
            }}
          >
            <CardHeader title="Edit Image" />

            <ImageCropper
              src={preview}
              enableCrop={enableCrop}
              setEnableCrop={setEnableCrop}
              input={input}
              setInput={setInput}
            ></ImageCropper>
            {!sendThumbnail && (
              <Button
                sx={{ marginTop: "10px", marginBottom: "10px" }}
                onClick={(e) => handleSubmit(e)}
                variant="contained"
                component="span"
              >
                Create thumbnail
              </Button>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

export default ImageEditor;
