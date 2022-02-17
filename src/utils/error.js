// export default (err, req, res, next) => {
//   const { status, message, errors } = err;

//   let validationErrors = {};
//   if (errors) {
//     errors.forEach((err) => (validationErrors[err.param] = req.t(err.mgs)));
//   }

//   res.status(status).send({
//     path: req.originalUrl,
//     timestamp: new Date().getTime(),
//     message: req.t(message),
//     validationErrors,
//   });
// };

// app.use(function handleDatabaseError(error, request, response, next) {
//   if (error instanceof MongoError) {
//     if (error.code === 11000) {
//       return response.status(HttpStatus.CONFLICT).json({
//         httpStatus: HttpStatus.CONFLICT,
//         type: 'MongoError',
//         message: error.message,
//       });
//     } else {
//       return response.status(503).json({
//         httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
//         type: 'MongoError',
//         message: error.message,
//       });
//     }
//   }
//   next(error);
// });
