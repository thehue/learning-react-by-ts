import React from 'react';
import SelectColors from './components/SelectColors';
import ColorBox from './components/ColorBox';
import { ColorProvider } from './contexts/color';

function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColors />
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
