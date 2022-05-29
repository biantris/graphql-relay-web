import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Event  from '../src/components/Event'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' element={<Event />}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;