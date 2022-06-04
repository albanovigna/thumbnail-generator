import { Crop, Done } from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function ImageCropper({
  src,
  enableCrop,
  setEnableCrop,
  crop,
  setCrop,
  input,
  setInput,
  setImage,
}) {
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
    setEnableCrop(!enableCrop);
  };
  return (
    <div>
      <Box sx={{ marginTop: 5 }}>
        <span>Thumbnail</span>
        <Stack display="flex" alignItems="center" gap={2}>
          <Button
            onClick={() => setEnableCrop(!enableCrop)}
            variant="contained"
            component="span"
            startIcon={<Crop />}
          >
            {enableCrop ? "Disable Crop" : "Enable Crop"}
          </Button>

          {enableCrop ? (
            <div
              style={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
              }}
            >
              <ReactCrop crop={crop} onChange={setCrop}>
                <img id="preview" src={src} width="350" />
              </ReactCrop>
              {/* <Button
                variant="contained"
                component="span"
                onClick={getCroppedImg}
                startIcon={<Crop />}
              >
                Crop Image
              </Button> */}
              <IconButton
                onClick={getCroppedImg}
                aria-label="done"
                size="medium"
                color="success"
                sx={{ width: "40px", height: "40px" }}
              >
                <Done sx={{ fontSize: "40px" }} />
              </IconButton>
            </div>
          ) : (
            <div>
              <img src={src} width="350" />
            </div>
          )}
        </Stack>
      </Box>
    </div>
  );
}

export default ImageCropper;
