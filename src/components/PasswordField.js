import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function PasswordField({
   password,
   setPassword,
   label,
   size,
   autoFocus,
   disabled,
}) {
   const [showPassword, setIsShowPassword] = useState(false);
   const handleClickShowPassword = () => {
      setIsShowPassword(!showPassword);
   };
   const handleMouseDownPassword = (event) => {
      event.preventDefault();
   };

   return (
      <Box sx={{ position: "relative" }}>
         <TextField
            label={label}
            fullWidth
            variant="outlined"
            color="primary"
            size={size}
            margin="dense"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus={autoFocus}
            disabled={disabled}
         />
         <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            size="small"
            disabled={disabled}
            sx={{
               position: "absolute",
               top: "50%",
               right: 3,
               mr: 0.5,
               transform: "translateY(-50%)",
            }}
         >
            {showPassword ? <VisibilityOff /> : <Visibility />}
         </IconButton>
      </Box>
   );
}

export default PasswordField;
