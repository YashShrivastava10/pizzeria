import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URI;
const dbName = 'pizzeria';

// Create a global or module-level MongoDB client instance and a connection status flag
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let isConnected = false;

async function connectToDB() {
  if (!isConnected) {
    try {
      await client.connect();
      console.log('Connected successfully to server');
      isConnected = true;
    } catch (error) {
      console.error("Error connecting to the MongoDB server:", error);
    }
  }

  return client.db(dbName);
}

export default connectToDB;
