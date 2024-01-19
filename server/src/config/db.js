require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

// MONGO_URL=mongodb://localhost/taskmanager
// MONGO_URL=mongodb+srv://godwinoluyomi:godwin6205@cluster0.igdqoyv.mongodb.net/taskmanager

const connectDB = async () => {
  try {
    // Localhost Connection to Mongoose
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
    });

    // Connect to Mongo Atlas
    /* const connection = await mongoose.connect(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    ); */
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
