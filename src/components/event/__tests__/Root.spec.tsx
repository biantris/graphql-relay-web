import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Root from '../Root';

it('should render root', async () => {
  // eslint-disable-next-line
  const { debug, getByText } = render(<Root />);

  // uncomment to check DOM
  // debug();

  expect(getByText('GraphQL Relay Web')).toBeTruthy();
});