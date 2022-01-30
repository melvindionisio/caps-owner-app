import React, { useState, useContext, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import ReviewCard from "../cards/ReviewCard";
import { LoginContext } from "../../contexts/LoginContext";
import { domain } from "../../fetch-url/fetchUrl";
import LoadingState from "../LoadingState";

const Reviews = () => {
   const [reviews, setReviews] = useState([]);
   const [isEmpty, setIsEmpty] = useState(false);
   const [isPending, setIsPending] = useState(true);
   const { currentOwner } = useContext(LoginContext);

   useEffect(() => {
      const abortCont = new AbortController();

      setTimeout(() => {
         fetch(`${domain}/api/reviews/bh/${currentOwner.id}`, {
            signal: abortCont.signal,
         })
            .then((res) => {
               if (!res.ok) {
                  throw Error("Something went wrong!");
               }
               return res.json();
            })
            .then((data) => {
               if (data) {
                  setReviews(data);
                  setIsPending(false);
               }
               if (data.length <= 0) {
                  setIsEmpty(true);
               }
            })
            .catch((err) => {
               if (err.name === "AbortError") {
                  console.log("fetch aborted");
               } else {
                  console.log(err);
               }
            });
      }, 0);

      return () => {
         abortCont.abort();
      };
   }, [currentOwner]);
   return (
      <Container
         maxWidth="md"
         disableGutters
         sx={{
            padding: 2,
            paddingBottom: "5rem",
            height: "85vh",
            overflowY: "none",
            position: "relative",
         }}
      >
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               gap: 1,
               height: "50vh",
               overflowY: "auto",
               padding: "1rem 5px",
               borderRadius: 1,
               position: "relative",
            }}
         >
            {isPending && <LoadingState loadWhat="Reviews" />}

            {reviews &&
               reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
               ))}

            {isEmpty && (
               <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 4 }}
               >
                  Reviews is empty!
               </Typography>
            )}
            <Typography
               align="center"
               style={{
                  marginTop: 7,
                  display: "flex",
                  justifyContent: "center",
               }}
            >
               <Typography
                  align="center"
                  variant="caption  "
                  style={{
                     height: 10,
                     width: 10,
                     borderRadius: 50,
                     background: grey[400],
                  }}
               ></Typography>
            </Typography>
         </Box>
      </Container>
   );
};

export default Reviews;
