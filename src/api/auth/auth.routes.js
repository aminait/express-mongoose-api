import { Router } from 'express';
import { login, register, logout } from './auth.controller';
import authenticate from '../common/token.middleware';

export default () => {
  const routes = Router();

  routes.post('/register', register);
  routes.post('/login', login);
  routes.post('/logout', [authenticate], logout);

  return routes;
};
