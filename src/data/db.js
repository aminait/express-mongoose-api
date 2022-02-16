import mongoose from "mongoose";
import config from "@src/config";

export default (callback) => {
  mongoose.Promise = global.Promise;
  let db = mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let connection = mongoose.connection;
  connection.once("open", function () {
    console.log(`MongoDB running at ${config.mongoUrl}`);
  });

  connection.on("error", () => {
    console.error("Error while connecting to DB");
  });
  callback(db);
};
