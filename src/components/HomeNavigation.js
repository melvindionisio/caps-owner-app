import { IconButton, Toolbar, Typography, Avatar } from "@mui/material";
import { AppBar } from "@mui/material";
import React from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import { Hidden } from "@mui/material";
// import { grey } from "@mui/material/colors";
// import AccountMenu from "./AccountMenu";
import Menu from "./Menu";

const HomeNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <React.Fragment>
      <Menu
        handleDrawerToggle={handleDrawerToggle}
        menuOpen={menuOpen}
        anchor="left"
      >
        {/*List of sidebar options*/}
      </Menu>
      <AppBar position="sticky" elevation={1} color="primary">
        <Toolbar
          disableGutters
          sx={{
            padding: "0 .5rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Hidden mdUp>
            <IconButton size="medium" onClick={handleDrawerToggle}>
              <MenuOutlinedIcon
                fontSize="medium"
                onClick={handleDrawerToggle}
              />
            </IconButton>
          </Hidden>
          <Typography variant="h6" sx={{ ml: 1 }}>
            My Boarding House
          </Typography>
          <Avatar>B</Avatar>

          {/* <AccountMenu /> */}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default HomeNavigation;
