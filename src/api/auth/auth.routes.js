import { Router } from 'express';
import { login, register, logout } from './auth.controller';

export default () => {
  const routes = Router();

  routes.post('/login', login);
  routes.post('/logout', logout);
  routes.post('/register', register);

  return routes;
};
