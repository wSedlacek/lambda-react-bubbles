import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';

import { State } from '../../../state/app.reducer';

type PrivateRoute = {
  component: () => JSX.Element;
};

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const history = useHistory();
  const token = useSelector<State, string>((state) => state.auth.token);

  React.useEffect(() => {
    if (!token) history.push('/');
  }, [history, token]);

  return (
    <Route {...rest} render={(props) => (token ? <Component {...props} /> : <Redirect to='/' />)} />
  );
};

export { PrivateRoute };
