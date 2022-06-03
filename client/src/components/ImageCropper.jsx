import React, { createRef, useEffect, useState } from "react";
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
      <span>Thumbnail</span>
      <button onClick={() => setEnableCrop(!enableCrop)}>
        {enableCrop ? "Disable Crop" : "Enable Crop"}
      </button>
      {enableCrop ? (
        <div>
          <ReactCrop crop={crop} onChange={setCrop}>
            <img id="preview" src={src} width="400px" />
          </ReactCrop>
          <button onClick={getCroppedImg}>Crop Image</button>
        </div>
      ) : (
        <div>
          <img src={src} width="400px" />
        </div>
      )}
    </div>
  );
}

export default ImageCropper;
