import { Router } from 'express';
import {
  createOrganization,
  getOrganizationProjects,
  createOrganizationProject,
  deleteOrganizationById,
  updateOrganizationById,
} from './organizations.controller';
import hasRole from '../common/role.middleware';

export default () => {
  const routes = Router();

  routes.post('/', createOrganization);
  routes.put('/:id', updateOrganizationById);
  routes.delete('/:id', [hasRole('orgAdmin')], deleteOrganizationById);

  routes.get('/:id/projects', getOrganizationProjects);
  routes.post('/:id/projects', createOrganizationProject);

  return routes;
};
