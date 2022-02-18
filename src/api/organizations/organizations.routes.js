import { Router } from 'express';
import {
  createOrganization,
  getOrganizationProjects,
  createOrganizationProject,
} from './organizations.controller';

export default () => {
  const routes = Router();

  routes.post('/', createOrganization);
  routes.get('/:id/projects', getOrganizationProjects);
  routes.post('/:id/projects', createOrganizationProject);

  return routes;
};
