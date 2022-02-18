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
  routes.get('/:id', getProjectById); // done
  routes.put('/:id', updateProjectById); // done
  routes.post('/:id/publish', publishProjectById); // done
  routes.post('/:id/unpublish', unpublishProjectById); // done
  routes.post('/:id/cancel', cancelProjectById); // done
  routes.delete('/:id', deleteProjectById); // done

  return routes;
};
