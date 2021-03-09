import React, { createContext, ReactNode, useState } from 'react';

type Context = {
  state: {
    color: string;
    subcolor: string;
  };
  actions: {
    setColor: (color: string) => void;
    setSubcolor: (color: string) => void;
  };
};

type ProviderProps = {
  children: ReactNode;
};

const initialValue = {
  state: {
    color: 'lightsteelblue',
    subcolor: 'steelblue',
  },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
};
const ColorContext = createContext<Context>(initialValue);

// Provider: Context의 value를 변경할 수 있음
const ColorProvider = ({ children }: ProviderProps) => {
  const [color, setColor] = useState(initialValue.state.color);
  const [subcolor, setSubcolor] = useState(initialValue.state.subcolor);
  const value = {
    state: {
      color,
      subcolor,
    },
    actions: {
      setColor,
      setSubcolor,
    },
  };
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

const { Consumer: ColorConsumer } = ColorContext;

export { ColorProvider, ColorConsumer };
export default ColorContext;
