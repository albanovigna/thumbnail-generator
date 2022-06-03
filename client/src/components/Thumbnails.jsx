import React from "react";

function Thumbnails({ urls, arrayFiles }) {
  const baseUrl = import.meta.env.VITE_API;
  return (
    <div>
      {urls &&
        urls.length > 0 &&
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
                src={urls[i].Location}
                width={`${x[0]}px`}
                height={`${x[1]}px`}
              ></img>
              <a href={`${baseUrl}/download/${urls[i].Key}`} target="_blank">
                Download the File
              </a>
            </div>
          );
        })}
    </div>
  );
}

export default Thumbnails;
