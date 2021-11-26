import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
// import Home from "@mui/icons-material/Home";

export default function RoomsCarousel(props) {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
    {
      name: "Random Name #3",
      description: "Room pictures",
    },
  ];

  return (
    <Carousel
      indicator
      navButtonsAlwaysVisible
      cycleNavigation={false}
      autoPlay={false}
      swipe
      animation="slide"
      next={(next, active) =>
        console.log(`we left ${active}, and are now at ${next}`)
      }
      prev={(prev, active) =>
        console.log(`we left ${active}, and are now at ${prev}`)
      }
      // IndicatorIcon={<Home sx={{ fontSize: "1rem" }} />} // Previous Example
      indicatorIconButtonProps={{
        style: {
          padding: "1px", // 1
          // color: "green", // 3
        },
      }}
      activeIndicatorIconButtonProps={
        {
          // style: {
          //   backgroundColor: "lightgrey", // 2
          // },
        }
      }
      indicatorContainerProps={{
        style: {
          marginTop: "5px", // 5
          textAlign: "center", // 4
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper sx={{ padding: 3 }}>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}
