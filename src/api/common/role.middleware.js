import { error } from '@src/utils/responseApi';

const hasRole =
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

export default hasRole;
