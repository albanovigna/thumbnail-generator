import React, { createRef, useEffect, useState } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

function ImageCropper({ src }) {
  const [imageDestination, setImageDestination] = useState("");

  const image = document.getElementById("image");
  const cropper = new Cropper(image, {
    aspectRatio: 16 / 9,
    crop(event) {
      console.log(event.detail.x);
      console.log(event.detail.y);
      console.log(event.detail.width);
      console.log(event.detail.height);
      console.log(event.detail.rotate);
      console.log(event.detail.scaleX);
      console.log(event.detail.scaleY);
    },
  });

  return (
    <div>
      <div>
        <img
          id="image"
          src={src}
          alt="Source"
          style={{ display: "block", maxWidth: "100%" }}
          width="400px"
        />
      </div>
      <img src={imageDestination} alt="Destination" width="200px" />
    </div>
  );
}

export default ImageCropper;
