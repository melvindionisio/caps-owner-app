import React from "react";
import {
  Card,
  CardHeader,
  IconButton,
  Switch,
  FormGroup,
  FormControlLabel,
  Typography,
  Grid,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { grey } from "@mui/material/colors";

const RoomCard = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const handleAvailabilityChange = () => {
    setIsAvailable(!isAvailable);
    // This is where every change sends change to the database.
  };
  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardHeader
        action={<IconButton aria-label=""></IconButton>}
        title="Room Name"
        sx={{ marginBottom: 0, paddingBottom: 1 }}
      />
      <Box sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box sx={{ px: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Bed
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Available Bed
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                marginBottom
              >
                Occupied Bed
              </Typography>
              <Divider />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",

                borderRadius: 1,
                background: grey[100],
                height: "100%",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  sx={{ color: "text.secondary" }}
                  label={isAvailable ? "ENABLED" : "DISABLED"}
                  labelPlacement="left"
                  value="bottom"
                  control={
                    <Switch
                      size="medium"
                      color="secondary"
                      checked={isAvailable}
                      onChange={handleAvailabilityChange}
                    />
                  }
                />
              </FormGroup>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Button
        disableElevation
        fullWidth
        variant="contained"
        size="medium"
        color="secondary"
        sx={{ mt: 1, borderRadius: 0 }}
      >
        View Room
      </Button>
    </Card>
  );
};

export default RoomCard;
