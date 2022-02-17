import express from "express";
// import initializeDb from "@src/data/db";

import users from "@api/users/users.routes";
import auth from "@api/auth/auth.routes";

const router = express();

// initializeDb(() => {
//   if (process.env.NODE_ENV !== "production") {
//     seedDB();
//   }

router.use("/users", users());
router.use("/auth", auth());
// });

export default router;
