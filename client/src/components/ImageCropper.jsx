import { Crop, Done } from "@mui/icons-material";
import { Button, Card, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import imageCompression from "browser-image-compression";

function ImageCropper({
  src,
  enableCrop,
  setEnableCrop,
  crop,
  setCrop,
  input,
  setInput,
  setImage,
  image,
}) {
  const getCroppedImg = () => {
    let imagePreview = document.getElementById("preview");
    const scale = 1;
    const canvas = document.createElement("canvas");
    const scaleX = imagePreview.naturalWidth / imagePreview.width;
    const scaleY = imagePreview.naturalHeight / imagePreview.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    const ctx = canvas.getContext("2d");
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "low";

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const centerX = imagePreview.naturalWidth / 2;
    const centerY = imagePreview.naturalHeight / 2;

    ctx.save();

    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY);

    // 2) Scale the image
    ctx.scale(scale, scale);
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY);

    ctx.drawImage(
      imagePreview,
      0,
      0,
      imagePreview.naturalWidth,
      imagePreview.naturalHeight,
      0,
      0,
      imagePreview.naturalWidth,
      imagePreview.naturalHeight
    );

    ctx.restore();

    canvas.toBlob((blob) => {
      const file = new File([blob], input.selectedFile.name, {
        type: input.selectedFile.type,
      });
      setInput({ selectedFile: file });
    });
    setEnableCrop(!enableCrop);
  };

  // const compressImage = async () => {
  //   console.log(input.selectedFile, "file en onchange al principio es ");
  //   const options = {
  //     maxSizeMB: 5,
  //     // maxWidthOrHeight: 1920,
  //   };
  //   const compressedFile = await imageCompression(input.selectedFile, options);
  //   const file = new File([compressedFile], input.selectedFile.name, {
  //     type: input.selectedFile.type,
  //   });
  //   setInput({ selectedFile: file });
  //   console.log(input.selectedFile, "file en onchange es");
  // };

  return (
    <div>
      <Box sx={{ marginTop: 5 }}>
        <Stack display="flex" alignItems="center" gap={2}>
          {/* <Stack display="flex" flexDirection="row" gap={2}>
            <Button
              onClick={() => setEnableCrop(!enableCrop)}
              variant="contained"
              component="span"
              startIcon={<Crop />}
            >
              {enableCrop ? "Disable Crop" : "Enable Crop"}
            </Button>
            {enableCrop && (
              <Button
                onClick={getCroppedImg}
                variant="contained"
                component="span"
                color="success"
                startIcon={<Done />}
              >
                Confirm Crop
              </Button>
            )}
          </Stack> */}
          {/* {enableCrop ? ( */}
          <div

          // style={{
          //   display: "flex",
          //   flexDirection: { xs: "column", lg: "row" },
          //   justifyContent: "center",
          //   alignItems: "center",
          //   width: "90%",
          // }}
          >
            <div style={{ position: "relative", display: "inline-block" }}>
              {/* <Card> */}
              <ReactCrop
                aspect={16 / 9}
                disabled={!enableCrop}
                crop={crop}
                onChange={setCrop}
                // onComplete={compressImage}
              >
                <img style={{ maxWidth: "350px" }} id="preview" src={src} />
              </ReactCrop>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  zIndex: "5",
                }}
              >
                <IconButton
                  sx={{
                    backgroundColor: "#2196f3",
                    color: "#EDEDED",
                    "&:hover": {
                      backgroundColor: "#2979ff",
                    },
                  }}
                  title="Enable crop"
                  aria-label="crop"
                  onClick={() => setEnableCrop(!enableCrop)}
                >
                  <Crop fontSize="small" />
                </IconButton>
                {enableCrop && (
                  <IconButton
                    sx={{
                      backgroundColor: "#fff",
                      "&:hover": {
                        backgroundColor: "#EDEDED",
                      },
                    }}
                    title="Confirm crop"
                    color="success"
                    aria-label="done"
                    onClick={getCroppedImg}
                  >
                    <Done fontSize="small" />
                  </IconButton>
                )}
              </div>
            </div>
            {/* </Card> */}
          </div>
          {/* // ) : (
          //   <div>
          //     <img style={{ maxWidth: "350px" }} src={src} />
          //   </div>
          // )} */}
        </Stack>
      </Box>
    </div>
  );
}

export default ImageCropper;
