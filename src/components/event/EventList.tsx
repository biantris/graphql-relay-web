import React from 'react';

import InfiniteScroll from 'react-infinite-scroller';

import CircularProgress from '@mui/material/CircularProgress';

import { Flex } from 'rebass';

import { EventList_query$key } from './__generated__/EventList_query.graphql';
import { graphql, usePaginationFragment } from 'relay-hooks';
import { EventListPaginationQuery } from './__generated__/EventListPaginationQuery.graphql';

import Event from './Event';

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";

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
    <Box p={3}>
      <Container maxWidth="sm">
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={pageInfo.hasNextPage}
            loader={infiniteScrollerLoader}
            useWindow= {false}
          >
            {data.events.edges.map(({ node }) => (
            <Grid item xs={2} sm={4} md={4} key={node.id}>
              <Box sx={{ minWidth: 300 }}>
              <Event key={node.id} event={node}/>
              </Box>
            </Grid>
            ))}
          </InfiniteScroll>
        </Grid>
      </Container>
    </Box>
  );
};

export default EventList;