import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postImage } from "../redux/actions";

function Home() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({ selectedFile: null });

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ selectedFile: e.target.files[0] });
    // dispatch(postImage(e.target.value))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    console.log(input.selectedFile);
    // Update the formData object
    // formData.append("file", input.selectedFile);
    formData.append("image", input.selectedFile, input.selectedFile.name);

    // Details of the uploaded file
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // console.log(input);
    dispatch(postImage(formData));
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Home;
