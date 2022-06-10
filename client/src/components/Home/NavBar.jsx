import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import Logout from "../Logout/Logout";

function NavBar() {
  return (
    <div>
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Thumbnail Generator</Typography>
          <Logout></Logout>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
