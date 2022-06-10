import { Box, Card, CardHeader, Typography } from "@mui/material";
import React from "react";
import PreviewImages from "../PreviewImages/PreviewImages";

function Thumbnails({ input, preview, sendThumbnail }) {
  return (
    <div>
      <Box>
        {preview && (
          <div>
            <Card
              sx={{
                marginBottom: { xs: "50px", lg: "0px" },
                padding: "20px",
                // boxShadow: { xs: "none", lg: "0px 3px 15px  grey" },
                boxShadow: "0px 3px 15px  grey",
              }}
            >
              <CardHeader
                sx={{
                  backgroundColor: "#fff",
                }}
                title="Preview thumbnails"
              />
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
