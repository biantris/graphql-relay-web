import React, { useCallback } from 'react'

import { graphql, usePaginationFragment } from 'react-relay';

import styled from 'styled-components'

import Event from './Event'

import { EventHomeQuery } from './__generated__/EventHomeQuery.graphql';

import { EventHome_query$key } from './__generated__/EventHome_query.graphql';

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

const Button = styled.div `
  display: flex;
  justify-content: center;
`

const ButtonLoadMore = styled.button`
  border: none;
  border-radius: 20px;
  margin: 2em;
  width: 7em;
  height: 3vh;
  background-color: #F2AF29;
  font-size: 0.9em;
  color: #ffffff;
  cursor: pointer;
    &:hover{
      background: #ffffff;
      color: #161B33;
    }
`

const EventHome = (props: Props) => {
  const { data, loadNext, isLoadingNext } = usePaginationFragment<EventHomeQuery>(
    graphql`
      fragment EventHome on Query
      @argumentDefinitions(first: { type: Int, defaultValue: 3 }, after: { type: String })
      @refetchable(queryName: "EventHomeQuery") {
        events(first: $first, after: $after) @connection(key: "EventHome_events") {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
             ...Event_event
            }
          }
        }
      }
    `,
    props.query,
  )

  const { events } = data;

  const loadMore = useCallback(() => {
    if (isLoadingNext) {
      return;
    }
    loadNext(3);
  }, [isLoadingNext, loadNext]);

  return (
    <Content>
      <Home>
        {events.edges.map(({ node }) => (
          <Event key={node.id} event={node} />
        ))}
      </Home>
      <Button>
        <ButtonLoadMore onClick={loadMore} className="btn-load-posts"> Load More</ButtonLoadMore>
      </Button>
    </Content>
  )
  
}
export default EventHome