import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

function Logout() {
  const { logout } = useAuth0();
  return (
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
  );
}

export default Logout;
