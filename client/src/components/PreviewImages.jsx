import React from "react";

function PreviewImages({ input, urls, arrayFiles, preview }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      {input.selectedFile &&
        urls.length === 0 &&
        arrayFiles.map((x, i) => {
          return (
            <div
              key={i}
              style={{
                marginBottom: "10%",
                marginTop: "5%",
              }}
            >
              <span
                style={{
                  alignSelf: "center",
                }}
              >{`${x[0]} x ${x[1]} px`}</span>
              <img
                style={{ filter: "blur(4px)" }}
                src={preview}
                width={`${x[0]}px`}
                height={`${x[1]}px`}
              ></img>
            </div>
          );
        })}
    </div>
  );
}

export default PreviewImages;
