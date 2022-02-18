import jwt from 'jsonwebtoken';
import config from '@src/config';
import User from '@models/user';
import { error } from '@src/utils/responseApi';

const authenticate = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  console.log('authenticate -> bearerHeader', bearerHeader);
  if (bearerHeader) {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;

    jwt.verify(bearerToken, config.jwt.secret, async (err, response) => {
      // TODO handle case for expired token
      if (err) {
        return res.status(401).json(error({ status: 'UNAUTHORIZED' }));
      }
      console.log('response', response);
      const { userId } = response;
      if (!userId) {
        return res.status(401).json(error({ status: 'UNAUTHORIZED' }));
      }
      const user = await User.findById(userId);
      console.log('jwt.verify -> user', user);
      req.user = user;
      next();
    });
  } else {
    return res.status(403).json(error({ status: 'FORBIDDEN' }));
  }
};

export default authenticate;
