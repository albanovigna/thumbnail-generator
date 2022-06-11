import { Co2Sharp, Crop, Done } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import styles from "../ImageCropper/ImageCropper.module.css";

function ImageCropper({ src, enableCrop, setEnableCrop, input, setInput }) {
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
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

    crop.width > 0
      ? canvas.toBlob((blob) => {
          const file = new File([blob], input.selectedFile.name, {
            type: input.selectedFile.type,
          });
          setInput({ selectedFile: file });
        })
      : null;
    setEnableCrop(!enableCrop);
  };

  return (
    <div>
      <Box>
        <Stack display="flex" alignItems="center" gap={2}>
          <div>
            <div className={styles.mainDiv}>
              <ReactCrop
                aspect={16 / 9}
                disabled={!enableCrop}
                crop={crop}
                onChange={setCrop}
              >
                <img id="preview" src={src} />
              </ReactCrop>

              <div className={styles.editorButtons}>
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
          </div>
        </Stack>
      </Box>
    </div>
  );
}

export default ImageCropper;
