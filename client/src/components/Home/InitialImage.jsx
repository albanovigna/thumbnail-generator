import { Card } from "@mui/material";
import React from "react";
import styles from "../Home/Home.module.css";

function InitialImage() {
  return (
    <div className={styles.initImage}>
      <Card sx={{ maxWidth: 350, p: 5 }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelVna9__Qwt9GifGdE0R4FmsiTmZjoSE1vnC4LXdgozvqbjiOGufuXrladHL7nXowTt4&usqp=CAU"
          alt=""
        />
      </Card>
    </div>
  );
}

export default InitialImage;
