import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { store } from './state/app.store';
import { PrivateRoute } from './components/reusable/private-route/private-route.component';

import { LoginPage } from './pages/login.page';
import { BubblePage } from './pages/bubble.page';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <PrivateRoute path='/bubble' component={BubblePage} />
        <Route path='/' component={LoginPage} />
      </Switch>
    </Router>
  </Provider>
);

export { App };
