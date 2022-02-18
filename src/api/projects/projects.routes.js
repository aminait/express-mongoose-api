import { Router } from 'express';
import Project from '@models/project';
import {
  getAllProjects,
  getProjectById,
  updateProjectById,
  publishProjectById,
  unpublishProjectById,
  cancelProjectById,
  deleteProjectById,
} from './projects.controller';

import paginate from '../common/paginate.middleware';

export default () => {
  const routes = Router();

  routes.get('/', [paginate(Project)], getAllProjects); // done
  routes.get('/:id', getProjectById);
  routes.put('/:id', updateProjectById);
  routes.post('/:id/publish', publishProjectById);
  routes.post('/:id/unpublish', unpublishProjectById);
  routes.post('/:id/cancel', cancelProjectById);
  routes.delete('/:id', deleteProjectById);

  return routes;
};
