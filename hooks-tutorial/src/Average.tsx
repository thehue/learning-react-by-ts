import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

const getAverage = (numbers: number[]): number => {
  console.log('평균값 계산중...');
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

function Average() {
  const [list, setList] = useState<number[]>([]);
  const [number, setNumber] = useState<string>('');
  const inputEl = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  // number혹은 list가 바뀌었을때만 함수 생성
  const onInsert = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber('');
      inputEl.current?.focus();
    },
    [list, number]
  );

  // 렌더링하는 과정에서 특정값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식
  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
}

export default Average;
