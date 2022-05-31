import React from "react";

import { graphql } from "react-relay";

import { useFragment, useLazyLoadQuery } from "relay-hooks";

import styled from "styled-components";

import EventList from "./EventList";

import { EventHomeQuery } from "./__generated__/EventHomeQuery.graphql";

const Content = styled.div`
  margin: 0px auto;
`;
const Home = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
  width: 100%;
  justify-content: center;
  align-content: center;
  place-items: center;
`;

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
    <Content>
      <Home>
        <EventList query={query} />
      </Home>
    </Content>
  );
};
export default EventHome;