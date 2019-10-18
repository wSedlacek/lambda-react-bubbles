import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { CircularProgress, makeStyles } from '@material-ui/core';

import { User } from '../models/User';
import { State } from '../state/app.reducer';
import { login, checkToken } from '../state/app.actions';
import { LoginForm } from '../components/login/form/form.component';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const LoginPage = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const history = useHistory();

  const token = useSelector<State, string>((state) => state.auth.token);
  const loading = useSelector<State, boolean>((state) => state.auth.loading);

  React.useEffect(() => {
    checkToken()(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    if (token) history.push('/bubble');
  }, [history, token]);

  return (
    <div className={classes.root}>
      {(loading && <CircularProgress color='secondary' />) || (
        <LoginForm onSubmit={(user: User) => login(user)(dispatch)} />
      )}
    </div>
  );
};

export { LoginPage };
