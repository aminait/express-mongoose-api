import express from 'express';

import users from '@api/users/users.routes';
import auth from '@api/auth/auth.routes';
import organizations from '@api/organizations/organizations.routes';

import authenticate from '@api/common/token.middleware';
// import hasRole from '@api/common/role.middleware';

const router = express();

router.use('/auth', auth());
router.use('/users', [authenticate], users());
router.use('/organizations', [authenticate], organizations()); // hasRole('orgAdmin')

export default router;
