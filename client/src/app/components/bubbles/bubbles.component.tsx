import React from 'react';
import { useSelector } from 'react-redux';

import { Pack } from '@potion/layout';
import { Svg, Circle } from '@potion/element';

import { Bubble } from '../../models/Bubble';
import { Color } from '../../models/Color';
import { State } from '../../state/app.reducer';

const Bubbles: React.FunctionComponent = () => {
  const colorList = useSelector<State, Color[]>((state) => state.colors.list);
  const [bubbleData, setBubbleData] = React.useState<Bubble[]>([]);

  React.useEffect(() => {
    const generateBubbleData = colorList.map((_, i) => ({
      value: Math.floor(Math.random() * (colorList.length * 2)) + 1,
      key: `${i + 1}`,
    }));
    setBubbleData(generateBubbleData);
  }, [colorList]);

  return (
    <Svg width={400} height={400}>
      <Pack
        data={{
          children: bubbleData,
        }}
        sum={(datum: any) => datum.value}
        size={[400, 400]}
        includeRoot={false}
        nodeEnter={(d: any) => ({ ...d, r: 0 })}
        animate>
        {(nodes: any[]) =>
          nodes
            .map(({ x, y, r, key }, i) => {
              if (i < colorList.length) {
                return <Circle key={key} cx={x} cy={y} r={r} fill={colorList[i].code.hex} />;
              }
              return null;
            })
            .filter((v) => v)
        }
      </Pack>
    </Svg>
  );
};

export { Bubbles };
