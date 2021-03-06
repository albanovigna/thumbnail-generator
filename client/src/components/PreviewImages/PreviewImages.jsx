import { Box, Button } from "@mui/material";
import React from "react";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import styles from "../PreviewImages/PreviewImages.module.css";

function PreviewImages({ input, preview, sendThumbnail }) {
  const filesDimensions = [
    [400, 300],
    [160, 120],
    [120, 120],
  ];
  const baseUrl = import.meta.env.VITE_API;
  const urls = useSelector((state) => state.urls);
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
                  <div
                    className={
                      x[0] === 400 ? styles.blurMax : styles.blurPreviews
                    }
                  >
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
                  <div
                    className={
                      x[0] === 400
                        ? styles.maxImage
                        : x[0] !== 120
                        ? styles.divThumbnails
                        : styles.active
                    }
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
                        <Button variant="contained" component="span">
                          Download
                        </Button>
                      </a>
                    )}
                    <hr />
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
