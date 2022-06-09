import { Box, Button } from "@mui/material";
import React from "react";
import { Oval } from "react-loader-spinner";
import styles from "../PreviewImages/PreviewImages.module.css";

function PreviewImages({
  input,
  urls,
  filesDimensions,
  preview,
  sendThumbnail,
}) {
  const baseUrl = import.meta.env.VITE_API;
  return (
    <div className={styles.mainDiv}>
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
          filesDimensions.map((x, i) => {
            return (
              <div key={i} className={styles.mapDiv}>
                <span>{`${x[0]} x ${x[1]} px`}</span>
                {sendThumbnail && urls && urls.length === 0 ? (
                  <div className={styles.blurPreviews}>
                    <img
                      src={preview}
                      width={x[0] !== 400 ? `${x[0]}px` : 300}
                      height={x[1] !== 300 ? `${x[1]}px` : 250}
                    ></img>
                    <div className={styles.loaderContainer}>
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
                  <div className={styles.divThumbnails}>
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
                        <Button variant="contained" component="span">
                          Download
                        </Button>
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
