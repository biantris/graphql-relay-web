import React from 'react';

import InfiniteScroll from 'react-infinite-scroller';

import CircularProgress from '@mui/material/CircularProgress';

import { Flex } from 'rebass';

import { EventList_query$key } from './__generated__/EventList_query.graphql';
import { graphql, usePaginationFragment } from 'relay-hooks';
import { EventListPaginationQuery } from './__generated__/EventListPaginationQuery.graphql';

import Event from './Event';

type Props = {
  query: EventList_query$key;
};
const EventList = (props: Props) => {
  const { data, loadNext, isLoadingNext } = usePaginationFragment<EventListPaginationQuery>(
    graphql`
      fragment EventList_query on Query
      @argumentDefinitions(first: { type: Int, defaultValue: 3 }, after: { type: String })
      @refetchable(queryName: "EventListPaginationQuery") {
        events(first: $first, after: $after) @connection(key: "Event_events", filters: []) {
          endCursorOffset
          startCursorOffset
          count
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
  );

  const loadMore = () => {
    // Don't fetch again if we're already loading the next page
    if (isLoadingNext) {
      return;
    }
    loadNext(3);
  };

  const infiniteScrollerLoader = (
    <Flex flex={1} alignItems='center' justifyContent='center'>
      <CircularProgress />
    </Flex>
  );

  const { events } = data;
  const { pageInfo } = events;

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={pageInfo.hasNextPage}
      loader={infiniteScrollerLoader}
      useWindow
    >
      {data.events.edges.map(({ node }) => (
        <Event key={node.id} event={node}/>
      ))}
    </InfiniteScroll>
  );
};

export default EventList;