import axios from "axios";

export const POST_IMAGE = "POST_IMAGE";

export const postImage = (payload) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "multipart/form-data",
      },
    };
    await axios.post("/upload", payload, config);
    dispatch({ type: POST_IMAGE });
  };
};
