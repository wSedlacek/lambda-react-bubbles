import React from 'react';
import { useDispatch } from 'react-redux';

import { AppBar, Toolbar, Button, Typography, makeStyles } from '@material-ui/core';

import { getColors, signOut } from '../state/app.actions';
import { Bubbles } from '../components/bubbles/bubbles.component';
import { ColorList } from '../components/color-list/color-list.component';
import { Error } from '../components/reusable/error/error.component';

const useStyles = makeStyles((theme) => ({
  spacer: {
    flex: '1',
  },
  colorList: {
    position: 'absolute',
  },
  bubbles: {
    margin: 10,
    width: '100%',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const BubblePage: React.FunctionComponent = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  React.useEffect(() => {
    getColors()(dispatch);
  }, [dispatch]);

  return (
    <>
      <AppBar position='relative'>
        <Toolbar>
          <Typography>Bubbles</Typography>
          <div className={classes.spacer}></div>
          <Button onClick={() => signOut()(dispatch)} color='inherit'>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.bubbles}>
        <Bubbles />
      </div>
      <div className={classes.colorList}>
        <ColorList />
      </div>
      <Error />
    </>
  );
};

export { BubblePage };
