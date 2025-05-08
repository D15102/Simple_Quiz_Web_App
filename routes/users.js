const mongoose = require("mongoose");
// Use environment variable for MongoDB connection or fallback to local for development
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/practic";

// Make sure the connection string includes the database name
let connectionString = MONGODB_URI;
if (connectionString && !connectionString.endsWith('/')) {
  connectionString += '/';
}
if (connectionString && !connectionString.endsWith('QuizDB')) {
  connectionString += 'QuizDB';
}

console.log('Connecting to MongoDB with URI:', connectionString.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Log the URI with password hidden

// Set up MongoDB connection options
const mongooseOptions = {
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000, // Increase socket timeout
  family: 4, // Use IPv4, skip trying IPv6
  maxPoolSize: 10, // Maintain up to 10 socket connections
  retryWrites: true,
  w: 'majority'
};

// Connect to MongoDB with improved error handling
mongoose.connect(connectionString, mongooseOptions)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Log more details about the connection error
    if (err.name === 'MongoServerSelectionError') {
      console.error('Could not connect to any MongoDB server. Please check your connection string and network.');
    }
  });

// Add connection event listeners for better debugging
mongoose.connection.on('connected', () => console.log('Mongoose connected to DB'));
mongoose.connection.on('error', err => console.error('Mongoose connection error:', err));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

const plm = require('passport-local-mongoose')


const userschema = mongoose.Schema({

  username: String,
  password: String,
  email: String


})

// to use passport-local-mongoose
userschema.plugin(plm);


module.exports = mongoose.model("User", userschema)