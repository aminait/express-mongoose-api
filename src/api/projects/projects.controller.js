import mongoose from 'mongoose';
import Project from '@models/project';
import ProjectStatus from '@models/projectStatus';

import { success } from '@src/utils/responseApi';

// TODO add checks to see if project is deleted - NULL
export const getAllProjects = async (req, res) => {
  res.json(success({ data: res.paginatedResult }));
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  const projectId = mongoose.Types.ObjectId(id);
  const project = await Project.findById(projectId);
  console.log('getProjectById -> project', project);
  return res.status(200).json(success({ status: 'OK', data: project }));
};

export const updateProjectById = async (req, res) => {
  const { id } = req.params;
  const projectId = mongoose.Types.ObjectId(id);

  const project = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
  return res.status(200).json(success({ status: 'OK', data: project }));
};

// TODO logic, add notifs and push to timelines/remove from timelines
export const publishProjectById = async (req, res) => {
  const { id } = req.params;
  const projectId = mongoose.Types.ObjectId(id);
  const project = await Project.findByIdAndUpdate(
    projectId,
    { isPublished: true, status: ProjectStatus.open },
    { new: true }
  );
  return res.status(200).json(success({ status: 'OK', data: project }));
};

export const unpublishProjectById = async (req, res) => {
  const { id } = req.params;
  const projectId = mongoose.Types.ObjectId(id);
  const project = await Project.findByIdAndUpdate(
    projectId,
    { isPublished: false, status: ProjectStatus.draft },
    { new: true }
  );
  return res.status(200).json(success({ status: 'OK', data: project }));
};

export const cancelProjectById = async (req, res) => {
  const { id } = req.params;
  const projectId = mongoose.Types.ObjectId(id);
  const project = await Project.findByIdAndUpdate(
    projectId,
    { isPublished: false, status: ProjectStatus.canceled },
    { new: true }
  );
  return res.status(200).json(success({ status: 'OK', data: project }));
};

export const deleteProjectById = async (req, res) => {
  const { id } = req.params;
  const projectId = mongoose.Types.ObjectId(id);
  // TODO add checks to see if project is ongoing
  await Project.deleteOne({ _id: projectId });
  return res.status(200).json(success({ status: 'OK' }));
};
