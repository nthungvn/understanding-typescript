import { FormEvent, useRef } from 'react';

type CreateTodoHandler = (todoText: string) => void;

interface NewTodoProps {
  onCreate: CreateTodoHandler;
}

const NewTodo = (props: NewTodoProps) => {
  const todoInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const enteredText = todoInputRef.current!.value;
    props.onCreate(enteredText);
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="todo">Todo Text</label>
        <input name="todo" id="todo" type="text" ref={todoInputRef} />
      </div>
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
