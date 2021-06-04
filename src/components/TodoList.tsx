import Todo from '../types/Todo.model';

interface TodoListProps {
  items: Todo[];
}

const TodoList = (props: TodoListProps) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default TodoList;
