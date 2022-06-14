import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
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
                maxWidth: { xs: 345, lg: "100%" },
                marginBottom: { xs: "50px", sm: "40vh", lg: "0px" },
                boxShadow: "0px 3px 15px  grey",
              }}
            >
              <CardHeader title="Preview thumbnails" />
              <CardContent
                sx={{
                  backgroundColor: "#EDEDED",
                }}
              >
                <PreviewImages
                  sendThumbnail={sendThumbnail}
                  input={input}
                  preview={preview}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </Box>
    </div>
  );
}

export default Thumbnails;
