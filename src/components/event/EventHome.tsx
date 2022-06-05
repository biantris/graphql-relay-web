import React from "react";

import { graphql } from "react-relay";

import { useFragment, useLazyLoadQuery } from "relay-hooks";

import Box from "@mui/material/Box";

import EventList from "./EventList";

import { EventHomeQuery } from "./__generated__/EventHomeQuery.graphql";

const EventHome = () => {
  const response = useLazyLoadQuery(
    graphql`
      query EventHomeQuery {
        ...EventHome_query
      }
    `,
    {},
    {
      fetchPolicy: "store-or-network",
    }
  );

  const query = useFragment<EventHomeQuery>(
    graphql`
      fragment EventHome_query on Query {
        ...EventList_query
      }
    `,
    response.data
  );

  return (
    <Box p={1}>
      <EventList query={query} />
    </Box>
  );
};

export default EventHome;