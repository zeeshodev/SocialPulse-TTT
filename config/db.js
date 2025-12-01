import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialpulse', {
      serverSelectionTimeoutMS: 10000, // Increased to 10s for better reliability
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 2, // Maintain at least 2 connections
      maxIdleTimeMS: 30000, // Remove connections idle for 30s
      connectTimeoutMS: 10000, // Give up initial connection after 10s
      retryWrites: true, // Retry failed writes
      retryReads: true, // Retry failed reads
      compressors: 'zlib', // Enable compression for network traffic
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Connection pool size: ${conn.connection.client.options.maxPoolSize}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn('Server will continue running, but database features will fail. Please start MongoDB.');
    // process.exit(1); // Do not kill the server
  }
};

export default connectDB;
