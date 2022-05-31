import React, { Suspense } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { Text } from 'rebass';

import { graphql, useLazyLoadQuery } from 'relay-hooks';
import EventHome from './EventHome';

import { EventHomeQuery } from './__generated__/EventHomeQuery.graphql';

type Props = {
  children: React.ReactNode;
  query: {
    rootQuery: unknown;
  };
  
};
const Root = ({ children, query }: Props) => {
  const data = useLazyLoadQuery<EventHomeQuery>(
    graphql`
      query RootQuery {
        ...EventHome
      }
    `,
    query.rootQuery,
  )

  const { events } = data;

  return (
    <>
      <CssBaseline />
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Text flexGrow={1}>GraphQL Relay Web</Text>
        </Toolbar>
      </AppBar>
      <EventHome query={query}/>
      <Suspense fallback={'Loading children...'}>{children}</Suspense>
    </>
  );
};

export default Root;