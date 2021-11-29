import React from "react";
import { Paper, Typography } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation]);

export default function RoomsCarousel(props) {
  var items = [
    {
      name: "Room Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Room Name #2",
      description: "Hello World!",
    },
    {
      name: "Room Name #3",
      description: "Room pictures",
    },
  ];

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      navigation
    >
      {items.map((item) => (
        <SwiperSlide>
          <Paper
            variant="outlined"
            style={{
              minHeight: 120,
              padding: ".5rem 1rem",
              width: 320,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: 10,
            }}
          >
            <Typography variant="h6" color="initial">
              {item.name}
            </Typography>
            <Typography variant="body1" color="initial">
              {item.description}
            </Typography>
          </Paper>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
