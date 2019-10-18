import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Snackbar,
  SnackbarContent,
  Icon,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';

import { State } from '../../../state/app.reducer';

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.light,
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Error = () => {
  const classes = useStyles({});
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const [state, setState] = React.useState({
    open: false,
    error: '',
  });

  const dispatch = useDispatch();
  const authError = useSelector<State, string>((state) => state.auth.error);
  const colorsError = useSelector<State, string>((state) => state.colors.error);

  React.useEffect(() => {
    if (authError) setState({ open: true, error: authError });
  }, [authError]);

  React.useEffect(() => {
    if (colorsError) setState({ open: true, error: colorsError });
  }, [colorsError]);

  React.useEffect(() => {
    if (!state.open) dispatch({ type: 'CLEAR_ERROR' });
  }, [state.open, dispatch]);

  const { error, open } = state;
  return (
    <Snackbar
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: md ? 'bottom' : 'top',
        horizontal: md ? 'left' : 'center',
      }}
      open={open}
      onClose={() => setState({ ...state, open: false })}>
      <SnackbarContent
        className={classes.error}
        message={
          <span className={classes.message}>
            <Icon className={classes.icon}>error</Icon>
            {error}
          </span>
        }
      />
    </Snackbar>
  );
};

export { Error };
