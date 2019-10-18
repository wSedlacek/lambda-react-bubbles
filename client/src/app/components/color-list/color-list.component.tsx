import React from 'react';
import axios from 'axios';

import { Color } from '../../models/Color';

interface ColorListProps {
  colors: Color[];
  updateColors: (colors: Color[]) => void;
}

const ColorList = ({ colors, updateColors }: ColorListProps) => {
  console.log(colors);
  const [editing, setEditing] = React.useState(false);
  const [colorToEdit, setColorToEdit] = React.useState<Color>();

  const editColor = (color: Color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = (color: Color) => {
    // make a delete request to delete this color
  };

  if (!colorToEdit) return <div>Loading...</div>;

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className='delete' onClick={() => deleteColor(color)}>
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
              onChange={(e) => setColorToEdit({ ...colorToEdit, color: e.target.value })}
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
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
