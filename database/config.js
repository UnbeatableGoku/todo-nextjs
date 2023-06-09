import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    if (connection.readyState == 1) {
      console.log('done');
      return Promise.resolve(true);
      f;
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
