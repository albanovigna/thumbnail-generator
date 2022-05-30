import axios from "axios";
import fileDownload from "js-file-download";
import b64toBlob from "b64-to-blob";

export const POST_IMAGE = "POST_IMAGE";
export const ADD_IMAGE = "ADD_IMAGE";
export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const postImage = (payload) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "multipart/form-data",
      },
    };
    const upload = await axios.post("/upload", payload, config);
    console.log(upload.data);
    // const blob = b64toBlob(upload.data.b64Data, upload.data.contentType);
    // const [fileName] = payload.file.name.split(".");
    // dispatch({ type: POST_IMAGE, info: { blob, data: upload.data.extension } });
    dispatch({ type: POST_IMAGE, info: upload.data });
  };
};

export const addImage = (payload) => {
  return {
    type: ADD_IMAGE,
    payload,
  };
};

export const removeImage = (payload) => {
  return {
    type: REMOVE_IMAGE,
    payload,
  };
};
