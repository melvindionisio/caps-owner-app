import { Paper, Avatar, Typography, Box } from "@mui/material";
import { red, lightBlue, green, deepPurple } from "@mui/material/colors";
import React from "react";
import { Delete } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

const ReviewCard = ({
   review,
   isCurrentUserReview,
   handleDeleteReview,
   isDeleteReview,
}) => {
   return (
      <Box
         sx={
            isCurrentUserReview
               ? { display: "flex", justifyContent: "end" }
               : {
                    display: "flex",
                    justifyContent: "start",
                 }
         }
      >
         <Paper
            elevation={1}
            sx={
               isCurrentUserReview
                  ? {
                       padding: 2,
                       borderRight: `3px solid ${green[500]}`,
                       borderRadius: "1rem 1rem 0rem 1rem",
                       width: "90%",
                       transition: "150ms ease",
                       "&:hover": {
                          transform: "scale(1.01)",
                       },
                    }
                  : {
                       padding: 2,
                       borderLeft: `3px solid ${lightBlue[500]}`,
                       borderRadius: "0rem 1rem 1rem 1rem",
                       width: "90%",
                       transition: "150ms ease",
                       "&:hover": {
                          transform: "scale(1.01)",
                       },
                    }
            }
         >
            <Box sx={{ display: "flex", gap: 1, position: "relative" }}>
               <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {review.reviewerName.charAt(0).toUpperCase()}
               </Avatar>
               <Box
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     paddingBottom: 1,
                  }}
               >
                  {isCurrentUserReview ? (
                     <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontSize: 14 }}
                     >
                        Me{" "}
                        <Typography
                           variant="caption"
                           sx={{ fontWeight: "thin" }}
                        >
                           ({review.reviewerName})
                        </Typography>
                     </Typography>
                  ) : (
                     <Typography
                        variant="body1"
                        color="initial"
                        sx={{ fontSize: 14 }}
                     >
                        {review.reviewerName}
                     </Typography>
                  )}

                  <Typography
                     variant="caption"
                     color="text.secondary"
                     sx={{
                        textTransform: "uppercase",
                        fontSize: 10,
                     }}
                  >
                     {review.date}
                  </Typography>
               </Box>
               {isCurrentUserReview && (
                  <LoadingButton
                     size="small"
                     onClick={() => handleDeleteReview(review.id)}
                     variant="contained"
                     disableElevation
                     loading={isDeleteReview}
                     sx={{
                        position: "absolute",
                        top: 1,
                        right: 1,
                        background: red[50],
                        color: red[500],
                        "&:hover": {
                           background: red[100],
                        },
                     }}
                     startIcon={
                        <Delete fontSize="small" sx={{ color: red[400] }} />
                     }
                  >
                     delete
                  </LoadingButton>
               )}
            </Box>
            <Typography variant="body1" color="initial" sx={{ px: 5 }}>
               {review.text}
            </Typography>
            {review.last}
         </Paper>
      </Box>
   );
};

export default ReviewCard;
