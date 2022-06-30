import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUrls } from "../../redux/actions";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

function UploadButton({ setSendThumbnail, setInput }) {
  const dispatch = useDispatch();

  const validateImage = (file) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetypes = filetypes.test(file.type);
    const filesize = file.size < 5000000;
    if (mimetypes && filesize) {
      return true;
    } else {
      if (!mimetypes) {
        Swal.fire({
          icon: "warning",
          title: "The file has to be pdf or jpg",
          text: "Please, select other file",
        });
      }
      if (!filesize) {
        Swal.fire({
          icon: "warning",
          title: "The file must be less than 5mb",
          text: "Please, select other file",
        });
      }
      return false;
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      dispatch(removeUrls());
      setSendThumbnail(false);
      validateImage(e.target.files[0])
        ? setInput({ selectedFile: e.target.files[0] })
        : null;
    }
  };
  return (
    <div>
      <Box sx={{ marginTop: 10 }}>
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="contained-button-file">
            <Button
              sx={{ marginBottom: { xs: "20px", lg: "0px" } }}
              variant="contained"
              component="span"
              startIcon={<CloudUpload />}
            >
              Upload image
            </Button>
          </label>
        </Stack>
      </Box>
    </div>
  );
}

export default UploadButton;
