import { Router } from 'express';
import Project from '@models/project';
import {
  createOrganization,
  getOrganizationProjects,
  createOrganizationProject,
  deleteOrganizationById,
  updateOrganizationById,
} from './organizations.controller';
import { hasRole, isOrganizer } from '../common/role.middleware';
import authenticate from '../common/token.middleware';
import paginate from '../common/paginate.middleware';

export default () => {
  const routes = Router();

  routes.post('/', [authenticate], createOrganization); // done
  routes.put('/:id', [authenticate, isOrganizer], updateOrganizationById);
  routes.delete('/:id', [authenticate, isOrganizer, hasRole('orgAdmin')], deleteOrganizationById);

  routes.get('/:id/projects', [paginate(Project, 'organization')], getOrganizationProjects); // done
  routes.post('/:id/projects', [authenticate, isOrganizer], createOrganizationProject); // done

  // routes.post('/:id/organizers/invite', inviteOrganizer);
  // routes.post('/:id/organizers/cancel', cancelInviteOrganizer);
  // routes.post('/:id/organizers', addOrganizer);
  // routes.delete('/:id/organizers', removeOrganizer);

  return routes;
};
