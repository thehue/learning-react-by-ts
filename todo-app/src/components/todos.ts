export type Todo = {
  id: number;
  text: string;
  checked: boolean;
};

export type TodoProp = {
  todo: Todo;
};

export type Todos = {
  todos: Todo[];
};
