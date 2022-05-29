import React from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import StylesProvider from '@mui/styles/StylesProvider';

import { SnackbarProvider } from 'notistack';

import Environment from './relay/RelayEnvironment';

type Props = {
  children: React.ReactNode;
  environment: typeof Environment;
};
const Providers = ({ children, environment = Environment }: Props) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
        <StylesProvider injectFirst>
          <SnackbarProvider>{children}</SnackbarProvider>
        </StylesProvider>
    </RelayEnvironmentProvider>
  );
};

export default Providers;