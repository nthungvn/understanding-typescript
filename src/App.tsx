import { useState } from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import Todo from './types/Todo';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 't1', text: 'Finished the course' },
  ]);

  const createTodoHandler = (todoText: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now().toString(), text: todoText },
    ]);
  };

  return (
    <div className="App">
      <NewTodo onCreate={createTodoHandler} />
      <TodoList items={todos} />
    </div>
  );
};

export default App;
