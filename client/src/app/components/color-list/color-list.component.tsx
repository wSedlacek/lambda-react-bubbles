import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Card,
  CardContent,
  Icon,
  IconButton,
  Typography,
  makeStyles,
  TextField,
} from '@material-ui/core';

import { Color } from '../../models/Color';
import { State } from '../../state/app.reducer';
import { editColor, deleteColor } from '../../state/app.actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    margin: 10,
  },
  color: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorBox: {
    display: 'inline-block',
    height: 16,
    width: 16,
    marginRight: 10,
    border: '1px lightgray solid',
    borderRadius: '50%',
  },
  input: {
    marginBottom: 10,
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const ColorList: React.FunctionComponent = () => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const colorList = useSelector<State, Color[]>((state) => state.colors.list);
  const [editing, setEditing] = React.useState(false);
  const [stagingColor, setStagingColor] = React.useState<Color>({
    color: '',
    code: { hex: '' },
    id: -1,
  });

  const editStagingColor = (color: Color) => {
    setEditing(true);
    setStagingColor(color);
  };

  const saveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditing(false);
    editColor(stagingColor)(dispatch);
  };

  const eraseColor = (color: Color) => {
    deleteColor(color)(dispatch);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h5' gutterBottom>
          Colors
        </Typography>

        {colorList.map((color) => (
          <div className={classes.color} key={color.color}>
            <div onClick={() => editStagingColor(color)}>
              <div className={classes.colorBox} style={{ backgroundColor: color.code.hex }} />
              <Typography variant='body1' display='inline'>
                {color.color}
              </Typography>
            </div>

            <IconButton className='delete' onClick={() => eraseColor(color)}>
              <Icon>close</Icon>
            </IconButton>
          </div>
        ))}

        {editing && (
          <form onSubmit={saveEdit}>
            <Typography variant='overline' display='block'>
              Edit Color
            </Typography>
            <TextField
              className={classes.input}
              label='Color Name'
              onChange={(e) => setStagingColor({ ...stagingColor, color: e.target.value })}
              value={stagingColor.color}
            />
            <TextField
              className={classes.input}
              label='Hex Code'
              onChange={(e) =>
                setStagingColor({
                  ...stagingColor,
                  code: { hex: e.target.value },
                })
              }
              value={stagingColor.code.hex}
            />

            <div className={classes.buttonRow}>
              <Button variant='contained' color='primary' type='submit'>
                Save
              </Button>
              <Button variant='contained' color='primary' onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
        {/* stretch - build another form here to add a color */}
      </CardContent>
    </Card>
  );
};

export { ColorList };
