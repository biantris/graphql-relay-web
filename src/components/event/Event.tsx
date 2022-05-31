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
  width: 100%;
`;
const Events = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
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

  return (
    <EventItem>
      <Events>
        <Title>{event.name}</Title>
        <Paragraph>
          {event.start}
          <br />
          {event.end}
          <br />
          {event.allDay ? "All Day" : "Not All Day"}
        </Paragraph>
      </Events>
    </EventItem>
  );
};
export default Event;
