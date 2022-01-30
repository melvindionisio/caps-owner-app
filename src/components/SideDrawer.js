import React, { useState } from "react";
import Menu from "./Menu";
import {
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Hidden,
   IconButton,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import KingBedIcon from "@mui/icons-material/KingBed";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useHistory, useLocation } from "react-router-dom";
import { grey } from "@material-ui/core/colors";

const SideDrawer = () => {
   const history = useHistory();
   const location = useLocation();

   const [menuOpen, setMenuOpen] = useState(false);
   const handleDrawerToggle = () => {
      setMenuOpen(!menuOpen);
   };

   const menuItems = [
      {
         key: 0,
         text: "Dashboard",
         path: "/my/dashboard",
         icon: <DashboardIcon />,
      },
      {
         key: 1,
         text: "My Boarding House",
         path: "/my/boarding-house",
         icon: <OtherHousesIcon />,
      },
      {
         key: 2,
         text: "My Rooms",
         path: "/my/rooms",
         icon: <KingBedIcon />,
      },
      {
         key: 3,
         text: "My Profile",
         path: "/my/profile",
         icon: <ManageAccountsIcon />,
      },
      {
         key: 4,
         text: "My Map",
         path: "/my/map",
         icon: <MyLocationIcon />,
      },
   ];

   return (
      <>
         <Hidden mdUp>
            <IconButton size="medium" onClick={handleDrawerToggle}>
               <MenuOutlinedIcon fontSize="medium" sx={{ color: grey[300] }} />
            </IconButton>
         </Hidden>

         <Menu
            handleDrawerToggle={handleDrawerToggle}
            menuOpen={menuOpen}
            anchor="left"
         >
            {menuItems.map((item) => (
               <ListItem
                  key={item.key}
                  button
                  divider
                  disablePadding
                  onClick={() => history.push(item.path)}
                  sx={
                     location.pathname === item.path
                        ? {
                             background: grey[300],
                             color: grey[900],
                          }
                        : { background: "transparent" }
                  }
               >
                  <ListItemButton>
                     <ListItemIcon
                        sx={
                           location.pathname === item.path
                              ? { color: grey[800] }
                              : { color: grey[500] }
                        }
                     >
                        {item.icon}
                     </ListItemIcon>
                     <ListItemText primary={item.text} />
                  </ListItemButton>
               </ListItem>
            ))}
         </Menu>
      </>
   );
};

export default SideDrawer;
