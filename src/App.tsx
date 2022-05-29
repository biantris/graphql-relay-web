import React from 'react';

import Routes from './routes';
import Providers from './Providers';

import { Environment } from './relay';

export const App = () => (
  <Providers environment={Environment}>
    <React.Suspense fallback={'Loading...'}>
      <Routes />
    </React.Suspense>
  </Providers>
);