import React, { useCallback, useRef, useState } from "react";

type Form = {
  id?: number;
  name?: string;
  username?: string;
};

type Data = {
  array: Form[];
  uselessValue: any;
};

function App() {
  const nextId = useRef(1);
  const [form, setForm] = useState({
    name: "",
    username: "",
  });
  const [data, setData] = useState<Data>({
    array: [],
    uselessValue: null,
  });

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({
      ...form,
      [name]: [value],
    }));
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const info: Form = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };

      setData((data) => ({
        ...data,
        array: data.array.concat(info),
      }));

      // form 초기화
      setForm({
        name: "",
        username: "",
      });

      nextId.current += 1;
    },
    [form]
  );

  const onRemove = useCallback((id: number) => {
    setData((data) => ({
      ...data,
      array: data.array.filter((info) => info.id !== id),
    }));
  }, []);

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
