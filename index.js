import http from "http";
import app from "@src/app";
import config from "@src/config";
import initializeDb from "@src/data/db";

try {
  const server = http.createServer(app);
  initializeDb();

  server.listen(config.port, () => {
    console.log(
      `Server running at port ${config.port} in ${process.env.NODE_ENV}`
    );
  });
} catch (e) {
  console.error(e);
}
