import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import image from "../../pexels-pixabay-159650.jpg";
import { Button, Typography, Box } from "@mui/material";
import styles from "../Login/Login.module.css";
import Carousel from "react-material-ui-carousel";

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={styles.loginContainer}>
      <img className={styles.bgImage} src={image} alt="bg-image" />
      <Box
        position="absolute"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          sx={{ position: "relative", zIndex: "5", bottom: "50px" }}
          variant="h4"
        >
          Create your own Thumbnails
        </Typography>

        <div className={styles.carousel}>
          <Carousel
            sx={{
              width: { xs: 350, lg: 500 },
            }}
          >
            <img
              src="https://media.graphcms.com/MAkjx8f3R3eZLcvbbOdM"
              alt=""
              width={350}
            />
            <img
              src="https://media.graphassets.com/WtZc4lbYQ9Ohel1R22F1"
              alt=""
              width={350}
            />
            <img
              src="https://media.graphcms.com/CG0R4tPRiO7fH6V9PmJw"
              alt=""
              width={350}
            />
          </Carousel>
        </div>
        <Button
          onClick={() => loginWithRedirect()}
          style={{
            backgroundColor: "#fff",
            color: "#000",
            marginTop: "50px",
          }}
          variant="contained"
          component="span"
        >
          Login
        </Button>
      </Box>
    </div>
  );
}

export default Login;
