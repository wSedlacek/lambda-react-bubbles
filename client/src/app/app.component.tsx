import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { store } from './state/app.store';
import { PrivateRoute } from './components/reusable/private-route/private-route.component';
import './styles.scss';

import { LoginPage } from './pages/login.page';
import { BubblePage } from './pages/bubble.page';

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='App'>
        <Route exact path='/' component={LoginPage} />
        <PrivateRoute path='/bubble' component={BubblePage} />
      </div>
    </Router>
  </Provider>
);

export { App };
