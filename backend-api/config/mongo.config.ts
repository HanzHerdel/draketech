import mongoose from 'mongoose';


async function connectDB() {
  try {
    const HOST=process.env.MONGODB_HOST||'localhost:27017'
    const con = await mongoose.connect(`mongodb://${HOST}/draketech-test`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log(`Database connected : ${con.connection.host}`);
  } catch (error:any) {
    console.error(`Error***: ${error ?? "unknow"}`);
    process.exit(1);
  }
}

export default connectDB;