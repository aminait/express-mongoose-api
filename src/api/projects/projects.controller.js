import { success } from '@src/utils/responseApi';

export const getAllProjects = async (req, res) => {
  res.json(success({ data: res.paginatedResult }));
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  console.log('getProjectById -> id', id);
  res.send({ message: 'getProjectById' });
};

export const updateProjectById = async (req, res) => {
  const { id } = req.params;
  console.log('updateProjectById -> id', id);
  res.send({ message: 'updateProjectById' });
};

export const publishProjectById = async (req, res) => {
  const { id } = req.params;
  console.log('updateProjectById -> id', id);
  res.send({ message: 'publishProjectById' });
};

export const unpublishProjectById = async (req, res) => {
  const { id } = req.params;
  console.log('updateProjectById -> id', id);
  res.send({ message: 'unpublishProjectById' });
};

export const cancelProjectById = async (req, res) => {
  const { id } = req.params;
  console.log('updateProjectById -> id', id);
  res.send({ message: 'cancelProjectById' });
};

export const deleteProjectById = async (req, res) => {
  const { id } = req.params;
  console.log('updateProjectById -> id', id);
  res.send({ message: 'deleteProjectById' });
};
