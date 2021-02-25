import React, { ChangeEvent, MouseEvent } from 'react';
import { useState } from 'react';

type Name = {
  id: number;
  text: string;
};

function IterationSample() {
  const [names, setNames] = useState<Name[]>([
    { id: 1, text: '눈사람' },
    { id: 2, text: '얼음' },
    { id: 3, text: '눈' },
    { id: 4, text: '바람' },
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(names.length + 1);

  const nameList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.id}:{name.text}
    </li>
  ));

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const onClick = (e: MouseEvent) => {
    if (inputText) {
      const nextNames = names.concat({ id: nextId, text: inputText });
      setNames(nextNames);
      setNextId(nextId + 1);
      setInputText('');
    } else {
      alert('내용을 입력해주세요!');
    }
  };

  const onRemove = (id: number) => {
    const nextNames = names.filter((name) => name.id !== id);

    setNames(nextNames);
  };

  return (
    <>
      <input type="text" value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </>
  );
}

export default IterationSample;
