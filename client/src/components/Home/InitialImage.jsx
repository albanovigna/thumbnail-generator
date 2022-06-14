import { Card, CardHeader } from "@mui/material";
import React from "react";
import styles from "../Home/Home.module.css";

function InitialImage() {
  const imageUrl = import.meta.env.VITE_INIT_IMAGE;
  return (
    <div className={styles.initImage}>
      <Card
        sx={{
          maxWidth: 350,
          boxShadow: "0px 3px 15px  grey",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <CardHeader title="Select image" />
        <img src={imageUrl} alt="" />
      </Card>
    </div>
  );
}

export default InitialImage;
