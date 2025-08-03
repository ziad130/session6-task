const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://asu:higQYsLbSvcP5vKo@cluster0.uuamgkf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{ dbName: "test" }
    );
    console.log('Database Connection Successfully');
  } catch (error) {
    console.log(`Error in Connection ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;