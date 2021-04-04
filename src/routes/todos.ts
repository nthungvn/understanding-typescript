import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res, next) => {
  res.json([{ name: 'Finish Typescript course', duration: 'In one month' }]);
});

routes.post('/', (req, res, next) => {});

routes.patch('/:id', (req, res, next) => {});

routes.delete('/:id', (req, res, next) => {});

export default routes;
