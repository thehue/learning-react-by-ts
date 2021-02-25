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
