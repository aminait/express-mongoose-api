import express from "express";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy } from "passport-local";

// import Sentry from "@sentry/node";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

import packageJson from "../package.json";
import User from "@src/models/user.js";
import config from "@src/config";
import routes from "@src/routes";
// import routes

// Locale initialization
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    lng: "en",
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "./locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      lookupHeader: "accept-language",
    },
  });

// SENTRY initialization
// Sentry.init({
//   dsn: "",
//   environment: process.emitWarning.NODE_ENV,
//   release: packageJson.version,
// });
const app = express();

// TODO rate limiting, sentry
app.use(middleware.handle(i18next));
app.use(express.json({ limit: "3mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// app.use(Sentry.Handlers.requestHandler());
app.use(helmet());
app.use(
  cors({
    origin: config.frontEndUrl,
    credentials: true,
  })
);

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    User.authenticate()
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// dev tools
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/health", (req, res) => {
  res.json({ message: "Healthy" });
});
app.use("/api/v1", routes);

app.set("env", process.env.NODE_ENV);

export default app;
