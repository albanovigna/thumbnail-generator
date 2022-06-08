import { Crop, Done } from "@mui/icons-material";
import { Button, Card, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

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
    const scale = 1;
    const canvas = document.createElement("canvas");
    const scaleX = imagePreview.naturalWidth / imagePreview.width;
    const scaleY = imagePreview.naturalHeight / imagePreview.height;
    const pixelRatio = window.devicePixelRatio;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    const ctx = canvas.getContext("2d");
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

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

    // ctx.drawImage(
    //   imagePreview,
    //   crop.x * scaleX,
    //   crop.y * scaleY,
    //   crop.width * scaleX,
    //   crop.height * scaleY,
    //   0,
    //   0,
    //   crop.width,
    //   crop.height
    // );

    canvas.toBlob((blob) => {
      setImage(URL.createObjectURL(blob));
      const file = new File([blob], input.selectedFile.name, {
        // type: input.selectedFile.type,
        type: "image/png",
      });
      console.log("file es ", file);
      setInput({ selectedFile: file });
    });
    setEnableCrop(!enableCrop);
  };

  const theme = createTheme({
    palette: {
      primary: {
        light: "",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#e3f2fd",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });
  const color = blue[50];

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
                maxWidth={400}
                maxHeight={300}
                disabled={!enableCrop}
                crop={crop}
                onChange={setCrop}
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
