import React, { useCallback, useRef, useState } from 'react';
import produce from 'immer';

type Form = {
  [key: string]: string;
};

type Info = {
  id: number;
  name: string;
  username: string;
};

type Data = {
  array: Info[];
  uselessValue: any;
};

function App() {
  const nextId = useRef(1);
  const [form, setForm] = useState<Form>({
    name: '',
    username: '',
  });
  const [data, setData] = useState<Data>({
    array: [],
    uselessValue: null,
  });

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(
      produce((draft) => {
        draft[name] = value;
      })
    );
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const info: Info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };

      setData(
        produce((draft) => {
          draft.array.push(info);
        })
      );

      // form 초기화
      setForm({
        name: '',
        username: '',
      });

      nextId.current += 1;
    },
    [form.name, form.username]
  );

  const onRemove = useCallback(
    (id: number) => {
      setData((data) => ({
        ...data,
        array: data.array.filter((info) => info.id !== id),
      }));

      const nextState = produce(data, (draft) => {
        draft.array.splice(
          draft.array.findIndex((t) => t.id === id),
          1
        );
      });

      setData(nextState);
    },
    [data]
  );

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => {
            return (
              <li
                key={info.id}
                onClick={() => {
                  if (info.id) onRemove(info.id);
                }}
              >
                {info.username}({info.name})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
