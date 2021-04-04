import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [
  { id: Math.random().toString(), text: 'Finish Typescript course' },
];

export const getTodos: RequestHandler = (req, res, _) => {
  res.json({ todos: TODOS });
};

export const createTodo: RequestHandler = (req, res, _) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);

  res.status(201).json({ message: 'Todo created', todo: newTodo });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, _) => {
  const id = req.params.id;
  const text = (req.body as { text: string }).text;
  const updatedTodo = TODOS.find((todo) => todo.id === id);
  if (updatedTodo) {
    updatedTodo.text = text;
    res.json({ message: 'Todo was updated', updatedTodo: updatedTodo });
  } else {
    res.status(404).json({ message: 'Could not found the todo' });
  }
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, _) => {
  const id = req.params.id;
  const todoIndex = TODOS.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Todo was deleted' });
  } else {
    res.status(404).json({ message: 'Could not found the todo' });
  }
};
