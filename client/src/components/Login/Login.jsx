import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import image from "../../pexels-pixabay-159650.jpg";
import { Button, Typography } from "@mui/material";
import styles from "../Login/Login.module.css";

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.loginContainer}>
      <Typography
        sx={{ position: "relative", zIndex: "5", bottom: "100px" }}
        variant="h4"
      >
        Create your own Thumbnails
      </Typography>
      <img className={styles.bgImage} src={image} alt="bg-image" />
      <Button
        onClick={() => loginWithRedirect()}
        style={{ position: "absolute", backgroundColor: "#fff", color: "#000" }}
        variant="contained"
        component="span"
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
