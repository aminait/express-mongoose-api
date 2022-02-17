import dotenv from "dotenv";

const result = dotenv.config({ path: `.env-${process.env.NODE_ENV}` });

if (result.error) {
  console.error("Failed to set up env");
}

export default {
  port: process.env.PORT,
  dummy: "data",
  frontendUrl: "https://localhost:3000",
  sessionSecret: "verysuperdupersecret",
  jwt: {
    secret: "jwtverysuperdupersecret",
    expiryDays: "10d",
  },
  email: {
    apiKey:
      "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",
    verifiedAccount: "aminait@outlook.com",
    templates: {
      confirm: "templateId",
      passwordRevoery: "templateId",
    },
    confirmUrl: `http://localhost:3000`,
  },
  mongoUrl: "mongodb://127.0.0.1:27017/volunteer-db",
};
