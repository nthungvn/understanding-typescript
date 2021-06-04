import Todo from '../types/Todo.model';

interface TodoListProps {
  items: Todo[];
  onDelete: (id: string) => void;
}

const TodoList = (props: TodoListProps) => {
  const deleteHandler = (id: string) => {
    props.onDelete(id);
  };

  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={deleteHandler.bind(null, todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
