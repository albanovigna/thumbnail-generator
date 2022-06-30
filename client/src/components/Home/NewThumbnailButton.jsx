import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function NewThumbnailButton({ setInput, setSendThumbnail }) {
  const urls = useSelector((state) => state.urls);
  const urlsStrings = urls.map((url) => {
    const obj = { Key: url.Key };
    return obj;
  });
  const handleClick = async (e) => {
    e.preventDefault();
    const objUrls = {
      urls: urlsStrings,
    };
    await axios.post(`/remove`, objUrls);
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
