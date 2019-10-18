import React from 'react';
import { useDispatch } from 'react-redux';

import { Color } from '../../models/Color';
import { editColor, deleteColor } from '../../state/app.actions';

interface ColorListProps {
  colors: Color[];
}

const ColorList = ({ colors }: ColorListProps) => {
  const dispatch = useDispatch();
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
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editStagingColor(color)}>
            <span>
              <span className='delete' onClick={() => eraseColor(color)}>
                x
              </span>{' '}
              {color.color}
            </span>
            <div className='color-box' style={{ backgroundColor: color.code.hex }} />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) => setStagingColor({ ...stagingColor, color: e.target.value })}
              value={stagingColor.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setStagingColor({
                  ...stagingColor,
                  code: { hex: e.target.value },
                })
              }
              value={stagingColor.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export { ColorList };
