import React from 'react';
import { ColorConsumer } from '../contexts/color';

const colors: string[] = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
];

function SelectColors() {
  return (
    <div>
      <h2>색상을 선택하세요.</h2>
      <ColorConsumer>
        {({ actions }) => (
          <div style={{ display: 'flex' }}>
            {colors.map((color) => (
              <div
                key={color}
                style={{
                  background: color,
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                }}
                onClick={() => actions.setColor(color)}
                onContextMenu={(e) => {
                  //오른쪽마우스 클릭
                  e.preventDefault();
                  actions.setSubcolor(color);
                }}
              />
            ))}
          </div>
        )}
      </ColorConsumer>
      <hr />
    </div>
  );
}

export default SelectColors;
