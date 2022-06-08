import { ImageList, ImageListItem, Box } from "@mui/material";
import React from "react";
import { Oval } from "react-loader-spinner";

function PreviewImages({ input, urls, arrayFiles, preview, sendThumbnail }) {
  const baseUrl = import.meta.env.VITE_API;
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: { xs: "center", lg: "space-around" },
          alignItems: "center",
        }}
        // display="flex"
        // flexDirection="column"
        // alignItems="center"
        // justifyContent="center"
      >
        {input.selectedFile &&
          // urls.length === 0 &&
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
                {sendThumbnail && urls && urls.length === 0 ? (
                  <div>
                    <Oval
                      ariaLabel="loading-indicator"
                      height={100}
                      width={100}
                      strokeWidth={5}
                      color="blue"
                      secondaryColor="white"
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <img
                      style={{
                        filter: urls.length === 0 ? "blur(6px)" : "none",
                      }}
                      src={urls.length === 0 ? preview : urls[i].Location}
                      width={x[0] !== 400 ? `${x[0]}px` : 300}
                      height={x[1] !== 300 ? `${x[1]}px` : 250}
                    ></img>
                    {urls.length > 0 && (
                      <a
                        href={`${baseUrl}/download/${urls[i].Key}`}
                        target="_blank"
                      >
                        Download the File
                      </a>
                    )}
                  </div>
                )}
                {/* <img
                  style={{
                    filter: "blur(6px)",
                  }}
                  src={preview}
                  width={x[0] !== 400 ? `${x[0]}px` : 300}
                  height={x[1] !== 300 ? `${x[1]}px` : 250}
                ></img> */}
              </div>
            );
          })}
      </Box>
    </div>
  );
}

export default PreviewImages;
