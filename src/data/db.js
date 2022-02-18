import mongoose from 'mongoose';
import config from '@src/config';

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const { connection } = mongoose;
  connection.once('open', () => {
    console.log(`MongoDB running at ${config.mongoUrl}`);
  });

  connection.on('error', () => {
    console.error('Error while connecting to DB');
  });
};
