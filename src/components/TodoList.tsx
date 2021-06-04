const TodoList = () => {
  const todos = [{ id: 't1', text: 'Finished the course' }];

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default TodoList;
