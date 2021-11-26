import React from "react";
import Carousel from "react-material-ui-carousel";
import { Button, Card, CardActions, CardHeader } from "@mui/material";
// import Home from "@mui/icons-material/Home";

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
    <Carousel
      indicator
      // navButtonsAlwaysVisible
      cycleNavigation={true}
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
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: "lightgrey", // 2
        },
      }}
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
    <Card variant="elevation" elevation={2}>
      <CardHeader title={props.item.name} subheader={props.item.description} />
      <CardActions>
        <Button className="CheckButton">Check it out!</Button>
      </CardActions>
    </Card>
  );
}
