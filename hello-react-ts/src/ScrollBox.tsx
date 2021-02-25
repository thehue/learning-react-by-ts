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
