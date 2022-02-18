import { Router } from 'express';
import {
  getProjectById,
  updateProjectById,
  publishProjectById,
  unpublishProjectById,
  cancelProjectById,
  deleteProjectById,
} from './projects.controller';

export default () => {
  const routes = Router();

  routes.get('/:id', getProjectById);
  routes.put('/:id', updateProjectById);
  routes.post('/:id/publish', publishProjectById);
  routes.post('/:id/unpublish', unpublishProjectById);
  routes.post('/:id/cancel', cancelProjectById);
  routes.delete('/:id', deleteProjectById);

  return routes;
};
