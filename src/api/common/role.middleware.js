import mongoose from 'mongoose';
import Organization from '@models/organization';
import { error } from '@src/utils/responseApi';

// TODO expand permittedRole to permittedRoles array
export const hasRole =
  (permittedRole) =>
  // returns middleware
  (req, res, next) => {
    const { user } = req;
    if (user && permittedRole === user.role) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      res.status(401).json(error({ status: 'UNAUTHORIZED', messages: { role: 'Unauthorized' } }));
    }
  };

export const isOrganizer = async (req, res, next) => {
  const orgId = req.params.id;
  console.log('isOrganizer -> orgId', orgId);
  const { _id: userId } = req.user;

  // TODO handle UnhandledPromiseRejectionWarning when id is invalid
  const org = await Organization.findById(mongoose.Types.ObjectId(orgId));
  console.log('isOrganizer -> org', org);

  if (!org) {
    // throw error
    return res.status(404).json(error({ status: 'NOT FOUND', messages: { param: 'Invalid ID' } }));
  }

  if (org.organizers && org.organizers.includes(userId)) {
    next();
  } else {
    return res.status(403).json(error({ status: 'NOT ORGANIZER' }));
  }
};
