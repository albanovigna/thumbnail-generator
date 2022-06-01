import axios from "axios";

export const POST_IMAGE = "POST_IMAGE";
export const ADD_IMAGE = "ADD_IMAGE";

export const REMOVE_IMAGE = "REMOVE_IMAGE";
export const REMOVE_URLS = "REMOVE_URLS";

export const postImage = (payload) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "multipart/form-data",
      },
    };
    const upload = await axios.post("/upload", payload, config);
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

export const removeUrls = (payload) => {
  return {
    type: REMOVE_URLS,
    payload,
  };
};
