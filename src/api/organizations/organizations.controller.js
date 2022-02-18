import User from '@models/user';
import Role from '@models/userRoles';

import Organization, { validateCreateOrg } from '@models/organization';

import config from '@src/config';
import { success, error, validation } from '@src/utils/responseApi';

export const createOrganization = async (req, res) => {
  const { name, imageUrl = config.defaultImageUrl, city, country } = req.body;
  const validate = validateCreateOrg(req.body);
  if (validate.error) {
    const missingParams = [];
    const { details } = validate.error;
    details.forEach((detail) => {
      missingParams.push({ [detail.context.label]: detail.message });
    });
    return res.status(400).json(validation(missingParams));
  }

  const { _id } = req.user;

  const organization = await Organization.create({
    owner: _id,
    name,
    imageUrl,
    city,
    country,
  });

  if (!organization) {
    return res.status(500).json(error());
  }

  await User.findOneAndUpdate({ _id }, { isVolunteer: false, role: Role.OrgAdmin });

  return res.status(201).json(success({ status: 'CREATED' }));
};

export const deleteOrganizationById = async (req, res) => {
  const { id } = req.params;
  console.log('deleteOrganizationById -> id', id);
  res.send({ message: 'deleteOrganizationById' });
};

export const updateOrganizationById = async (req, res) => {
  const { id } = req.params;
  console.log('updateOrganizationById -> id', id);
  res.send({ message: 'updateOrganizationById' });
};
export const getOrganizationProjects = async (req, res) => {
  const { id } = req.params;
  console.log('getOrganizationProjects -> id', id);
  res.send({ message: 'getOrganizationProjects' });
};

export const createOrganizationProject = async (req, res) => {
  const { id } = req.params;
  console.log('createOrganizationProject -> id', id);
  res.send({ message: 'createOrganizationProject' });
};
