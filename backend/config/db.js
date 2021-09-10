import dotenv  from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function connectDB() {
  try {
    const con = await mongoose.connect(`mongodb://${process.env.MONGODB_HOST}/draketech-test`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log(`Database connected : ${con.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;