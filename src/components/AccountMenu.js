import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Zoom from "@mui/material/Zoom";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden";
import Box from "@mui/material/Box";
// import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
// import { useHistory } from "react-router-dom";

import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

import { useHistory } from "react-router-dom";

export default function AccountMenu({ currentUser }) {
   const { currentOwner, handleOwnerLogout } = useContext(LoginContext);
   const history = useHistory();

   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   // const history = useHistory();
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <React.Fragment>
         <Tooltip title="Profile" TransitionComponent={Zoom} enterDelay={600}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
               <Hidden mdDown>
                  <Typography>{currentOwner.name}</Typography>
               </Hidden>
               <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
                  <Avatar
                     style={{
                        outline: "1px solid rgba(25, 118, 210, 0.5)",
                        outlineOffset: "2px",
                     }}
                     // src={currentUser.picture}
                  />
               </IconButton>
            </Box>
         </Tooltip>
         <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
               elevation: 0,
               sx: {
                  overflow: "visible",
                  // border: "1px solid lightgray",
                  filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.2))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                     width: 32,
                     height: 32,
                     ml: -0.5,
                     mr: 1,
                  },
                  "&:before": {
                     content: '""',
                     display: "block",
                     position: "absolute",
                     top: 0,
                     right: 14,
                     width: 10,
                     height: 10,
                     bgcolor: "background.paper",
                     transform: "translateY(-50%) rotate(45deg)",
                     zIndex: 0,
                  },
               },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
         >
            <MenuItem onClick={() => history.push("/my/profile")}>
               <ListItemIcon>
                  <PersonIcon />
               </ListItemIcon>
               Profile
            </MenuItem>
            <MenuItem
               onClick={() => {
                  handleOwnerLogout();
                  history.push("/");
               }}
            >
               <ListItemIcon>
                  <Logout />
               </ListItemIcon>
               Logout
            </MenuItem>
         </Menu>
      </React.Fragment>
   );
}
