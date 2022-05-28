import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addImage, postImage } from "../redux/actions";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({ selectedFile: null });

  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!input.selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(input.selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [input]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ selectedFile: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", input.selectedFile, input.selectedFile.name);

    dispatch(postImage(formData));
    dispatch(addImage(input.selectedFile.name));
    alert("Imagen enviada correctamente");
    setPreview(null);
    navigate(`/image/${input.selectedFile.name}`);
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
      <div>{input.selectedFile && <img src={preview} width="400px" />}</div>
    </div>
  );
}

export default Home;
