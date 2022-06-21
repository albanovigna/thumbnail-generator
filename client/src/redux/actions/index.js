import axios from "axios";

export const POST_IMAGE = "POST_IMAGE";

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

export const removeUrls = (payload) => {
  return {
    type: REMOVE_URLS,
    payload,
  };
};
