import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv"
dotenv.config()

const url = process.env.MONGODB_URI
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = 'pizzeria';

async function connectToDB() {
  await client.connect();
  console.log('Connected successfully to server');
  return client.db(dbName);
}

export default connectToDB