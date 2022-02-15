import appRoot from "app-root-path";
import { createLogger, transports, format } from "winston";
import config from "config";

const { combine, prettyPrint } = format;

const options = {
  ...(config.app.logging.file && {
    file: {
      level: "info",
      filename: `${appRoot}/logs/all.log`,
      handleExceptions: true,
      json: true,
      maxSize: 5242880, //5M
      maxFiles: 5,
      colorize: false,
    },
  }),
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = createLogger({
  format: combine(
    format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    ...(config.app.logging.file ? [new transports.File(options.file)] : []),
    new transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  stdout: {
    write(message, encoding) {
      logger.info(message);
    },
  },
  stderr: {
    write(message, encoding) {
      logger.error(message);
    },
  },
};

export default logger;
