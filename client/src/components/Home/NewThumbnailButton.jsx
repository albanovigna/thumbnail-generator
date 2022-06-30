import { Button } from "@mui/material";
import React from "react";

function NewThumbnailButton({ setInput, setSendThumbnail }) {
  const handleClick = async (e) => {
    e.preventDefault();
    setInput({ selectedFile: null });
    setSendThumbnail(false);
  };
  return (
    <div>
      <Button
        sx={{ marginTop: "-25px", marginBottom: "10px" }}
        onClick={(e) => handleClick(e)}
        variant="contained"
        component="span"
      >
        Make new thumbnail
      </Button>
    </div>
  );
}

export default NewThumbnailButton;
