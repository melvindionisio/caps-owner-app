import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import DashboardIcon from "@mui/icons-material/Dashboard";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import KingBedIcon from "@mui/icons-material/KingBed";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export default function OwnerBottomNavigation() {
   const [value, setValue] = React.useState("dashboard");

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <Paper
         sx={{ zIndex: 100, position: "fixed", bottom: 0, left: 0, right: 0 }}
         elevation={3}
      >
         <BottomNavigation
            sx={{ height: 70 }}
            value={value}
            onChange={handleChange}
         >
            <BottomNavigationAction
               value="dashboard"
               icon={<DashboardIcon />}
            />
            <BottomNavigationAction
               value="myboardinghouse"
               icon={<OtherHousesIcon />}
            />
            <BottomNavigationAction value="myrooms" icon={<KingBedIcon />} />
            <BottomNavigationAction
               value="myprofile"
               icon={<ManageAccountsIcon />}
            />
            <BottomNavigationAction value="mymap" icon={<MyLocationIcon />} />
         </BottomNavigation>
      </Paper>
   );
}
