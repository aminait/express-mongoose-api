// import morgan from "morgan";
// import winston from "./winston";

// export const stderrStream = (req, res, next) => {
//   morgan("combined", {
//     skip() {
//       return res.statusCode < 400;
//     },
//     stream: winston.stream.stderr,
//   }),
//     next();
// };

// export const stdoutStream = (req, res, next) => {
//   morgan("combined", {
//     skip() {
//       return res.statusCode >= 400;
//     },
//     stream: winston.stream.stdout,
//   });
//   next();
// };
