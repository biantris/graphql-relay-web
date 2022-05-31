import React from 'react'

import { graphql } from 'react-relay';

import { useFragment } from 'relay-hooks';

import styled from 'styled-components'

import EventList from './EventList';

import { EventHomeQuery } from './__generated__/EventHomeQuery.graphql';

type Props = {
  query: EventHome_query$key;
};

const Content = styled.div`
  margin: 0px auto;
`
const Home = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
  width: 100%;
  justify-content: center;
  align-content: center;
  place-items: center;
`

const EventHome = (props: Props) => {
  const query = useFragment<EventHomeQuery>(
    graphql`
      fragment EventHome_query on Query {
        ...EventList_query
      }
    `,
    props.query
  );

  return (
    <Content>
      <Home>
        <EventList query={query}/>
      </Home>
    </Content>
  )
  
}
export default EventHome