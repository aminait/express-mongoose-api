import http from "http";
import app from "#app";
import config from "#config";

try {
  const server = http.createServer(app);

  server.listen(config.port, () => {
    console.log(
      `Server running at port ${config.port} in ${process.env.NODE_ENV}`
    );
  });
} catch (e) {
  console.error(e);
}
