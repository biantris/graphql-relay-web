import React from 'react';

import { BrowserRouter, Route, Routes as Router } from 'react-router-dom';

import Event  from '../src/components/Event'

function Routes() {
  return (
  <BrowserRouter>
    <Router>
      <Route path="/" element={<Event />}>
      </Route>
    </Router>
  </BrowserRouter>
  );
}

export default Routes;