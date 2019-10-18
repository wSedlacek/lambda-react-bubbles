import React from 'react';
import { Redirect, Route } from 'react-router';

type PrivateRoute = {
  component: () => JSX.Element;
};

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('token') ? <Component {...props} /> : <Redirect to='/login' />
    }
  />
);

export { PrivateRoute };
