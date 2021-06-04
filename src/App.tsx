import { useState } from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import Todo from './types/Todo.model';

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

  const deleteTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div className="App">
      <NewTodo onCreate={createTodoHandler} />
      <TodoList items={todos} onDelete={deleteTodoHandler} />
    </div>
  );
};

export default App;
