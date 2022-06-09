import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import image from "../pexels-pixabay-159650.jpg";
import { Button, Typography } from "@mui/material";

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        color: "white",
      }}
    >
      <Typography
        sx={{ position: "relative", zIndex: "5", bottom: "100px" }}
        variant="h4"
      >
        Create your own Thumbnails
      </Typography>
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
        }}
        src={image}
        alt="bg-image"
      />
      {/* <button
        style={{
          position: "absolute",
        }}
        onClick={() => loginWithRedirect()}
      >
        Login
      </button> */}
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
