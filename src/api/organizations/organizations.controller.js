import User from '@models/user';
import Role from '@models/userRoles';

import Organization, { validateCreateOrg } from '@models/organization';
import Project, { validateCreateProject } from '@models/project';

import config from '@src/config';
import getValidationMessages from '@src/utils/validationMessages';
import { success, error, validation } from '@src/utils/responseApi';

export const createOrganization = async (req, res) => {
  const validate = validateCreateOrg(req.body);
  if (validate.error) {
    const { details } = validate.error;
    const messages = await getValidationMessages(details);
    return res.status(400).json(validation(messages));
  }

  const { name, imageUrl = config.defaultImageUrl, city, country } = req.body;
  const { _id: userId } = req.user;

  // TODO adding organizers is not tested
  const organization = await Organization.create({
    owner: userId,
    name,
    imageUrl,
    city,
    country,
    organizers: [userId],
  });

  if (!organization) {
    return res.status(500).json(error());
  }

  await User.findOneAndUpdate({ _id: userId }, { isVolunteer: false, role: Role.OrgAdmin });

  return res.status(201).json(success({ status: 'CREATED' }));
};

export const updateOrganizationById = async (req, res) => {
  const { id } = req.params;
  console.log('updateOrganizationById -> id', id);
  res.send({ message: 'updateOrganizationById' });
};

export const deleteOrganizationById = async (req, res) => {
  const { id } = req.params;
  console.log('deleteOrganizationById -> id', id);
  res.send({ message: 'deleteOrganizationById' });
};

export const createOrganizationProject = async (req, res) => {
  const { id } = req.params;

  const createObj = req.body;
  createObj.createdBy = req.user._id;
  createObj.organization = id;

  const validate = validateCreateProject(createObj);
  if (validate.error) {
    const { details } = validate.error;
    const messages = await getValidationMessages(details);
    return res.status(400).json(validation(messages));
  }

  // TODO handle recurring project

  const project = await Project.create(createObj);
  if (project) {
    // TODO return json project
    return res.status(201).json(success({ status: 'CREATED', data: project }));
  }
};

export const getOrganizationProjects = async (req, res) => {
  const { id } = req.params;
  console.log('getOrganizationProjects -> id', id);
  res.send({ message: 'getOrganizationProjects' });
};
