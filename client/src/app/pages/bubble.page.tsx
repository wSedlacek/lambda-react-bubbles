import React from 'react';
import axios from 'axios';

import { Bubbles } from '../components/bubbles/bubbles.component';
import { ColorList } from '../components/color-list/color-list.component';

import { Color } from '../models/Color';

const BubblePage = () => {
  const [colorList, setColorList] = React.useState<Color[]>([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
