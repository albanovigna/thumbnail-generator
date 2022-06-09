import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from "@mui/material";
import styles from "../Logout/Logout.module.css";

function Logout() {
  const { logout, user } = useAuth0();
  return (
    <div className={styles.logoutContainer}>
      <Typography sx={{ display: { xs: "none", lg: "flex" } }} variant="h7">
        {user.given_name}
      </Typography>
      <Button
        sx={{
          backgroundColor: "white",
          border: "2px solid",
          borderColor: "#2196f3",
          "&:hover": {
            backgroundColor: "#eee",
          },
        }}
        variant="outlined"
        onClick={() => logout()}
      >
        logout
      </Button>
    </div>
  );
}

export default Logout;
