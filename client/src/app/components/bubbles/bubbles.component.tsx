import React from 'react';
import { Pack } from '@potion/layout';
import { Svg, Circle } from '@potion/element';

import { Bubble } from '../../models/Bubble';
import { Color } from '../../models/Color';

interface BubblesProps {
  colors: Color[];
}

const Bubbles = ({ colors }: BubblesProps) => {
  const [bubbleData, setBubbleData] = React.useState<Bubble[]>([]);

  React.useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`,
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className='bubble-wrap'>
      <p>bubbles</p>
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
                if (i < colors.length) {
                  return <Circle key={key} cx={x} cy={y} r={r} fill={colors[i].code.hex} />;
                }
                return null;
              })
              .filter((v) => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export { Bubbles };
