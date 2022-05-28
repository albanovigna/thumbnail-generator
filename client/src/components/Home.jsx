import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addImage, postImage } from "../redux/actions";
// import Image from "./Image";

function Home() {
  const dispatch = useDispatch();

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

  // const onSelectFile = (e) => {
  //   if (!e.target.files || e.target.files.length === 0) {
  //     setInput({ selectedFile: undefined });
  //     return;
  //   }

  //   // I've kept this example simple by using the first image instead of multiple
  //   setInput({ selectedFile: e.target.files[0] });
  // };

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

    dispatch(postImage(formData));
    dispatch(addImage(input.selectedFile.name));
    alert("Imagen enviada correctamente");
    setPreview(null);
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
      <div>
        {/* <input type="file" onChange={onSelectFile} /> */}
        {input.selectedFile && <img src={preview} width="400px" />}
      </div>
      {input.selectedFile && (
        <Link to={`/image/${input.selectedFile.name}`}>edit image</Link>
      )}
    </div>
  );
}

export default Home;
