import { Router } from "express";
import {
  getAllUsers,
  createNewUser,
  getUserById,
  deleteUserById,
  getCurrentUser,
  changeUserPassword,
  recoverUserPassword,
} from "./users.controller";

export default () => {
  const routes = Router();

  routes.get("/", getAllUsers);
  routes.post("/", createNewUser);
  routes.get("/:id", getUserById);
  routes.delete("/:id", deleteUserById);
  routes.get("/me", getCurrentUser);
  routes.put("/:id/password-change", changeUserPassword);
  routes.put("/:id/password-recovery", recoverUserPassword);

  return routes;
};
