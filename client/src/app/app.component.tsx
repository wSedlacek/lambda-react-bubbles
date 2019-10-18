import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Login } from './pages/login.page';
import './styles.scss';

const App = () => (
  <Router>
    <div className='App'>
      <Route exact path='/' component={Login} />
      {/*
          Build a PrivateRoute component that will
          display BubblePage when you're authenticated
        */}
    </div>
  </Router>
);

export { App };
