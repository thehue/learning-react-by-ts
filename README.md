# 리액트를 다루는 기술(개정판)

'리액트를 다루는 기술' 책의 소스는 js로 작성되어 있는데 typescript로 변환하여 작성하고 기록하는 공간입니다.

> 코드가 많이 변경되거나 새롭게 안 사실 위주로 기록.

## 5.3 컴포넌트에 ref 달기

### 기존소스

ScrollBox.js

```
import React, { Component } from 'react';

class ScrollBox extends Component {
  render() {
    const style = {
      border: '1px solid black',
      height: '300px',
      width: '300px',
      overflow: 'auto',
      position: 'relative'
    };

    const innerStyle = {
      width: '100%',
      height: '650px',
      background: 'linear-gradient(white, black)'
    }

    return (
      <div
        style={style}
        ref={(ref) => {this.box=ref}}>
        <div style={innerStyle}/>
      </div>
      );
  }
}

export default ScrollBox;
```

App.js

```
import React, { Component } from 'react';
import ScrollBox from './ScrollBox';

class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox/>
      </div>
    );
  }
}

export default App;
```

### 수정한 소스

ScrollBox.tsx

```
import React, {
  CSSProperties,
  ForwardRefRenderFunction,
  useRef,
  useImperativeHandle,
} from 'react';

const style: CSSProperties = {
  border: '1px solid black',
  height: '300px',
  width: '300px',
  overflow: 'auto',
  position: 'relative',
};

const innerStyle: CSSProperties = {
  width: '100%',
  height: '650px',
  background: 'linear-gradient(white,black)',
};

export type ComponentRef = {
  scrollToBottom: () => void;
};

const ScrollBox: ForwardRefRenderFunction<ComponentRef> = (props, ref) => {
  const box = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollToBottom: () => {
          if (box.current) {
            const { scrollHeight, clientHeight } = box.current;
            box.current.scrollTop = scrollHeight - clientHeight;
          }
        },
      };
    },
    []
  );

  return (
    <div style={style} ref={box}>
      <div style={innerStyle} />
    </div>
  );
};

export default ScrollBox;
```

App.tsx

```
import React, { forwardRef, useRef } from 'react';
import ScrollBox, { ComponentRef } from './ScrollBox';

const ForwardingComponet = forwardRef(ScrollBox);

function App() {
  const scrollBox = useRef<ComponentRef>(null);

  return (
    <div>
      <ForwardingComponet ref={scrollBox} />
      <button
        onClick={() => {
          scrollBox.current?.scrollToBottom();
        }}
      >
        맨 끝으로 이동하기
      </button>
    </div>
  );
}

export default App;
```

- React에서는 Functional 컴포넌트에서 ref를 통한 접근을 위해 forwardRef()와 useImperativeHandle()을 제공
- forwardRef()는 Functional 컴포넌트에 ref 속성을 이용할 수 있도록 하는 기능으로 해당 함수로 Wrapping된 컴포넌트는 위와 같이 ref를 매개변수로 받을 수 있게 한다.
- useImperativeHandle()는 이름 처럼 Imperative(명령형) 동작에 대한 Handler를 제공한다.

출처: https://medium.com/react-native-seoul/react-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A5%BC-%EC%B2%98%EC%9D%8C%EB%B6%80%ED%84%B0-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EC%9E%90-07-createref%EC%99%80-useref-%EA%B7%B8%EB%A6%AC%EA%B3%A0-useimperativehandle-2fb5445d168b

정리

- 컴포넌트 내부에서 DOM에 직접 접근해야 할 때는 ref를 사용
- 서로 다른 컴포넌트끼리 데이터를 교류할 때 ref를 사용한다면 이는 잘못 사용된 것. -> 수정한 코드를 보면 책처럼 부모에서 자식컴포넌트의 메소드에 접근하려고 forwardRef와 useImperativeHanlde을 사용하여 전달하였는데 리액트 사상에 어긋난 설계
  -> 앱 규모가 커지면 마치 스파게티처럼 구조가 꼬여 버려서 유지보수가 불가능
  -> redux or Context API를 사용하는 것이 효율적

## 9.4 styled-components

### typescript media-templates

src/StyledComponent.tsx

```
import React from 'react';
import styled, { css } from 'styled-components';

type StyledProps = {
  inverted?: boolean;
};

/*

const sizes = {
  desktop: 1024,
  tablet: 768,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
   @media (max-width: ${sizes[label]/16}em){
     ${css(...args)};
   }
  `;

  return acc;
}, {});
*/

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth / 16}em)`;

const media = {
  desktop: customMediaQuery(1024),
  tablet: customMediaQuery(768),
};

const Box = styled.div`
  background: ${(props) => props.color || 'blue'};
  padding: 1rem;
  display: flex;
  width: 1024px;
  margin: 0 auto;
  ${media.desktop} {
    width: 768px;
  }
  ${media.tablet} {
    width: 100%;
  }
`;

const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  ${(props: StyledProps) =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `};

  & + button {
    margin-left: 1rem;
  }
`;

function StyledComponent() {
  return (
    <Box color="black">
      <Button>안녕하세요</Button>
      <Button inverted={true}>테두리만</Button>
    </Box>
  );
}

export default StyledComponent;

```
