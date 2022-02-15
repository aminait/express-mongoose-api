import dotenv from "dotenv";

const result = dotenv.config({ path: `.env-${process.env.NODE_ENV}` });

if (result.error) {
  console.error("Failed to set up env");
}

export default {
  port: process.env.PORT,
  dummy: "data",
  frontendUrl: "https://localhost:3000",
};
