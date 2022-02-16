import passport from "passport";
import User from "@src/models/user";
import { error, success, validation } from "@src/utils/responseApi";
import { generateJwtToken } from "./auth.service";

export const login = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (!existingUser) {
    return res
      .status(404)
      .json(
        error({ status: "NOT_FOUND", errors: ["Email is not registered"] })
      );
  }
  passport.authenticate("local", function (server_err, user, info) {
    if (server_err) {
      return res.status(500).json(error());
    }

    if (!user) {
      return res.status(401).json(error({ errors: ["Invalid credentials"] }));
    }

    req.logIn(user, function (err) {
      console.log("user", user);
      if (err) {
        return res.status(500).json(error());
      }

      const token = generateJwtToken(user);

      res.json(success({ data: { token } }));
    });
  })(req, res);
};

export const logout = async (req, res) => {
  req.logout();
  const data = { isLoggedOut: true };
  return res.json(success({ data }));
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  console.log("register -> existingUser", existingUser);

  if (existingUser) {
    return res
      .status(400)
      .json(validation({ email: "Email already registered" }));
  }
  const userToCreate = new User({
    username: email,
    email,
  });

  User.register(userToCreate, password, function (err, user) {
    if (err) {
      return res
        .status(500)
        .json(error({ errors: ["Account could not be created"] }));
    } else {
      return res.status(201).json(success({ status: "CREATED" }));
    }
  });
};