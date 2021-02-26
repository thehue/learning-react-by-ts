import { ChangeEvent, useReducer } from 'react';

type State = {
  name: string;
  nickname: string;
};

type Action = {
  name: string;
  value: string;
};

function reducer(state: State, action: Action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(
  initialForm: State
): [State, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [state, dispatch] = useReducer(reducer, initialForm);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };
  return [state, onChange];
}
