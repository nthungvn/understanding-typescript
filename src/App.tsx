import TodoList from './components/TodoList';

const App = () => {
  const todos: [{ id: string; text: string }] = [
    { id: 't1', text: 'Finished the course' },
  ];

  return (
    <div className="App">
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
