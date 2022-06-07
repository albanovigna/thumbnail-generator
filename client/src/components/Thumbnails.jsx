import { Box } from "@mui/system";
import React from "react";

function Thumbnails({ urls, arrayFiles }) {
  const baseUrl = import.meta.env.VITE_API;
  return (
    <div>
      {urls &&
        urls.length > 0 &&
        arrayFiles.map((x, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  alignSelf: "center",
                }}
              >{`${x[0]} x ${x[1]} px`}</span>
              <img
                src={urls[i].Location}
                width={x[0] !== 400 ? `${x[0]}px` : 300}
                height={x[1] !== 300 ? `${x[1]}px` : 250}
              ></img>
              <a href={`${baseUrl}/download/${urls[i].Key}`} target="_blank">
                Download the File
              </a>
            </div>
          );
        })}
    </div>
  );
}

export default Thumbnails;
