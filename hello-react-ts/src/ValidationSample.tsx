import React, { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import './ValidationSample.css';

const ValidationSample = () => {
  const [state, setState] = useState({
    password: '',
    clicked: false,
    validated: false,
  });

  const { password, clicked, validated } = state;

  const input = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      password: e.target.value,
    });
  };

  const handleButtonClick = (e: MouseEvent) => {
    setState({
      ...state,
      clicked: true,
      validated: password === '0000',
    });

    if (input.current) {
      input.current.focus();
    }
  };

  return (
    <div>
      <input
        ref={input}
        type="password"
        value={password}
        onChange={handleChange}
        className={clicked ? (validated ? 'success' : 'failure') : ''}
      />
      <button onClick={handleButtonClick}>검증하기</button>
    </div>
  );
};

export default ValidationSample;
