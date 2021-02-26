import React from 'react';
import useInputs from './useInputs';

function Info() {
  const [state, onChange] = useInputs({
    nickname: '',
    name: '',
  });

  const { name, nickname } = state;

  return (
    <div>
      <div>
        <input
          type="text"
          value={name}
          name="name"
          onChange={onChange}
          placeholder="이름을 입력해주세요"
        />
        <input
          type="text"
          value={nickname}
          name="nickname"
          onChange={onChange}
          placeholder="닉네임을 입력해주세요"
        />
      </div>
      <div>
        <div>
          <b>이름:</b>
          {name}
        </div>
        <div>
          <b>닉네임:</b>
          {nickname}
        </div>
      </div>
    </div>
  );
}

export default Info;
