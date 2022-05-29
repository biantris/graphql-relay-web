import React from 'react';

import Providers from './Providers';

export const App = () => (
  <Providers>
    <React.Suspense fallback={'Loading...'}>
      <div>\o/</div>
    </React.Suspense>
  </Providers>
);