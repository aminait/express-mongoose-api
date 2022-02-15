import express from "express";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import helmet from "helmet";
import Sentry from "@sentry/node";

// import routes
import packageJson from "../package.json";
import { matchFromAbsolutePathsAsync } from "tsconfig-paths";

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
app.use(express.urlencoded({ extended: false }));
// app.use(Sentry.Handlers.requestHandler());
app.use(helmet());

app.set("env", process.env.NODE_ENV);

export default app;
