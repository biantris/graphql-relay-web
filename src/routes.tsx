import React from 'react';

import { BrowserRouter, Route, Routes as Router } from 'react-router-dom';

import EventHome from './components/event/EventHome';

import Root from './components/event/Root';

function Routes() {
  return (
  <BrowserRouter>
    <Router>
      <Route path="/" element={<Root />}>
        <Route index element={<EventHome />} />
      </Route>
    </Router>
  </BrowserRouter>
  );
}

export default Routes;