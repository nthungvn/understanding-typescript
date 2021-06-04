import TodoList from './components/TodoList';
import Todo from './types/Todo';

const App = () => {
  const todos: Todo[] = [{ id: 't1', text: 'Finished the course' }];

  return (
    <div className="App">
      <TodoList items={todos} />
    </div>
  );
};

export default App;
