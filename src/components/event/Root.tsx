import React, { Suspense } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { Text } from 'rebass';

import { graphql, useLazyLoadQuery } from 'relay-hooks';

import EventHome from './EventHome';

import { RootQuery } from './__generated__/RootQuery.graphql';

type Props = {
  children: React.ReactNode;
};
const Root = ({ children }: Props) => {
  const data = useLazyLoadQuery<RootQuery>(
    graphql`
      query RootQuery {
        ...EventHome_query
      }
    `,
    {},
    {
      fetchPolicy: 'store-or-network'
    },
  )

  return (
    <>
      <CssBaseline />
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Text flexGrow={1}>GraphQL Relay Web</Text>
        </Toolbar>
      </AppBar>
      <EventHome data={data}/>
      <Suspense fallback={'Loading children...'}>{children}</Suspense>
    </>
  );
};

export default Root;