import express from "express";
import users from "@api/users/users.routes";

const router = express();

router.use("/users", users());

export default router;
