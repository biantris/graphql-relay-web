import React from "react";

import { useFragment, graphql } from "react-relay";
import styled from "styled-components";
import { Event_event$key } from "./__generated__/Event_event.graphql";

type Props = {
  event: Event_event$key;
};

const EventItem = styled.div`
  background: #f7f7f3;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  margin: 10px;
`;
const Events = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const Title = styled.h2`
  color: #000000;
  margin-bottom: 10px;
`;

const Paragraph = styled.div`
  color: #161b33;
  font-size: 0.8rem;
`;

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
    <EventItem>
      <Events>
        <Title>Event name: {event.name}</Title>
        <Paragraph>
          <b>Start date: </b>{start}
          <br />
          <b>End date: </b>{end}
          <br />
          <b>All day: </b>{event.allDay ? "All day" : "Not all day"}
        </Paragraph>
      </Events>
    </EventItem>
  );
};
export default Event;
