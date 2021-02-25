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
