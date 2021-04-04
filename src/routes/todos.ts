import { Router } from 'express';

import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from '../controllers/todos';

const routes = Router();

routes.get('/', getTodos);

routes.post('/', createTodo);

routes.patch('/:id', updateTodo);

routes.delete('/:id', deleteTodo);

export default routes;
