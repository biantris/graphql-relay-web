import React from "react";

import { useFragment, graphql } from "react-relay";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Event_event$key } from "./__generated__/Event_event.graphql";

type Props = {
  event: Event_event$key;
};

const Event = (props: Props) => {
  const event = useFragment<Event_event$key>(
    graphql`
      fragment Event_event on Event {
        id
        name
        start
        end
        allDay
      }
    `,
    props.event
  );

  const start = new Date(event.start).toISOString().substring(0, 10); // @TODO: add format to hours
  const end = new Date(event.end).toISOString().substring(0, 10);

  return (
    <>
      <Box p={1}>
        <Card variant="outlined" sx={{ display: "flex", width: "500px" }}>
          <Box p={1} sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <Box sx={{ color: "primary.main" }}>
                  Event Name: {event.name}
                </Box>
                {/* <Box sx={{ color: "text.primary" }}>{event.name}</Box> */}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Start date:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {start}
              </Typography>
              <Typography variant="body2" color="text.primary">
                End date:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {end}
              </Typography>
              <Typography variant="body2" color="text.primary">
                All day: {event.allDay ? "All day" : "Not all day"}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="outlined">
                Edit
              </Button>
              <Button size="small" variant="outlined" color="error">
                Remove
              </Button>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </>
  );
};
export default Event;
