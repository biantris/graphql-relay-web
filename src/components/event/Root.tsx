import React, { Suspense } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { Text } from 'rebass';

type Props = {
  children: React.ReactNode;
};
const Root = ({ children }: Props) => {

  return (
    <>
      <CssBaseline />
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Text flexGrow={1}>GraphQL Relay Web</Text>
        </Toolbar>
      </AppBar>
      <Suspense fallback={'Loading children...'}>{children}</Suspense>
    </>
  );
};

export default Root;