import { Box, Card, Typography } from "@mui/material";
import React from "react";
import PreviewImages from "../PreviewImages/PreviewImages";

function Thumbnails({ input, preview, sendThumbnail }) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {preview && (
          <div>
            <Typography
              sx={{ display: { lg: "none" }, color: "#fff" }}
              gutterBottom
              variant="h5"
              component="div"
            >
              Thumbnails
            </Typography>
            <Card sx={{ marginBottom: "50px", padding: "20px" }}>
              <PreviewImages
                sendThumbnail={sendThumbnail}
                input={input}
                preview={preview}
              />
            </Card>
          </div>
        )}
      </Box>
    </div>
  );
}

export default Thumbnails;
