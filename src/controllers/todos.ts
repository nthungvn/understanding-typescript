import { RequestHandler } from 'express';
import { Todo } from '../models/todo';

const TODOS: Todo[] = [
  { id: Math.random().toString(), text: 'Finish Typescript course' },
];

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  res.status(201).json({ message: 'Todo created', todo: newTodo });
};

export const updateTodo: RequestHandler = (req, res, next) => {};

export const deleteTodo: RequestHandler = (req, res, next) => {};
