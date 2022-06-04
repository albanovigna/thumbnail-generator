import { ImageList, ImageListItem, Box } from "@mui/material";
import React from "react";

function PreviewImages({ input, urls, arrayFiles, preview }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "5%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {input.selectedFile &&
          urls.length === 0 &&
          arrayFiles.map((x, i) => {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginBottom: "10%",
                  marginTop: "5%",
                }}
              >
                <span
                  style={{
                    alignSelf: "center",
                  }}
                >{`${x[0]} x ${x[1]} px`}</span>

                <img
                  style={{
                    filter: "blur(6px)",
                  }}
                  src={preview}
                  width={x[0] !== 400 ? `${x[0]}px` : 300}
                  height={x[1] !== 300 ? `${x[1]}px` : 250}
                ></img>
              </div>
            );
          })}
      </Box>
    </div>
  );
}

export default PreviewImages;
