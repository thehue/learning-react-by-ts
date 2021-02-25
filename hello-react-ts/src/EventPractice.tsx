import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

const EventPractice = () => {
  const [form, setForm] = useState({
    username: '',
    message: '',
  });

  const { username, message } = form;

  const onClick = () => {
    const { username, message } = form;

    alert(`username: ${username}, message: ${message}`);
    setForm({
      username: '',
      message: '',
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(nextForm);
  };

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="사용자명"
        value={username}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해 보세요"
        onChange={onChange}
        value={message}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>확인</button>
    </div>
  );
};

export default EventPractice;
