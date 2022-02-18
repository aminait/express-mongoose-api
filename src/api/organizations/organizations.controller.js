export const createOrganization = async (req, res) => {
  res.send({ message: 'createOrganization' });
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
