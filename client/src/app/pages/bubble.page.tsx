import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Color } from '../models/Color';
import { State } from '../state/app.reducer';
import { getColors } from '../state/app.actions';
import { Bubbles } from '../components/bubbles/bubbles.component';
import { ColorList } from '../components/color-list/color-list.component';

const BubblePage = () => {
  const dispatch = useDispatch();
  const colorList = useSelector<State, Color[]>((state) => state.colors.list);

  React.useEffect(() => {
    getColors()(dispatch);
  }, [dispatch]);

  return (
    <>
      <ColorList colors={colorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export { BubblePage };
