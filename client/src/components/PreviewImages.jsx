import { ImageList, ImageListItem, Box, Typography } from "@mui/material";
import React from "react";
import { Oval } from "react-loader-spinner";

function PreviewImages({ input, urls, arrayFiles, preview, sendThumbnail }) {
  const baseUrl = import.meta.env.VITE_API;
  return (
    <div
      style={{
        // background: "red",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* {input.selectedFile && (
        <Typography
          sx={{ marginTop: "30px", marginBottom: "15px" }}
          variant="h5"
        >
          Thumbnails
        </Typography>
      )} */}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: { xs: "center", lg: "space-around" },
          gap: { lg: "10px" },
          alignItems: "center",
        }}
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
                  // marginBottom: "10%",
                  // marginTop: "5%",
                }}
              >
                <span
                  style={{
                    alignSelf: "center",
                  }}
                >{`${x[0]} x ${x[1]} px`}</span>
                {sendThumbnail && urls && urls.length === 0 ? (
                  <div
                    style={{
                      // display: "inline-block",
                      position: "relative",
                      // zIndex: "1",
                      // left: "0",
                      // top: "0",
                    }}
                  >
                    <img
                      style={{
                        filter: "blur(6px)",
                        marginLeft: "20px",
                        // display: "block",
                      }}
                      src={preview}
                      width={x[0] !== 400 ? `${x[0]}px` : 300}
                      height={x[1] !== 300 ? `${x[1]}px` : 250}
                    ></img>
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "1",
                        right: "0px",
                        top: "0px",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        // margin: "auto",
                      }}
                    >
                      <Oval
                        ariaLabel="loading-indicator"
                        height={70}
                        width={70}
                        strokeWidth={5}
                        color="blue"
                        secondaryColor="white"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      marginBottom: "20px",
                    }}
                  >
                    <img
                      style={{
                        filter: urls.length === 0 ? "blur(6px)" : "none",
                        marginLeft: "20px",
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
                        Download Thumbnail
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </Box>
    </div>
  );
}

export default PreviewImages;
