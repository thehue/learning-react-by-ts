import {
  ForwardRefRenderFunction,
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
} from 'react';

export type ComponentRef = {
  scrollToTop: () => void;
  scrollToBottom: () => void;
};

const Component: ForwardRefRenderFunction<ComponentRef> = (props, ref) => {
  const test = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollToTop: () => {
          console.log('scrollToTop');
        },
        scrollToBottom: () => {
          console.log('scrollToBottom');
        },
      };
    },
    []
  );

  return <div ref={test}></div>;
};

const ForwardingComponet = forwardRef(Component);

const Example = () => {
  const ref = useRef<ComponentRef>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollToBottom();
    }
  });

  return <ForwardingComponet ref={ref} />;
};

export default Example;
